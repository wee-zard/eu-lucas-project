import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import ImageUtils from "@helper/imageUtils";
import { QueriedImagePropertyType } from "@model/SelectedImagesModel";
import getRandomIdentification from "@helper/randomGeneratorHelper";
import { getImageCanvasId, ImageCanvasLoadingStates } from "./helper/imageCanvasHelper";
import { downloadImagesByUrlCommand } from "@api/command/imageFetcherCommands";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import BoundingBoxDto from "@model/dto/BoundingBoxDto";
import ProcedureLogDto from "@model/dto/ProcedureLogDto";
import BoundingBoxDialogLogDetails from "@dialogs/boundBoxDialog/timeline/BoundingBoxDialogLogDetails";
import { useSelector } from "react-redux";
import {
  selectBoundingBoxColors,
  selectBoundingBoxPercentageDisplay,
} from "@redux/selectors/boundingBoxSelector";

type MouseHoverTooltipType = {
  isHovering: boolean;
  boundingBox?: BoundingBoxDto;
  log?: ProcedureLogDto;
  position: { x: number; y: number };
};

type Props = {
  imageProperty: QueriedImagePropertyType;
  randomUniqueId?: string;
  isHidden?: boolean;
  isSrcBase64Only?: boolean;
};

const ImageCanvas = ({
  imageProperty,
  randomUniqueId = getRandomIdentification(),
  isHidden,
  isSrcBase64Only,
}: Props) => {
  const boxColors = useSelector(selectBoundingBoxColors);
  const isPercentageDisplayed = useSelector(selectBoundingBoxPercentageDisplay);
  const [mapSprite, setMapSprite] = useState<HTMLImageElement>();
  const [isLoaded, setLoaded] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();
  const [hoverInfo, setHoverInfo] = useState<MouseHoverTooltipType>({
    isHovering: false,
    boundingBox: undefined,
    log: undefined,
    position: { x: 0, y: 0 },
  });
  const imageCanvasId = getImageCanvasId(imageProperty, randomUniqueId);
  const label = isLoaded ? ImageCanvasLoadingStates.LOADED : ImageCanvasLoadingStates.NOT_LOADED;
  const EXTENDED_IMAGE_HEIGHT = imageProperty.logs.length > 0 ? 55 : 0;
  const EXTENDED_IMAGE_HEADER_FONT_HEIGHT = EXTENDED_IMAGE_HEIGHT - 7;

  useEffect(() => {
    if (imageProperty.image.base64Src) {
      setImageUrl(ImageUtils.initRemoteImageUrlPath(imageProperty.image));
      return;
    }

    if (isSrcBase64Only) {
      const url = ImageUtils.initRemoteImageUrlPath(imageProperty.image, true);

      if (!url) {
        return;
      }

      downloadImagesByUrlCommand(url).then((res) =>
        setImageUrl(
          ImageUtils.appendBase64PrefixToImageSrc({
            imageId: imageProperty.image.id,
            base64String: res,
          }),
        ),
      );
    } else {
      setImageUrl(ImageUtils.initRemoteImageUrlPath(imageProperty.image));
    }
  }, [imageProperty, isSrcBase64Only]);

  useEffect(
    () => {
      if (!imageUrl) {
        return;
      }

      initCanvas();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [imageProperty, mapSprite, imageUrl, boxColors, isPercentageDisplayed],
  );

  /**
   * Initializes the canvas, and sets some basic properties of the canvas
   * while displaying an image on the canvas.
   */
  const initCanvas = (): void => {
    if (!imageUrl) {
      return;
    }

    let canvas = document.getElementById(imageCanvasId) as HTMLCanvasElement | null;

    if (!canvas) {
      return;
    }

    let ctx: CanvasRenderingContext2D | null = canvas.getContext("2d");

    if (!ctx) {
      return;
    }

    // Clear Canvas
    ctx.fillStyle = "#000";

    // Initial the canvas's width and height
    ctx.fillRect(0, 0, canvas.width, canvas.height + EXTENDED_IMAGE_HEIGHT);

    /**
     * TODO: fetch the images from the backend-server/locally-running-image-server with a GET request method.
     * - If we use GET method, then the responses could be cached by the browser.
     * - The images could be fetched from a locally running server, and because of that, it's not a good idea
     * to fetch the images from the remote lucas server where cors policy denies to alter the images in the canvas.
     * - If we use a server to fetch the images, then we could export the images and the bounding boxes
     * painted on the images with the help of the canvas.
     */
    // Map sprite to pass to the canvas.
    if (!mapSprite) {
      ImageUtils.initImageByRemoteUrlPath(imageUrl).then((imageSprite) => {
        drawImageSprintOnCanvas(ctx, imageSprite, canvas);
        setMapSprite(imageSprite);
      });
    } else {
      drawImageSprintOnCanvas(ctx, mapSprite, canvas);
    }
  };

  const drawImageSprintOnCanvas = (
    ctx: CanvasRenderingContext2D,
    imageSprite: HTMLImageElement,
    canvas: HTMLCanvasElement,
  ): void => {
    // The original width and height of the image
    const naturalWidth = imageSprite.naturalWidth;
    const naturalHeight = imageSprite.naturalHeight;

    // Set the height and width of the canvas based on the natural width and height of the image
    ctx.canvas.width = naturalWidth;
    ctx.canvas.height = naturalHeight + EXTENDED_IMAGE_HEIGHT;

    // Draw the image onto the canvas
    restoreCanvas(ctx, imageSprite);

    // If it was requested that the bounding boxes be hidden, then do not render them on the image.
    if (imageProperty.image.areBoundingBoxesHidden) {
      return;
    }

    if (imageProperty.logs.length > 0) {
      // Draw the name of the image onto the canvas
      drawImageHeader(ctx, imageSprite);
    }

    // Apply animation to the canvas
    drawBoundingBoxes(ctx, canvas);
  };

  const drawBoundingBoxes = (
    context: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
  ): void => {
    imageProperty.logs.forEach((procedureLog) => {
      // Draw all the bounding boxes that are associated with the log
      procedureLog.log.boundingBoxes.forEach((box) => {
        // Create box instance
        let boundingBox = new Path2D();

        // Creates a box by the position fo the 4 corner of the bounding box.
        boundingBox.rect(
          box.minCoordinateX,
          box.minCoordinateY + EXTENDED_IMAGE_HEIGHT,
          box.maxCoordinateX - box.minCoordinateX,
          box.maxCoordinateY - box.minCoordinateY,
        );

        // The line width of the bounding boxes.
        context.lineWidth = procedureLog.properties.lineWidth
          ? Number(procedureLog.properties.lineWidth)
          : 5;

        // Set the color of the bounding boxes
        if (procedureLog.properties.strokeStyle) {
          context.strokeStyle = box.isHomogenous
            ? boxColors.invasiveBoxHexColor
            : boxColors.homogenousBoxHexColor;
        }

        context.stroke(boundingBox);

        // Display the % of probability of the box
        if (!box.probabilityOfDetection || !isPercentageDisplayed) {
          return;
        }

        const fontSize = (EXTENDED_IMAGE_HEADER_FONT_HEIGHT / 3) * 2;

        // Add a filled rectangle to the top of the image
        context.beginPath();
        context.fillStyle = context.strokeStyle;
        context.rect(
          box.minCoordinateX - 3,
          box.minCoordinateY + 25,
          box.probabilityOfDetection > 10 ? 71 : 54,
          fontSize,
        );
        context.fill();

        // Draw % above the box.
        context.font = `bold ${fontSize}px serif`;
        context.fillStyle = "#ffffff";
        context.fillText(
          `${box.probabilityOfDetection}%`,
          box.minCoordinateX + 2,
          box.minCoordinateY + 51,
        );
      });
    });

    // The image has been successfully displayed on the canvas.
    setLoaded(true);

    canvas.addEventListener("mousemove", (event: MouseEvent) => {
      // Check whether point is inside the bounding box.

      const widthRatio = canvas.clientWidth / canvas.width;
      const heightRatio = canvas.clientHeight / canvas.height;
      let hoveredOverBoundingBox: BoundingBoxDto | undefined;
      let hoveredOverLog: ProcedureLogDto | undefined;

      imageProperty.logs.forEach((logModel) => {
        logModel.log.boundingBoxes.forEach((box) => {
          // If a bounding box has been selected, then do not check the other boxes.
          if (hoveredOverBoundingBox) {
            return;
          }

          const modifiedMinX = box.minCoordinateX * widthRatio;
          const modifiedMaxX = box.maxCoordinateX * widthRatio;
          const modifiedMinY = (box.minCoordinateY + EXTENDED_IMAGE_HEIGHT) * heightRatio;
          const modifiedMaxY = (box.maxCoordinateY + EXTENDED_IMAGE_HEIGHT) * heightRatio;
          const isMouseInsideBox =
            modifiedMinX <= event.offsetX &&
            event.offsetX <= modifiedMaxX &&
            modifiedMinY <= event.offsetY &&
            event.offsetY <= modifiedMaxY;

          // If the mouse is not inside the box, then ignore this item.
          if (!isMouseInsideBox) {
            return;
          }

          hoveredOverBoundingBox = box;
          hoveredOverLog = logModel.log;
        });
      });

      if (hoveredOverBoundingBox && hoveredOverLog) {
        setHoverInfo({
          isHovering: true,
          boundingBox: hoveredOverBoundingBox,
          log: hoveredOverLog,
          position: { x: event.clientX, y: event.clientY },
        });
      } else {
        setHoverInfo((prev) => ({ ...prev, isHovering: false }));
      }
    });
  };

  const restoreCanvas = (
    context: CanvasRenderingContext2D,
    imageSprite: HTMLImageElement,
  ): void => {
    // Restore the canvas
    context.drawImage(
      imageSprite,
      0,
      EXTENDED_IMAGE_HEIGHT,
      imageSprite.naturalWidth,
      imageSprite.naturalHeight,
    );
  };

  const drawImageHeader = (
    context: CanvasRenderingContext2D,
    imageSprite: HTMLImageElement,
  ): void => {
    // Add a filled rectangle to the top of the image
    context.beginPath();
    context.fillStyle = "#000000";
    context.rect(0, 0, imageSprite.naturalWidth, EXTENDED_IMAGE_HEIGHT);
    context.fill();

    // ===
    // Draw the name of the image onto the canvas
    context.font = `bold ${EXTENDED_IMAGE_HEADER_FONT_HEIGHT}px serif`;
    context.fillStyle = "#ffffff";
    context.fillText(ImageUtils.getUniqueRemoteImageName(imageProperty), 10, 40);

    // ===
    // Draw the icon for the bounding boxes that detected homogenous plants
    drawImageHeaderIconWithColor(context, imageSprite, boxColors.homogenousBoxHexColor, false);

    // Draw the icon for the bounding boxes that detected invasive plants
    drawImageHeaderIconWithColor(context, imageSprite, boxColors.invasiveBoxHexColor, true);
  };

  const drawImageHeaderIconWithColor = (
    context: CanvasRenderingContext2D,
    imageSprite: HTMLImageElement,
    color: string,
    isInvasive: boolean,
  ): void => {
    const isPresent = imageProperty.logs.some((model) =>
      model.log.boundingBoxes.some((box) => box.isHomogenous === isInvasive),
    );

    if (!isPresent) {
      return;
    }

    const withPositionOfHomogenousBox = (imageSprite.naturalWidth / 4) * 3;
    const withPositionOfInvasiveBox = imageSprite.naturalWidth / 2;

    // Draw a circle for the icon
    context.beginPath();
    context.fillStyle = color;
    const circleRadius = EXTENDED_IMAGE_HEIGHT / 4;

    if (isInvasive) {
      context.arc(withPositionOfInvasiveBox, 26, circleRadius, 0, 2 * Math.PI);
    } else {
      context.arc(withPositionOfHomogenousBox, 26, circleRadius, 0, 2 * Math.PI);
    }

    context.stroke();
    context.fill();

    //  Draw the name of the icon with the same color as the param
    context.font = `bold ${EXTENDED_IMAGE_HEADER_FONT_HEIGHT}px serif`;
    context.fillStyle = color;

    if (isInvasive) {
      context.fillText("1db", withPositionOfInvasiveBox + 40, 40);
    } else {
      context.fillText("homogen", withPositionOfHomogenousBox + 40, 40);
    }
  };

  /**
   * Displays the information of the hovered over bounding box.
   *
   * @returns Returns the built tooltip that should be displayed when the
   * users enters into a bounding box.
   */
  const drawBoundingBoxTooltip = (): JSX.Element => {
    if (!hoverInfo.boundingBox || !hoverInfo.log) {
      return <></>;
    }

    return (
      <div>
        <BoundingBoxDialogLogDetails log={hoverInfo.log} box={hoverInfo.boundingBox} />
      </div>
    );
  };

  return (
    <Box sx={{ position: "relative", display: "inline-block" }}>
      <Tooltip
        title={drawBoundingBoxTooltip()}
        open={hoverInfo.isHovering}
        placement="top"
        slotProps={{
          popper: {
            anchorEl: {
              getBoundingClientRect: () => ({
                width: 0,
                height: 0,
                top: hoverInfo.position.y,
                left: hoverInfo.position.x,
                right: hoverInfo.position.x,
                bottom: hoverInfo.position.y,
                ...hoverInfo.position,
                toJSON: () => "",
              }),
            },
          },
        }}
      >
        <div></div>
      </Tooltip>
      <StyledCanvas
        $hidden={isHidden}
        id={imageCanvasId}
        aria-label={label}
        onMouseLeave={() => setHoverInfo((prev) => ({ ...prev, isHovering: false }))}
      />
    </Box>
  );
};

export default ImageCanvas;

const StyledCanvas = styled.canvas<{ $hidden?: boolean }>((props) => ({
  display: props.$hidden ? "none" : "inherit",
  width: "100%",
  borderRadius: "6px",
}));
