import styled from "@emotion/styled";
import { StyledScrollBarHolder } from "@global/globalStyles";
import { useEffect, useState } from "react";
import { selectSelectedListOfProcedureLogs } from "@redux/selectors/procedureLogSelector";
import { useSelector } from "react-redux";
import { selectSelectedImage } from "@redux/selectors/imageSelector";
import ImageUtils from "@helper/imageUtils";

export const BoundingBoxDialogImage = () => {
  const selectedListOfProcedureLogs = useSelector(selectSelectedListOfProcedureLogs);
  const selectedImage = useSelector(selectSelectedImage);
  const [mapSprite, setMapSprite] = useState<HTMLImageElement>();
  const [context, setContext] = useState<CanvasRenderingContext2D>();
  const [canvas, setCanvas] = useState<HTMLCanvasElement>();
  const imageUrl = ImageUtils.initRemoteImageUrlPath(selectedImage);

  const handleCanvasPreparations = (): void => {
    if (!imageUrl) {
      return;
    }

    let cv: any = document.getElementById("Canvas");

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

    // TODO: Call ImageUtil method to replace this one.
    // Map sprite to pass to the canvas.
    let imageSprite = new Image();
    imageSprite.src = imageUrl;
    imageSprite.onload = () => {
      // The original width and height of the image
      const naturalWidth = imageSprite.naturalWidth;
      const naturalHeight = imageSprite.naturalHeight;

      // Set the height and width of the canvas
      ctx.canvas.width = naturalWidth;
      ctx.canvas.height = naturalHeight;

      // Draw the image to the canvas
      ctx.drawImage(imageSprite, 0, 0, naturalWidth, naturalHeight);
      setMapSprite(imageSprite);
      setContext(ctx);
    };
  };

  const march = () => {
    if (!context || !canvas) {
      return;
    }

    selectedListOfProcedureLogs.forEach((procedureLog) => {
      // Draw all the bounding boxes that are associated with the log
      procedureLog.log.boundingBoxes.forEach((box) => {
        // Create bounding box
        let boundingBox = new Path2D();
        boundingBox.rect(
          box.minCoordinateX,
          box.minCoordinateY,
          box.maxCoordinateX - box.minCoordinateX,
          box.maxCoordinateY - box.minCoordinateY,
        );

        // The line width of the bounding boxes.
        context.lineWidth = 5; // TODO: Make this property changeable by the user.

        // Set the color of the bounding boxes
        context.strokeStyle = procedureLog.strokeStyle; // TODO: Make this property changeable by the user.
        context.stroke(boundingBox);
      });
    });

    canvas.addEventListener("mousemove", (event: MouseEvent) => {
      // Check whether point is inside the bounding box.

      const widthRatio = canvas.clientWidth / canvas.width;
      const heightRatio = canvas.clientHeight / canvas.height;

      selectedListOfProcedureLogs.forEach((log) => {
        log.log.boundingBoxes.forEach((box) => {
          const modifiedMinX = box.minCoordinateX * widthRatio;
          const modifiedMaxX = box.maxCoordinateX * widthRatio;
          const modifiedMinY = box.minCoordinateY * heightRatio;
          const modifiedMaxY = box.maxCoordinateY * heightRatio;

          if (
            modifiedMinX <= event.offsetX &&
            event.offsetX <= modifiedMaxX &&
            modifiedMinY <= event.offsetY &&
            event.offsetY <= modifiedMaxY
          ) {
            console.log("Log of: ", box.id, "Box of:", box, "is entered!");
          }
        });
      });
    });
  };

  useEffect(
    () => {
      if (!context || !mapSprite) {
        // If the context and the sprite are not defined, then create them
        handleCanvasPreparations();
        return;
      }

      // Restore the canvas
      context.drawImage(mapSprite, 0, 0, mapSprite.naturalWidth, mapSprite.naturalHeight);

      // Apply animation to the canvas
      march();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selectedListOfProcedureLogs, mapSprite, context, canvas, imageUrl],
  );

  /*
  useEffect(() => {
    let cv: any = document.getElementById("Canvas");

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

  return (
    <StyledBoundingBoxDialogImageHolder>
      <StyledCanvas id="Canvas" />
    </StyledBoundingBoxDialogImageHolder>
  );
};

const StyledCanvas = styled.canvas({
  width: "100%",
  borderRadius: "6px",
});

const StyledBoundingBoxDialogImageHolder = styled(StyledScrollBarHolder)({
  width: "60%",
  height: "100%",
  padding: 8,
  alignContent: "center",
});
