const jsdom = require("jsdom");
const path = require("path");
const axios = require("axios");
const FilesUtil = require("./filesUtil");
const ExifParserUtil = require("./exifParserUtil");
const ImageMetaUtil = require("./imageMetaUtil");
const iso = require('iso-3166-1');
const {ImageObj, ImageObjWithExifData} = require('../model/ImageObj');
const {DomTextObj} = require('../model/DomTextObj');
//const { Worker, isMainThread } = require('worker_threads');

/**
 * Determines whether to use the remote root directory of the Lucas Image Database,
 * or use a pre-specified directory in the image database.
 */
const IsUseRemoteLucasImageRootDirectory = false;

const localLucasDirectory = [
  ...(__dirname.split('\\').filter((_, index) => __dirname.split('\\').length - 1 !== index)), 
  "resources", "lucas"
];

const ImageFetchersUtil = {

  ElapsedTimeBetweenRemoteUrlFetch: 1000,

  JobTimeout: 30,

  MaximumNumberOfProcessableRequests: 10,

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
    ? [...localLucasDirectory, ""].join("\\")
    : [...localLucasDirectory, "2006", "HU", ""].join("\\"),

  /**
   * TODO: finish documentation.
   * @type {string[]} asd...
   */
  ListOfPendingUrlsToProcess: [],

  /**
   * TODO: finish documentation.
   * @type {ImageObjWithExifData[]} ...
   */
  ListOfPendingImageDataToUpload: [],

  /**
   * TODO: finish documentation.
   * @type {DomTextObj[]} ...
   */
  ListOfDomTextObj: [],

  /**
   * @type {{site: string, buffer: Buffer}[]} ...
   */
  ListOfBuffer: [],

  /**
   * @type {string[]}
   */
  ListOfUrlsToDownloadImages: [],

  RequestJobCancellation: 0,

  WaitForMaximumJobCancellationNotice: 30,



  IsJobCancelable: () => ImageFetchersUtil.ListOfPendingUrlsToProcess.length === 0
    && ImageFetchersUtil.ListOfDomTextObj.length === 0
    && ImageFetchersUtil.ListOfBuffer.length === 0
    && ImageFetchersUtil.ListOfUrlsToDownloadImages.length === 0,

  IsJobCancelled: () => ImageFetchersUtil.RequestJobCancellation >= ImageFetchersUtil.WaitForMaximumJobCancellationNotice,

  StartTime: new Date().toISOString(),

  /**
   * Fetch the images and directories from the lucas website and store them in the local directory.
   *
   * If directories are not existing in the local directory, then create new directories for them.
   *
   * If image is fetched, then check if that image is already posted to the database. If not,
   * then post it to the database.
   */
  FetchFromLucasSite: () => {
    ImageFetchersUtil.ListOfPendingUrlsToProcess.push(ImageFetchersUtil.LucasRemoteRootImageDirectoryPath);
    ImageFetchersUtil.HandleImageDownloadToLocalRepository();
    ImageFetchersUtil.HandleBufferProcessJob();
    ImageFetchersUtil.HandleDomTextProcessJob();
    ImageFetchersUtil.HandleUrlProcessJob();
    ImageFetchersUtil.UploadImagesDataToDB();

    const jobImageDownload = setInterval(() => {

      // Terminate the job once the algo requested more then enough cancellation request.
      if (ImageFetchersUtil.IsJobCancelable()) {
        if (ImageFetchersUtil.IsJobCancelled()) {
          // Terminate the job.
          clearInterval(jobImageDownload);
        } else {
          // Request job cancellation.
          ImageFetchersUtil.RequestJobCancellation++;
          console.log(`[Request job cancellation]: ${ImageFetchersUtil.RequestJobCancellation}/${ImageFetchersUtil.WaitForMaximumJobCancellationNotice}`);
        }
      } else {
        /** TODO: Delete later this console.log. */
        console.log(`[Progress]: Urls: ${ImageFetchersUtil.ListOfPendingUrlsToProcess.length}, DomTextArray: ${ImageFetchersUtil.ListOfDomTextObj.length}, ListOfBuffer: ${ImageFetchersUtil.ListOfBuffer.length}, ImageUrlsToDownload: ${ImageFetchersUtil.ListOfUrlsToDownloadImages.length} ImageData: ${ImageFetchersUtil.ListOfPendingImageDataToUpload.length}`);
      }
    }, ImageFetchersUtil.ElapsedTimeBetweenRemoteUrlFetch);
  },

  /**
   * Process a url from the remote lucas image db and upload it into our local db.
   */
  HandleUrlProcessJob: () => {
    let activeThreads = 0;
    const job = setInterval(() => {
      if (ImageFetchersUtil.IsJobCancelable() && ImageFetchersUtil.IsJobCancelled()) {
        clearInterval(job);
      } else if (
        activeThreads < ImageFetchersUtil.MaximumNumberOfProcessableRequests 
        && ImageFetchersUtil.ListOfPendingUrlsToProcess.length > 0
      ) {
        activeThreads++;
        ImageFetchersUtil.FetchDOMTextArray(() => activeThreads--);
      }
    }, [ImageFetchersUtil.JobTimeout]);
  },

  /**
   * Process the dom from the requested site for the purpose of 
   * searching more sites and downloading the found images.
   */
  HandleDomTextProcessJob: () => {
    const job = setInterval(() => {
      if (ImageFetchersUtil.IsJobCancelable() && ImageFetchersUtil.IsJobCancelled()) {
        clearInterval(job);
      } else if (ImageFetchersUtil.ListOfDomTextObj.length > 0) {
        const domTextObj = ImageFetchersUtil.ListOfDomTextObj.pop();
        ImageFetchersUtil.FetchImagesAndDirectoryPathesFromSite(domTextObj);
      }
    }, [ImageFetchersUtil.JobTimeout]);
  },

  HandleBufferProcessJob: () => {
    const job = setInterval(() => {
      if (ImageFetchersUtil.IsJobCancelable() && ImageFetchersUtil.IsJobCancelled()) {
        clearInterval(job);
      } else if (ImageFetchersUtil.ListOfBuffer.length > 0) {
        const node = ImageFetchersUtil.ListOfBuffer.pop();
        const newImagePathIntheLocalDirectory = ImageFetchersUtil.ConvertRemoteUrlToLocalUrl(node.site);
        FilesUtil.WriteToFileInLocalDirectory(
          newImagePathIntheLocalDirectory,
          node.buffer,
          () => ImageFetchersUtil.CreateDatabaseEntityOutOfImage(node.site)
        );
      }
    }, [ImageFetchersUtil.JobTimeout]);
  },

  HandleImageDownloadToLocalRepository: () => {
    let activeThreads = 0;
    const job = setInterval(() => {
      if (ImageFetchersUtil.IsJobCancelable() && ImageFetchersUtil.IsJobCancelled()) {
        clearInterval(job);
      } else if (
        activeThreads <= ImageFetchersUtil.MaximumNumberOfProcessableRequests 
        && ImageFetchersUtil.ListOfUrlsToDownloadImages.length > 0
      ) {
        activeThreads++;
        ImageFetchersUtil.FetchImageFromSite(() => activeThreads--);
      }
    }, [ImageFetchersUtil.JobTimeout]);
  },

  UploadImagesDataToDB: () => {
    let isWaitingForRequestToFinish = false;
    const job = setInterval(() => {
      if (
        ImageFetchersUtil.IsJobCancelable() 
        && ImageFetchersUtil.IsJobCancelled()
        && ImageFetchersUtil.ListOfPendingImageDataToUpload.length === 0
      ) {
        clearInterval(job);
        console.log("[FINISH]: Every image data is uploaded to the DB!", ImageFetchersUtil.StartTime, new Date().toISOString());
      } else if (!isWaitingForRequestToFinish && ImageFetchersUtil.ListOfPendingImageDataToUpload.length > 0) {
        isWaitingForRequestToFinish = !isWaitingForRequestToFinish;
        ImageFetchersUtil.PostImageDataToDB(() => isWaitingForRequestToFinish = !isWaitingForRequestToFinish);
      }
    }, [ImageFetchersUtil.JobTimeout]);
  },

  /**
   * @param {() => void} callback ...
   */
  PostImageDataToDB: (callback) => {
    const imageDataToUpload = ImageFetchersUtil.ListOfPendingImageDataToUpload.pop();
    if (imageDataToUpload) {
      axios.post(
        "http://localhost:8989/api/image/save-image",
        imageDataToUpload,
      ).then(() => callback())
      .catch((err) => console.error("[Error in CreateDatabaseEntityOutOfImage (axios)", err))
    } else {
      callback();
    }
  },

  /**
   * @param {string} site - The url where we downloaded the image from the remote lucas image db.
   */
  CreateDatabaseEntityOutOfImage: (site) => {
    const imageObj = ImageFetchersUtil.CreateDBEntityOfImageDatas(site);
    if (imageObj) {
      ImageFetchersUtil.CreateDBEntityOfExifDatas(site, imageObj);
    }
  },

  /**
   * @param {string} site - The url where we downloaded the image from the remote lucas image db.
   * @return {ImageObj | undefined} Returns an image object that contains most of the information of the image, or undefined.
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

      const directionCharacter = directionList.find(
        direction => directoriesInTheRemoteDB[4].toUpperCase().includes(direction.value.toUpperCase())
        || directoriesInTheRemoteDB[4].toUpperCase().includes(direction.key.toUpperCase())
      )?.value;

      if (directionCharacter) {
        const imageObj = new ImageObj(
          Number(directoriesInTheRemoteDB[0]),
          directoriesInTheRemoteDB[1],
          iso.whereAlpha2(directoriesInTheRemoteDB[1])?.country,
          Number(directoriesInTheRemoteDB[2]),
          Number(directoriesInTheRemoteDB[3]),
          directoriesInTheRemoteDB[4],
          directionCharacter,
        );
        return imageObj;
      } else {
        console.error("The direction is not defined correctly!", directoriesInTheRemoteDB[4]);
        return undefined;
      }
    }
  },

  /**
   * @param {string} site - The url where we downloaded the image from the remote lucas image db.
   * @param {ImageObj} imageObj - The url where we downloaded the image from the remote lucas image db.
   */
  CreateDBEntityOfExifDatas: (site, imageObj) => {
    const imagePath = ImageFetchersUtil.ConvertRemoteUrlToLocalUrl(site);
    FilesUtil.ExtractImageSizeOfLocalImage(imagePath, (byteLength) => 
      ExifParserUtil.ExtractExifMetadataFromImageBuffer(imagePath, (imageExifMetaData) => 
        ImageMetaUtil.ExtractImageMetaFromImage(imagePath, ImageWidthAndHeightMetaData => 
          ImageFetchersUtil.ListOfPendingImageDataToUpload.push(
            new ImageObjWithExifData(
              imageObj, 
              [byteLength, ...imageExifMetaData, ...ImageWidthAndHeightMetaData]
            )
          )
        )
      )
    )
  },

  /**
   * Sends out a fetch request to the requested site url, download the image
   * and save it in the local directory system.
   * @param {() => void} callback If called, than the image downloaded successfully.
   */
  FetchImageFromSite: (callback) => {
    const site = ImageFetchersUtil.ListOfUrlsToDownloadImages.pop();
    if (site) {
      fetch(site)
      .then(async response => {
        const result = await response.arrayBuffer();
        const nodeBuffer = Buffer.from(result);
        ImageFetchersUtil.ListOfBuffer.push({site: site, buffer: nodeBuffer});
        callback();
      /** TODO: Better error message here. */
      }).catch((err) => {
        console.error("[Error in FetchImageFromSite]:", err, site);
        callback();
      });
    } else {
      callback();
    }
  },

  /**
   * TODO: Finish the javadoc later.
   * @param {() => void} callback If called, than the image downloaded successfully.
   */
  FetchDOMTextArray: (callback) => {
    const site = ImageFetchersUtil.ListOfPendingUrlsToProcess.pop();
    if (site) {
      fetch(site)
      .then(async response => {
        if (response) {
          const result = await response.text();
          const domTextArray = result.split("\n").filter(domRow => domRow.includes("a href="));
          const domTextObj = new DomTextObj(site, domTextArray);
          ImageFetchersUtil.ListOfDomTextObj.push(domTextObj);
        }
        callback();
      /** TODO: Better error message here. */
      }).catch((err) => {
        console.error("[Error in FetchDOMTextArray]:", err, site);
        callback();
      });
    } else {
      callback();
    }
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
   * @param {DomTextObj} domTextObj ...
   **/
  FetchImagesAndDirectoryPathesFromSite: (domTextObj) => {
    try {
      domTextObj.domTextArray.forEach((domRow) => {
        const dom = new jsdom.JSDOM(domRow);
        const tag = dom.window.document.querySelector("a");
        if (tag) {
          ImageFetchersUtil.HandleDirectoryTag(domTextObj.site, tag.textContent);
          ImageFetchersUtil.HandleImageTag(domTextObj.site, tag.textContent);
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
   */
  HandleDirectoryTag: (site, textContent) => {
    // === Directory found on remote server === //
    if (textContent.endsWith("/")) {
      // constructing the new site path to search by.
      const newSitePath = path.join(site, textContent);
      // Create local directory for the folder
      FilesUtil.CreateDirectoryIfNotExistsAlready(
        ImageFetchersUtil.ConvertRemoteUrlToLocalUrl(newSitePath), 
        () => {
          ImageFetchersUtil.ListOfPendingUrlsToProcess.push(newSitePath);
          ImageFetchersUtil.RequestJobCancellation = 0;
        }
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
      ImageFetchersUtil.ListOfUrlsToDownloadImages.push(jpg);
    }
  },
};

module.exports = { ...ImageFetchersUtil };
