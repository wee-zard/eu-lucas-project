const { CustomEventEmitter } = require("../model/CustomEventEmitter");
const {ImageBuffer} = require('../model/ImageBuffer');
const { JobEventEmitterEnums } = require("../enums/Enums");
const UrlHelper = require("../helper/UrlHelper");

class ImageToLocalRepoJob {
  /**
   * The number of active thread during the job.
   */
  ActiveThreadNo = 0;
  JobEventEmitter;
  IsJobCancelled;
  ListOfUrlsToDownloadImages;

  /**
   * @param {CustomEventEmitter} JobEventEmitter 
   * @param {boolean} IsJobCancelled 
   * @param {string[]} ListOfUrlsToDownloadImages 
   */
  constructor(
    JobEventEmitter = new CustomEventEmitter(),
    IsJobCancelled = false,
    ListOfUrlsToDownloadImages = [],
  ){
    this.JobEventEmitter = JobEventEmitter;
    this.IsJobCancelled = IsJobCancelled;
    this.ListOfUrlsToDownloadImages = ListOfUrlsToDownloadImages;
    this.HandleJobEventEmitterResponses();
    this.HandleImageDownloadToLocalRepository();
  }

  HandleJobEventEmitterResponses = () => {
    this.JobEventEmitter.on(JobEventEmitterEnums.REQUEST_ALL_JOBS_TO_CANCEL, () => (this.IsJobCancelled = true));
    this.JobEventEmitter.on(JobEventEmitterEnums.IMAGE_URL_TO_DOWNLOAD, (url) => this.ListOfUrlsToDownloadImages.push(url));
  }

  /**
   * FIXME: I am allowing 10 processes to run in the background,
   * but is the system use up all 10 of them, or only 1 of them running?
   */
  HandleImageDownloadToLocalRepository = () => {
    const job = setInterval(() => {
      if (this.IsJobCancelled) {
        clearInterval(job);
        console.log("[JOB]: ImageToLocalRepoJob is cancelled!")
      } else if (
        this.ActiveThreadNo <= UrlHelper.MaximumNumberOfProcessableRequests
        && this.ListOfUrlsToDownloadImages.length > 0
      ) {
        this.ActiveThreadNo++;
        this.FetchImageFromSite();
      }
    }, [UrlHelper.JobTimeout]);
  }

  /**
   * Sends out a fetch request to the requested site url, download the image
   * and save it in the local directory system.
   */
    FetchImageFromSite = () => {
      const site = this.ListOfUrlsToDownloadImages.pop();
      if (site) {
        fetch(site)
          .then(async response => {
            const result = await response.arrayBuffer();
            const nodeBuffer = Buffer.from(result);
            const imageBuffer = new ImageBuffer(site, nodeBuffer);
            this.JobEventEmitter.emit(JobEventEmitterEnums.ADD_IMAGE_BUFFER, imageBuffer);
            this.ActiveThreadNo--;
            /** TODO: Better error message here. */
          }).catch((err) => {
            console.error("[Error in FetchImageFromSite]:", err, site);
            this.ActiveThreadNo--;
          });
      } else {
        this.ActiveThreadNo--;
      }
    }
};

module.exports = { ImageToLocalRepoJob };