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
  const [mapSprite, setMapSprite] = useState<HTMLImageElement>();
  const [context, setContext] = useState<CanvasRenderingContext2D>();
  const [canvas, setCanvas] = useState<HTMLCanvasElement>();
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
  const HEIGHT_OF_IMAGE_NAME = 55;

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

    setCanvas(canvas);
    let ctx: CanvasRenderingContext2D | null = canvas.getContext("2d");

    if (!ctx) {
      return;
    }

    // Clear Canvas
    ctx.fillStyle = "#000";

    // Initial the canvas's width and height
    ctx.fillRect(0, 0, canvas.width, canvas.height + HEIGHT_OF_IMAGE_NAME);

    /**
     * TODO: fetch the images from the backend-server/locally-running-image-server with a GET request method.
     * - If we use GET method, then the responses could be cached by the browser.
     * - The images could be fetched from a locally running server, and because of that, it's not a good idea
     * to fetch the images from the remote lucas server where cors policy denies to alter the images in the canvas.
     * - If we use a server to fetch the images, then we could export the images and the bounding boxes
     * painted on the images with the help of the canvas.
     */
    // Map sprite to pass to the canvas.
    ImageUtils.initImageByRemoteUrlPath(imageUrl).then((imageSprite) => {
      // The original width and height of the image
      const naturalWidth = imageSprite.naturalWidth;
      const naturalHeight = imageSprite.naturalHeight;

      // Set the height and width of the canvas based on the natural width and height of the image
      ctx.canvas.width = naturalWidth;
      ctx.canvas.height = naturalHeight + HEIGHT_OF_IMAGE_NAME;

      // Draw the image onto the canvas
      restoreCanvas(ctx, imageSprite);
      setMapSprite(imageSprite);
      setContext(ctx);
    });
  };

  const drawBoundingBoxes = (): void => {
    if (!context || !canvas) {
      return;
    }

    imageProperty.logs.forEach((procedureLog) => {
      // Draw all the bounding boxes that are associated with the log
      procedureLog.log.boundingBoxes.forEach((box) => {
        // Create box instance
        let boundingBox = new Path2D();

        // Creates a box by the position fo the 4 corner of the bounding box.
        boundingBox.rect(
          box.minCoordinateX,
          box.minCoordinateY + HEIGHT_OF_IMAGE_NAME,
          box.maxCoordinateX - box.minCoordinateX,
          box.maxCoordinateY - box.minCoordinateY,
        );

        // The line width of the bounding boxes.
        context.lineWidth = procedureLog.properties.lineWidth
          ? Number(procedureLog.properties.lineWidth)
          : 5;

        // Set the color of the bounding boxes
        if (procedureLog.properties.strokeStyle) {
          context.strokeStyle = procedureLog.properties.strokeStyle;
        }

        context.stroke(boundingBox);
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
          const modifiedMinY = (box.minCoordinateY + HEIGHT_OF_IMAGE_NAME) * heightRatio;
          const modifiedMaxY = (box.maxCoordinateY + HEIGHT_OF_IMAGE_NAME) * heightRatio;
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

  const restoreCanvas = (context: CanvasRenderingContext2D, mapSprite: HTMLImageElement) => {
    // Restore the canvas
    context.drawImage(
      mapSprite,
      0,
      HEIGHT_OF_IMAGE_NAME,
      mapSprite.naturalWidth,
      mapSprite.naturalHeight,
    );
  };

  const drawImageName = (): void => {
    if (!context || !canvas || !mapSprite) {
      return;
    }

    // Add a filled rectangle to the top of the image
    context.beginPath();
    context.fillStyle = "#000000";
    context.rect(0, 0, mapSprite.naturalWidth, HEIGHT_OF_IMAGE_NAME);
    context.fill();

    // Draw the name of the image onto the canvas
    context.font = "bold 48px serif";
    context.fillStyle = "#ffffff";
    context.fillText(ImageUtils.getUniqueRemoteImageName(imageProperty), 10, 40);
  };

  useEffect(
    () => {
      if (!imageUrl) {
        return;
      }

      if (!context || !mapSprite) {
        // If the context and the sprite are not defined, then create them
        initCanvas();
        return;
      }

      // Restore the canvas
      restoreCanvas(context, mapSprite);

      // If it was requested that the bounding boxes be hidden, then do not render them on the image.
      if (imageProperty.image.areBoundingBoxesHidden) {
        return;
      }

      // Draw the name of the image onto the canvas
      drawImageName();

      // Apply animation to the canvas
      drawBoundingBoxes();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [imageProperty, mapSprite, context, canvas, imageUrl],
  );

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
        <span></span>
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
