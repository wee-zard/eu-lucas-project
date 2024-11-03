const { CustomEventEmitter } = require("../model/CustomEventEmitter");
const { ImageObjWithExifData } = require("../model/ImageObj");
const { JobEventEmitterEnums } = require("../enums/Enums");
const UrlHelper = require("../helper/UrlHelper");
const axios = require("axios");

class ImageDataUploadJob {
  JobEventEmitter;
  IsJobCancelled;
  ListOfPendingImageDataToUpload;

  /**
   * @param {CustomEventEmitter} JobEventEmitter 
   * @param {boolean} IsJobCancelled 
   * @param {ImageObjWithExifData[]} ListOfPendingImageDataToUpload 
   */
  constructor(
    JobEventEmitter = new CustomEventEmitter(),
    IsJobCancelled = false,
    ListOfPendingImageDataToUpload = [],
  ){
    this.JobEventEmitter = JobEventEmitter;
    this.IsJobCancelled = IsJobCancelled;
    this.ListOfPendingImageDataToUpload = ListOfPendingImageDataToUpload;
    this.HandleJobEventEmitterResponses();
    this.UploadImagesDataToDB();
  }

  HandleJobEventEmitterResponses = () => {
    this.JobEventEmitter.on(JobEventEmitterEnums.REQUEST_ALL_JOBS_TO_CANCEL, () => (this.IsJobCancelled = true));
    this.JobEventEmitter.on(JobEventEmitterEnums.IMAGE_DATA_TO_UPLOAD, (imageObjWithExifData) => this.ListOfPendingImageDataToUpload.push(imageObjWithExifData));
  }

  UploadImagesDataToDB = () => {
    const job = setInterval(() => {
      if (
        this.IsJobCancelled &&
        this.ListOfPendingImageDataToUpload.length === 0
      ) {
        clearInterval(job);
        console.log("[JOB]: ImageDataUploadJob is cancelled!")
      } else if (
        !this.isWaitingForRequestToFinish &&
        this.ListOfPendingImageDataToUpload.length > 0
      ) {
        this.isWaitingForRequestToFinish = true;
        this.PostImageDataToDB();
      }
    }, [UrlHelper.JobTimeout]);
  }

  PostImageDataToDB = () => {
    const imageDataToUpload = this.ListOfPendingImageDataToUpload.pop();
    if (imageDataToUpload) {
      axios
        .post("http://localhost:8989/api/image/save-image", imageDataToUpload)
        .then(() => this.isWaitingForRequestToFinish = false)
        .catch((err) => {
          console.error("[Error in CreateDatabaseEntityOutOfImage (axios)", err);
          this.isWaitingForRequestToFinish = false;
        }
      );
    } else {
      this.isWaitingForRequestToFinish = false;
    }
  }
}

module.exports = { ImageDataUploadJob };
