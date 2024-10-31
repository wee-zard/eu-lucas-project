const ExifImage = require("exif").ExifImage;

const ExifParserUtil = {
  /**
   * @param {string} localFilePath - Path to the image in the local directory system
   * @param {number} byteLength - The size of the Image
   * @param {(processedImgObj: any) => void} callback 
   */
  ExtractExifMetadataFromImageBuffer: async (localFilePath, byteLength, callback) => {
    try {
      new ExifImage({ image: localFilePath }, (error, data) => {
        if (error) {
          console.error("[Error in ExtractExifMetadataFromImageBuffer (ExifImage)]:", error.message);
          callback(undefined);
        } else {

          /**
           * TODO: Store the possible EXIF metadatas in the below object.
           */
          const exifList = [
            // ===== Description =====
            { exifKey: 'Title', exifValue: data.image.ImageDescription },

            // ===== Origin =====
            { exifKey: 'Artist', exifValue: data.image.Artist },
            { exifKey: 'CreateDate', exifValue: data.exif.CreateDate },
            //{ exifKey: 'Copyright', exifValue: data.image.Copyright },

            // ===== Image =====
            { exifKey: 'XResolution', exifValue: data.image.XResolution },
            { exifKey: 'YResolution', exifValue: data.image.YResolution },
            { exifKey: 'ResolutionUnit', exifValue: data.image.ResolutionUnit }, // TODO: 2db ResolutionUnit?
            { exifKey: 'ImageWidth', exifValue: data.exif.ExifImageWidth ?? data.image.ImageWidth },
            { exifKey: 'ImageHeight', exifValue: data.exif.ExifImageHeight ?? data.image.ImageHeight },
            { exifKey: 'ResolutionUnit', exifValue: data.exif.ResolutionUnit }, // Felbontási egység

            // ===== File =====
            { exifKey: 'ModifyDate', exifValue: data.image.ModifyDate }, // Felbontási egység

            // ===== Camera =====
            { exifKey: 'Make', exifValue: data.image.Make }, // Fényképezőgép gyártója
            { exifKey: 'Model', exifValue: data.image.Model }, // Fényképezőgép típusa
            { exifKey: 'FStop', exifValue: data.exif.FNumber }, // F-stop
            { exifKey: 'ExposureTime', exifValue: data.exif.ExposureTime }, // Fényképezőgép típusa
            //{ exifKey: 'ISO', exifValue: data.exif.ISO }, // Érzékenység
            { exifKey: 'FocalLength', exifValue: data.exif.FocalLength }, // Fókusztávolság

            // ===== Other Metadata =====
            { exifKey: 'imageSize', exifValue: byteLength },

          ].filter((obj) => 
            !!obj.exifValue 
            && typeof obj.exifValue !== 'object'
            && obj.exifValue.toString().length <= 100
          ).map((obj) => ({
            exifKey: obj.exifKey,
            exifValue: obj.exifValue.toString()
          }));

          callback(exifList);
        }
      });
    } catch (error) {
      console.error("[Error in ExtractExifMetadataFromImageBuffer (catch)]:", error);
      callback(undefined);
    }
  },
};

module.exports = { ...ExifParserUtil };
