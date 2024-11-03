const jsdom = require("jsdom");
const path = require("path");
const { CustomEventEmitter } = require("../model/CustomEventEmitter");
const { JobEventEmitterEnums } = require("../enums/Enums");
const UrlHelper = require("../helper/UrlHelper");
const FilesUtil = require("../services/filesUtil");
const {DomTextObj} = require('../model/DomTextObj');

class DomTextProcessJob {
  JobEventEmitter;
  IsJobCancelled;
  ListOfDomTextObj;

  /**
   * @param {CustomEventEmitter} JobEventEmitter 
   * @param {boolean} IsJobCancelled 
   * @param {DomTextObj[]} ListOfDomTextObj 
   */
  constructor(
    JobEventEmitter = new CustomEventEmitter(),
    IsJobCancelled = false,
    ListOfDomTextObj = [],
  ){
    this.JobEventEmitter = JobEventEmitter;
    this.IsJobCancelled = IsJobCancelled;
    this.ListOfDomTextObj = ListOfDomTextObj;
    this.HandleJobEventEmitterResponses();
    this.HandleDomTextProcessJob();
  }

  HandleJobEventEmitterResponses = () => {
    this.JobEventEmitter.on(JobEventEmitterEnums.REQUEST_ALL_JOBS_TO_CANCEL, () => (this.IsJobCancelled = true));
    this.JobEventEmitter.on(JobEventEmitterEnums.ADD_DOM_TEXT, (domText) => this.ListOfDomTextObj.push(domText));
  }

  /**
   * Process the dom from the requested site for the purpose of 
   * searching more sites and downloading the found images.
   */
  HandleDomTextProcessJob = () => {
    const job = setInterval(() => {
      if (this.IsJobCancelled) {
        clearInterval(job);
        console.log("[JOB]: DomTextProcessJob is cancelled!")
      } else if (this.ListOfDomTextObj.length > 0) {
        const domTextObj = this.ListOfDomTextObj.pop();
        this.FetchImagesAndDirectoryPathesFromSite(domTextObj);
      }
    }, [UrlHelper.JobTimeout]);
  }

  /**
   * TODO: Finish the javadoc later.
   * @param {DomTextObj} domTextObj ...
   **/
  FetchImagesAndDirectoryPathesFromSite = (domTextObj) => {
  try {
    domTextObj.domTextArray.forEach((domRow) => {
      const dom = new jsdom.JSDOM(domRow);
      const tag = dom.window.document.querySelector("a");
      if (tag) {
        this.HandleDirectoryTag(domTextObj.site, tag.textContent);
        this.HandleImageTag(domTextObj.site, tag.textContent);
      }
    });
  } catch (err) {
      /** TODO: Better error message here. */
      console.error(err);
    }
  }

  /**
   * TODO: Finish the javadoc later.
   * @param {string} site - ...
   * @param {string | null} textContent - ...
   */
  HandleDirectoryTag = (site, textContent) => {
    // === Directory found on remote server === //
    if (textContent.endsWith("/")) {
      // constructing the new site path to search by.
      const newSitePath = path.join(site, textContent);
      // Create local directory for the folder
      FilesUtil.CreateDirectoryIfNotExistsAlready(
        UrlHelper.ConvertRemoteUrlToLocalUrl(newSitePath), 
        () => this.JobEventEmitter.emit(JobEventEmitterEnums.ADD_URL_TO_PROCESS, newSitePath)
      );
    }
  }

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
  HandleImageTag = (site, textContent) => {
    // === Image found on the remote server === //
    if (textContent.endsWith(".jpg")) {
      const jpg = path.join(site, textContent);
      this.JobEventEmitter.emit(JobEventEmitterEnums.IMAGE_URL_TO_DOWNLOAD, jpg);
    }
  }
}

module.exports = { DomTextProcessJob };
