import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import ImageUtils from "@helper/imageUtils";
import { QueriedImagePropertyType } from "@model/SelectedImagesModel";
import getRandomIdentification from "@helper/randomGeneratorHelper";
import { getImageCanvasId, ImageCanvasLoadingStates } from "./helper/imageCanvasHelper";
import { downloadImagesByUrlCommand } from "@api/command/imageFetcherCommands";

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
  const imageCanvasId = getImageCanvasId(imageProperty, randomUniqueId);
  const label = isLoaded ? ImageCanvasLoadingStates.LOADED : ImageCanvasLoadingStates.NOT_LOADED;

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
  }, []);

  /**
   * Initializes the canvas, and sets some basic properties of the canvas
   * while displaying an image on the canvas.
   */
  const initCanvas = (): void => {
    if (!imageUrl) {
      return;
    }

    let cv: any = document.getElementById(imageCanvasId);

    if (!cv) {
      return;
    }

    setCanvas(cv);
    let ctx: CanvasRenderingContext2D = cv.getContext("2d");

    if (!ctx) {
      return;
    }

    // Clear Canvas
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, cv.width, cv.height);

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
      ctx.canvas.height = naturalHeight;

      // Draw the image onto the canvas
      ctx.drawImage(imageSprite, 0, 0, naturalWidth, naturalHeight);
      setMapSprite(imageSprite);
      setContext(ctx);
    });
  };

  const applyBoundingBoxes = () => {
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
          box.minCoordinateY,
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

      imageProperty.logs.forEach((logModel) => {
        logModel.log.boundingBoxes.forEach((box) => {
          const modifiedMinX = box.minCoordinateX * widthRatio;
          const modifiedMaxX = box.maxCoordinateX * widthRatio;
          const modifiedMinY = box.minCoordinateY * heightRatio;
          const modifiedMaxY = box.maxCoordinateY * heightRatio;
          const isMouseInsideBox =
            modifiedMinX <= event.offsetX &&
            event.offsetX <= modifiedMaxX &&
            modifiedMinY <= event.offsetY &&
            event.offsetY <= modifiedMaxY;

          if (isMouseInsideBox) {
            // TODO: Implement some functionality when the mouse is hovered inside the box.
            console.log("Log of: ", box.id, "Box of:", box, "is entered!");
          }
        });
      });
    });
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
      context.drawImage(mapSprite, 0, 0, mapSprite.naturalWidth, mapSprite.naturalHeight);

      // If it was requested that the bounding boxes be hidden, then do not render them on the image.
      if (imageProperty.image.areBoundingBoxesHidden) {
        return;
      }

      // Apply animation to the canvas
      applyBoundingBoxes();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [imageProperty, mapSprite, context, canvas, imageUrl],
  );

  /*
  useEffect(() => {
    let cv: any = document.getElementById(imageCanvasId);

    if (!cv) {
      return;
    }

    let ctx: CanvasRenderingContext2D = cv.getContext("2d");

    if (!ctx) {
      return;
    }

    // Set the height and width of the canvas
    ctx.canvas.width = 500;
    ctx.canvas.height = 500;

    // Clear Canvas
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, 500, 500);

    let obj = new Path2D();
    obj.rect(20, 20, 50, 50);
    ctx.fillStyle = "red";
    ctx.fill(obj);

    // Listen for mouse moves
    cv.addEventListener("mousemove", function (event: MouseEvent) {
      // Check whether point is inside circle
      if (ctx.isPointInPath(obj, event.offsetX, event.offsetY)) {
        ctx.fillStyle = "green";
      } else {
        ctx.fillStyle = "red";
      }

      // Draw circle
      ctx.clearRect(0, 0, cv.width, cv.height);
      ctx.fill(obj);
    });
  }, []);
  */

  // TODO: Az 'aria-label' attribútumban fogjuk átadni, hogy a kép betöltésre került-e a canvas-re
  return <StyledCanvas $hidden={isHidden} id={imageCanvasId} aria-label={label} />;
};

export default ImageCanvas;

const StyledCanvas = styled.canvas<{ $hidden?: boolean }>((props) => ({
  display: props.$hidden ? "none" : "inherit",
  width: "100%",
  borderRadius: "6px",
}));
