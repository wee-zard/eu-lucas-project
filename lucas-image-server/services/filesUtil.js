const fs = require("fs");
const {ExifData} = require('../model/ExifData');

const FilesUtil = {

  IsDirectoryExist: (directoryPath) => fs.existsSync(`${directoryPath}`),

  /**
   * @param {string} localFilePath
   * @param {(buffer: Buffer | undefined) => void} callback 
   */
  ExtractBufferOfLocalImage: (localFilePath, callback) => {
    try {
      fs.readFile(localFilePath, (err, buffer) => {
        if (err) {
          console.error("[Error in ExtractImageSizeOfLocalImage readFile]:", err);
          callback(undefined);
        }
        else callback(buffer);
      });
    } catch (err) {
      console.error("[Error in ExtractImageSizeOfLocalImage]:", err);
      callback(undefined);
    }
  },


  /**
   * @param {string} localFilePath
   * @param {(byteLength: ExifData) => void} callback 
   */
  ExtractImageSizeOfLocalImage: (localFilePath, callback) => {
    try {
      fs.readFile(localFilePath, (err, buffer) => {
        if (err) console.error("[Error in ExtractImageSizeOfLocalImage readFile]:", err);
        else callback(new ExifData("ImageSize", buffer.byteLength));
      });
    } catch (err) {
      console.error("[Error in ExtractImageSizeOfLocalImage]:", err);
    }
  },

  /**
   * If the requested directory is not exists in the local directory system,
   * then create a new directory at the location of the requestes path.
   * @param {string} directoryPath - Path to the directory to create in the local directory system.
   * @param {() => void} callback - Called when the process if finihed.
   */
  CreateDirectoryIfNotExistsAlready: (directoryPath, callback) => {
    if (!FilesUtil.IsDirectoryExist(directoryPath)) {
      try {
        fs.mkdir(`${directoryPath}`, (error) => {
          if (error) console.error("[Error in CreateDirectoryIfNotExistsAlready mkdir]:", error);
        });
      } catch (err) {
        console.error("[Error in CreateDirectoryIfNotExistsAlready]:", err);
      } finally {
        callback();
      }
    } else {
      callback();
    }
  },

  /**
   * @param {string} directoryPath
   * @param {Buffer} responseData
   * @param {() => void} callback - Called when the image is successfuly created in the local directory.
   */
  WriteToFileInLocalDirectory: (directoryPath, responseData, callback) => {
    try {
      fs.writeFile(directoryPath, responseData, (err) => {
        if (err) console.error("[Error in WriteToFileInLocalDirectory writeFile]:", err);
        else callback();
      });
    } catch (err) {
      console.error("[Error in WriteToFileInLocalDirectory]:", err);
    }
  },

  /**
   * @param {string} jsonPath - The path to the json file that contains the last update on the image server.
   * @param {(lastUpdateTime: Date) => void} callback 
   * @returns {Date | null | undefined} Gives back the last update time on the image server.
   */
  FetchLastUpdateTimeFromLocalDirectory: (jsonPath, callback) => {
    try {
      delete require.cache[require.resolve(jsonPath)];
      fs.readFile(jsonPath, {encoding: 'utf8'}, (err, data) => {
        if (err) {
          console.error("[Error in FetchLastUpdateTimeFromLocalDirectory readFile]:", err);
          callback(undefined);
        } else {
          callback(JSON.parse(data)[0].lastUpdateTime);
        }
      });
    } catch (err) {
      console.error("[Error in FetchLastUpdateTimeFromLocalDirectory]:", err);
    }
  }
};

module.exports = { ...FilesUtil };
