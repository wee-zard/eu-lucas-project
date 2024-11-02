const ExifImage = require("exif").ExifImage;
const {ExifData} = require('../model/ExifData');

const ExifParserUtil = {
  /**
   * @param {string} localFilePath - Path to the image in the local directory system
   * @param {(exifData: ExifData[]) => void} callback 
   */
  ExtractExifMetadataFromImageBuffer: (localFilePath, callback) => {
    new ExifImage({ image: localFilePath }, (error, data) => {
      if (error) {
        //console.error("[Error in ExtractExifMetadataFromImageBuffer (ExifImage)]:", error.message, localFilePath);
        callback([]);
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

          // ===== Image =====
          { exifKey: 'XResolution', exifValue: data.image.XResolution },
          { exifKey: 'YResolution', exifValue: data.image.YResolution },
          { exifKey: 'ResolutionUnit', exifValue: data.image.ResolutionUnit ?? data.exif.ResolutionUnit },

          // ===== File =====
          { exifKey: 'ModifyDate', exifValue: data.image.ModifyDate }, // Felbontási egység

          // ===== Camera =====
          { exifKey: 'Make', exifValue: data.image.Make }, // Fényképezőgép gyártója
          { exifKey: 'Model', exifValue: data.image.Model }, // Fényképezőgép típusa
          { exifKey: 'FStop', exifValue: data.exif.FNumber }, // F-stop
          { exifKey: 'ExposureTime', exifValue: data.exif.ExposureTime }, // Fényképezőgép típusa
          //{ exifKey: 'ISO', exifValue: data.exif.ISO }, // Érzékenység
          { exifKey: 'FocalLength', exifValue: data.exif.FocalLength }, // Fókusztávolság

        ].filter((obj) => 
          !!obj.exifValue 
          && typeof obj.exifValue !== 'object'
          && obj.exifValue.toString().length <= 100
        ).map((obj) => new ExifData(obj.exifKey, obj.exifValue.toString()));

        callback(exifList);
      }
    });
  },
};

module.exports = { ...ExifParserUtil };
