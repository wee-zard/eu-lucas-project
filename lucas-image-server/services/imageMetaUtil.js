const { imageMeta } = require("image-meta");
const { ExifData } = require("../model/ExifData");
const FilesUtil = require("../services/filesUtil");

const ImageMetaUtil = {
  /**
   * @param {string} localFilePath Path to the image in the local directory system
   * @param {(exifData: ExifData[]) => void} callback
   */
  ExtractImageMetaFromImage: (localFilePath, callback) => {
    FilesUtil.ExtractBufferOfLocalImage(localFilePath, buffer => {
      if (buffer) {
        const meta = imageMeta(buffer);
        if (meta.width && meta.height) {
          const result = [
            new ExifData("ImageWidth", meta.width),
            new ExifData("ImageHeight", meta.height),
          ];
          callback(result);
        }
      } else {
        callback([]);
      }
    });
  },
};

module.exports = {...ImageMetaUtil};
