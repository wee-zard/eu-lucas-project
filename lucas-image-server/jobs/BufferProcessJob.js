const path = require("path");
const iso = require('iso-3166-1');
const { CustomEventEmitter } = require("../model/CustomEventEmitter");
const { JobEventEmitterEnums } = require("../enums/Enums");
const UrlHelper = require("../helper/UrlHelper");
const {ImageObj, ImageObjWithExifData} = require('../model/ImageObj');
const {ImageBuffer} = require('../model/ImageBuffer');
const FilesUtil = require("../services/filesUtil");
const ExifParserUtil = require("../services/exifParserUtil");
const ImageMetaUtil = require("../services/imageMetaUtil");

class BufferProcessJob {
  JobEventEmitter;
  IsJobCancelled;
  ListOfBuffer;

  /**
   * @param {CustomEventEmitter} JobEventEmitter 
   * @param {boolean} IsJobCancelled 
   * @param {ImageBuffer[]} ListOfBuffer 
   */
  constructor(
    JobEventEmitter = new CustomEventEmitter(),
    IsJobCancelled = false,
    ListOfBuffer = [],
  ){
    this.JobEventEmitter = JobEventEmitter;
    this.IsJobCancelled = IsJobCancelled;
    this.ListOfBuffer = ListOfBuffer;
    this.HandleJobEventEmitterResponses();
    this.HandleBufferProcessJob();
  }

  HandleJobEventEmitterResponses = () => {
    this.JobEventEmitter.on(JobEventEmitterEnums.REQUEST_ALL_JOBS_TO_CANCEL, () => (this.IsJobCancelled = true));
    this.JobEventEmitter.on(JobEventEmitterEnums.ADD_IMAGE_BUFFER, (buffer) => this.ListOfBuffer.push(buffer));
  };

  HandleBufferProcessJob = () => {
    const job = setInterval(() => {
      if (this.IsJobCancelled) {
        clearInterval(job);
        console.log("[JOB]: BufferProcessJob is cancelled!")
      } else if (this.ListOfBuffer.length > 0) {
        const node = this.ListOfBuffer.pop();
        const newImagePathIntheLocalDirectory = UrlHelper.ConvertRemoteUrlToLocalUrl(node.site);
        FilesUtil.WriteToFileInLocalDirectory(
          newImagePathIntheLocalDirectory,
          node.buffer,
          () => this.CreateDatabaseEntityOutOfImage(node.site)
        );
      }
    }, [UrlHelper.JobTimeout]);
  }

  /**
   * @param {string} site - The url where we downloaded the image from the remote lucas image db.
   */
  CreateDatabaseEntityOutOfImage = (site) => {
    const imageObj = this.CreateDBEntityOfImageDatas(site);
    if (imageObj) {
      this.CreateDBEntityOfExifDatas(site, imageObj);
    }
  }

  /**
   * @param {string} site - The url where we downloaded the image from the remote lucas image db.
   * @return {ImageObj | undefined} Returns an image object that contains most of the information of the image, or undefined.
   */
  CreateDBEntityOfImageDatas = (site) => {
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
  }
  
  /**
   * @param {string} site - The url where we downloaded the image from the remote lucas image db.
   * @param {ImageObj} imageObj - The url where we downloaded the image from the remote lucas image db.
   */
  CreateDBEntityOfExifDatas = (site, imageObj) => {
    const imagePath = UrlHelper.ConvertRemoteUrlToLocalUrl(site);
    FilesUtil.ExtractImageSizeOfLocalImage(imagePath, (byteLength) => 
      ExifParserUtil.ExtractExifMetadataFromImageBuffer(imagePath, (imageExifMetaData) => 
        ImageMetaUtil.ExtractImageMetaFromImage(imagePath, ImageWidthAndHeightMetaData => 
          this.JobEventEmitter.emit(JobEventEmitterEnums.IMAGE_DATA_TO_UPLOAD, 
            new ImageObjWithExifData(
            imageObj, 
            [byteLength, ...imageExifMetaData, ...ImageWidthAndHeightMetaData]
          ))
        )
      )
    )
  }
};

module.exports = { BufferProcessJob };
