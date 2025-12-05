import { ImageCanvasLoadingStatesEnum } from "@model/enum/ImageCanvasLoadingStatesEnum";
import { QueriedImagePropertyType } from "@model/SelectedImagesModel";

export const getImageCanvasId = (
  imageProperty: QueriedImagePropertyType,
  randomUniqueId: string,
): string => {
  return `Canvas-${randomUniqueId}-${imageProperty.image.id}`;
};

export const getImageCanvasDataUrl = (
  imageProperty: QueriedImagePropertyType,
  randomUniqueId: string,
): Promise<string> => {
  return new Promise((resolve) => {
    const imageCanvasId = getImageCanvasId(imageProperty, randomUniqueId);

    const interval = setInterval(() => {
      const canvas = document.getElementById(imageCanvasId);

      if (canvas?.ariaLabel === ImageCanvasLoadingStatesEnum.LOADED) {
        clearInterval(interval);
        const dataURLs = (
          (canvas as HTMLCanvasElement).toDataURL("image/jpeg", 1.0) as string
        ).split("base64,");
        resolve(dataURLs.length === 1 ? dataURLs[0] : dataURLs[1]);
      }
    }, 10);
  });
};

export const UNIQUE_ID_OF_BACKGROUND_CANVAS_CARD = "hidden-background-canvas";
