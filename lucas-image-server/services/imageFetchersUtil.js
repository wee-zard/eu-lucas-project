const {CustomEventEmitter} = require('../model/CustomEventEmitter');
const {ImageDataUploadJob} = require('../jobs/ImageDataUploadJob');
const {ImageToLocalRepoJob} = require('../jobs/ImageToLocalRepoJob');
const {BufferProcessJob} = require('../jobs/BufferProcessJob');
const {ProcessUrlJob} = require('../jobs/ProcessUrlJob');
const {DomTextProcessJob} = require('../jobs/DomTextProcessJob');
const {JobEventEmitterEnums} = require('../enums/Enums');

class ImageFetchersUtil {

  /**
   * A custom made event emitter for the purpose of keeping the connection between the different jobs 
   * that are running in the background.
   */
  JobEventEmitter = new CustomEventEmitter();

  JobCancellationCounter = {
    CountJobRequestCancellation: 0,
    WaitForMaximumJobCancellationNotice: 30,
  };

  BufferProcessJobObj = new BufferProcessJob();
  DomTextProcessJobObj = new DomTextProcessJob();
  ImageDataUploadJobObj = new ImageDataUploadJob();
  ImageToLocalRepoJobObj = new ImageToLocalRepoJob();
  ProcessUrlJobObj = new ProcessUrlJob();

  constructor(){
    this.InitJobs();
    this.InitJobCancellationCheckerJob();
  }

  InitJobs = () => {
    this.ImageDataUploadJobObj = new ImageDataUploadJob(this.JobEventEmitter);
    this.ImageToLocalRepoJobObj = new ImageToLocalRepoJob(this.JobEventEmitter);
    this.BufferProcessJobObj = new BufferProcessJob(this.JobEventEmitter);
    this.ProcessUrlJobObj = new ProcessUrlJob(this.JobEventEmitter);
    this.DomTextProcessJobObj = new DomTextProcessJob(this.JobEventEmitter);
  }

  IsJobCancelable = () => 
    this.ProcessUrlJobObj.ListOfPendingUrlsToProcess.length === 0
    && this.DomTextProcessJobObj.ListOfDomTextObj.length === 0
    && this.BufferProcessJobObj.ListOfBuffer.length === 0
    && this.ImageToLocalRepoJobObj.ListOfUrlsToDownloadImages.length === 0;

  IsJobCancelled = () => this.JobCancellationCounter.CountJobRequestCancellation >= this.JobCancellationCounter.WaitForMaximumJobCancellationNotice;

  IsJobContollerCancelled = () => {
    if (this.IsJobCancelable()) {
      if (this.IsJobCancelled()) {
        this.JobEventEmitter.emit(JobEventEmitterEnums.REQUEST_ALL_JOBS_TO_CANCEL);
        console.log("[JOB]: ImageFetchersUtil main job is cancelled!");
        return true;
      } else {
        this.JobCancellationCounter.CountJobRequestCancellation++;
        console.log(`[Request end of jobs]: ${this.JobCancellationCounter.CountJobRequestCancellation}/${this.JobCancellationCounter.WaitForMaximumJobCancellationNotice}`)
        return false;
      }
    } else {
      this.JobCancellationCounter.CountJobRequestCancellation = 0;
    }
  }

  /**
   * Fetch the images and directories from the lucas website and store them in the local directory.
   *
   * If directories are not existing in the local directory, then create new directories for them.
   *
   * If image is fetched, then check if that image is already posted to the database. If not,
   * then post it to the database.
   */
  InitJobCancellationCheckerJob = () => {
    const job = setInterval(() => {
      console.log(
        "pendingUrl:", this.ProcessUrlJobObj.ListOfPendingUrlsToProcess.length,
        "domText:", this.DomTextProcessJobObj.ListOfDomTextObj.length,
        "imageToDownload:", this.ImageToLocalRepoJobObj.ListOfUrlsToDownloadImages.length,
        "buffer:", this.BufferProcessJobObj.ListOfBuffer.length,
        "imageObjToDb:", this.ImageDataUploadJobObj.ListOfPendingImageDataToUpload.length,
      );
      if (this.IsJobContollerCancelled()) {
        clearInterval(job);
      }
    }, [1000]);
  }
};

module.exports = { ImageFetchersUtil };
