import SelectedImagesModel from "@model/SelectedImagesModel";
import JSZip from "jszip";
import { saveAs } from "file-saver-es";
import ImageUtils from "./imageUtils";
import ImageFetcherCommands from "@api/command/imageFetcherCommands";
import FileUtils from "./fileUtils";

abstract class ZipHelper {
  public static downloadZip = (models: SelectedImagesModel[]): Promise<boolean> => {
    return new Promise(async (resolve, reject) => {
      const zip = new JSZip();
      const name = `lucas-image-analyzer_${new Date(Date.now()).toISOString()}.zip`;

      // Step 1.1.: Fetch the remote urls:
      const remoteImageUrls = models.map((model) =>
        model.images.map((image) => ImageUtils.initRemoteImageUrlPath(image.image)),
      );

      // Step 1.2.: Filter out the undefined elements.
      let filteredRemoteImageUrls: string[] = [];
      remoteImageUrls.forEach((image1) =>
        image1.forEach((image2) => {
          if (!image2 || filteredRemoteImageUrls.includes(image2)) {
            return;
          }
          filteredRemoteImageUrls = [...filteredRemoteImageUrls, image2];
        }),
      );

      // Step 1.3.: Adding images to the zip (pending state)
      for await (const url of filteredRemoteImageUrls) {
        try {
          const base64String = await ImageFetcherCommands.downloadImagesByUrl(url);
          const blob = FileUtils.base64ToBlob(base64String);
          const uniqueFileName = url.replace(`${ImageUtils.remoteUrl}/`, "").replaceAll("/", "-");
          zip.file(uniqueFileName, blob, { binary: true });
        } catch (error) {
          reject(error);
          return;
        }
      }

      // Step 1.4.: Saving the zip and downloading it.
      zip
        .generateAsync({ type: "blob" })
        .then((content) => {
          if (content) saveAs(content, name);
        })
        .catch(reject)
        .finally(() => {
          resolve(true);
        });
    });
  };
}

export default ZipHelper;
