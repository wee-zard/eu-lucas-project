const jsdom = require("jsdom");
const path = require("path");
const axios = require("axios");
const FilesUtil = require("./filesUtil");
const ExifParserUtil = require("./exifParserUtil");
const iso = require('iso-3166-1');

/**
 * Determines whether to use the remote root directory of the Lucas Image Database,
 * or use a pre-specified directory in the image database.
 */
const IsUseRemoteLucasImageRootDirectory = false;

const ImageFetchersUtil = {

  ElapsedTimeBetweenRemoteUrlFetch: 3000,

  /**
   * The live url where we connect to the Lucas Image Database. This is a directory url, where 
   * the system will start to search after the images to fetch them.
   */
  LucasRemoteRootImageDirectoryPath: IsUseRemoteLucasImageRootDirectory 
    ? path.join("https://gisco-services.ec.europa.eu/lucas/photos/", "")
    : path.join("https://gisco-services.ec.europa.eu/lucas/photos/2006/HU/",""),

  /**
   * The path to the local directory that is containing the images from the
   * Remote Lucas Image database.
   */
  LucasLocalRootImageDirectoryPath: IsUseRemoteLucasImageRootDirectory 
    ? path.join(__dirname.replace("services", "resources"), "lucas", "/")
    : path.join(__dirname.replace("services", "resources"), "lucas", "2006", "HU", "/"),

  /**
   * Fetch the images and directories from the lucas website and store them in the local directory.
   *
   * If directories are not existing in the local directory, then create new directories for them.
   *
   * If image is fetched, then check if that image is already posted to the database. If not,
   * then post it to the database.
   */
  FetchFromLucasSite: () => {

    /**
     * @type {string[]}
     */
    let listOfPendingUrlsToProcess = [ImageFetchersUtil.LucasRemoteRootImageDirectoryPath];

    const jobImageDownload = setInterval(() => {
      if (listOfPendingUrlsToProcess.length > 0) {
        const url = listOfPendingUrlsToProcess.pop();
        ImageFetchersUtil.FetchDOMTextArray(
          url, 
          (domTextObj) => {
            ImageFetchersUtil.FetchImagesAndDirectoryPathesFromSite(
            domTextObj, 
            (url) => listOfPendingUrlsToProcess.push(url)
          )}
        );
        /** TODO: Delete this console log later. */
        console.log("[Processed url]:", url, listOfPendingUrlsToProcess.length);
      } else {
        clearInterval(jobImageDownload);
      }
    }, ImageFetchersUtil.ElapsedTimeBetweenRemoteUrlFetch);
  },

  /**
   * @param {string} site - The url where we downloaded the image from the remote lucas image db.
   */
  CreateDatabaseEntityOutOfImage: (site) => {
    const imageObj = ImageFetchersUtil.CreateDBEntityOfImageDatas(site);
    if (imageObj) {
      ImageFetchersUtil.CreateDBEntityOfExifDatas(site, (imageExifMetadata) => {
        const imageObjWithExifData = { ...imageObj, exifData: imageExifMetadata };
        try {
          axios.post(
            "http://localhost:8989/api/image/post-new-image",
            imageObjWithExifData, // Attaching the form data
          ).catch((err) => console.error("[Error in CreateDatabaseEntityOutOfImage (axios)", err))
        } catch (err) {
          console.error(err);
        }
      });
    }
  },

  /**
   * @param {string} site - The url where we downloaded the image from the remote lucas image db.
   */
  CreateDBEntityOfImageDatas: (site) => {
    const directoriesInTheRemoteDB = site.split(path.join("lucas", "photos", "/"))[1].split(path.join("/"));
    if (directoriesInTheRemoteDB.length === 5) {
      const directionList = [
        { key: "E", value: "East" },
        { key: "W", value: "West" },
        { key: "N", value: "North" },
        { key: "S", value: "South" },
        { key: "P", value: "Point" },
        { key: "C", value: "Crop" },
      ];

      const imageObj = {
        year: Number(directoriesInTheRemoteDB[0]),
        countryCode: directoriesInTheRemoteDB[1],
        countryName: iso.whereAlpha2(directoriesInTheRemoteDB[1])?.country,
        latitude: Number(directoriesInTheRemoteDB[2]),
        longitude: Number(directoriesInTheRemoteDB[3]),
        imageName: directoriesInTheRemoteDB[4],
        directionName: directionList.find(direction => directoriesInTheRemoteDB[4].includes(direction.key))?.value,
      }
      return imageObj;
    }
  },

  /**
   * @param {string} site - The url where we downloaded the image from the remote lucas image db.
   * @param {(imageExifMetadata: any) => void} callback 
   */
  CreateDBEntityOfExifDatas: (site, callback) => {
    const imagePath = ImageFetchersUtil.ConvertRemoteUrlToLocalUrl(site);
    FilesUtil.ExtractImageSizeOfLocalImage(imagePath, (byteLength) => 
      ExifParserUtil.ExtractExifMetadataFromImageBuffer(imagePath, byteLength, (imageExifMetadata) => {
        if (imageExifMetadata) {
          callback(imageExifMetadata);
        }
      })
    )
  },

  /**
   * Sends out an axios fetch request to the requested site url, download the image
   * and save it in the local directory system.
   * @param {string} site - The url where we could download the requested image.
   */
  FetchImageFromSite: (site) => {
    // how to read files from an url and save that IMAGE in the local directory
    try {
      axios
      .get(site, { responseType: "arraybuffer" })
      .then((response) => {
        const newImagePathIntheLocalDirectory = ImageFetchersUtil.ConvertRemoteUrlToLocalUrl(site);
        FilesUtil.WriteToFileInLocalDirectory(
          newImagePathIntheLocalDirectory,
          response.data,
          () => ImageFetchersUtil.CreateDatabaseEntityOutOfImage(site)
        );
      })
      /** TODO: Better error message here. */
      .catch((err) => console.error("[Error in FetchImageFromSite (axios)]:", err));
    } catch (err) {
      /** TODO: Better error message here. */
      console.error("[Error in FetchImageFromSite (error throwed during process)]:", err);
    }
  },

  /**
   * TODO: Finish the javadoc later.
   * @param {string} site - The url where we could download the requested image.
   * @param {(any) => void} callback dom list that contains the directories and images that can be found on the requested site.
   */
  FetchDOMTextArray: (site, callback) => {
    axios
      .get(site)
      .then(response => {
        if (response) {
          const domTextArray = response.data.split("\n");
          callback({site: site, domTextArray: domTextArray});
        }
      })
      /** TODO: Better error message here. */
      .catch((err) => console.error("[FetchDOMTextArray]:", err));
  },

  /**
   * TODO: Finish the javadoc later.
   * @param {string} site - The site that needs to be replaced with the local directory site.
   */
  ConvertRemoteUrlToLocalUrl: (site) => {
    return site.replace(
      ImageFetchersUtil.LucasRemoteRootImageDirectoryPath,
      ImageFetchersUtil.LucasLocalRootImageDirectoryPath
    );
  },

  /**
   * TODO: Finish the javadoc later.
   * Sends out an axios fetch request to the requested site url, download the image
   * and save it in the local directory system.
   * @param {any} domTextObj - ...
   * @param {(url: string) => void} callback - ...
   **/
  FetchImagesAndDirectoryPathesFromSite: (domTextObj, callback) => {
    const site = domTextObj.site;
    /**
     * @type {string[]} 
     */
    const domTextArray = domTextObj.domTextArray;
    try {
      domTextArray.filter(domRow => domRow.includes("a href=")).forEach((domRow) => {
        const dom = new jsdom.JSDOM(domRow);
        const tag = dom.window.document.querySelector("a");
        if (tag) {
          ImageFetchersUtil.HandleDirectoryTag(site, tag.textContent, (newSitePath) => callback(newSitePath));
          ImageFetchersUtil.HandleImageTag(site, tag.textContent);
        }
      });
    } catch (err) {
      /**
       * TODO: Better error message here.
       */
      console.error(err);
    }
  },

  /**
   * TODO: Finish the javadoc later.
   * @param {string} site - ...
   * @param {string | null} textContent - ...
   * @param {(newSitePath: string) => void} callback - ...
   */
  HandleDirectoryTag: (site, textContent, callback) => {
    // === Directory found on remote server === //
    if (textContent.endsWith("/")) {
      // constructing the new site path to search by.
      const newSitePath = path.join(site, textContent);
      // Create local directory for the folder
      FilesUtil.CreateDirectoryIfNotExistsAlready(
        ImageFetchersUtil.ConvertRemoteUrlToLocalUrl(newSitePath), 
        () => callback(newSitePath)
      );
    }
  },

  /**
   * The tag what the algo found is an image tag. This method determines if that
   * image is already stored in the local directory system or not.
   * 
   * If not, then we fetch that image, save it in the directory system, and push
   * the newly constructed imageObj to the db, so we could store the most important
   * information of the images in their.
   * @param {string} site - ...
   * @param {string | null} textContent - ...
   */
  HandleImageTag: (site, textContent) => {
    // === Image found on the remote server === //
    if (textContent.endsWith(".jpg")) {
      const jpg = path.join(site, textContent);
      const localImagePath = ImageFetchersUtil.ConvertRemoteUrlToLocalUrl(jpg);
      const isImageAlreadyExistsIntheLocalDirectorySystem = FilesUtil.IsDirectoryExist(localImagePath);
      if (isImageAlreadyExistsIntheLocalDirectorySystem) {
        /**
         * Image is already stored in the local directory system,
         * so we will skip the further procedures of this thread.
         */
      } else {
        /**
         * Image is not stored in the local directory system.
         * We must download it, and store in a folder.
         * After the download, we should fetch the data of the image and 
         * upload it into the db.
         */
        ImageFetchersUtil.FetchImageFromSite(jpg);
      }
    }
  },
};

module.exports = { ...ImageFetchersUtil };
