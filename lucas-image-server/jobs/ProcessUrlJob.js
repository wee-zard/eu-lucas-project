const { CustomEventEmitter } = require("../model/CustomEventEmitter");
const { JobEventEmitterEnums } = require("../enums/Enums");
const UrlHelper = require("../helper/UrlHelper");
const {DomTextObj} = require('../model/DomTextObj');

class ProcessUrlJob {
  /**
   * The number of active thread during the job.
   */
  ActiveThreadNo = 0;
  JobEventEmitter;
  IsJobCancelled;
  ListOfPendingUrlsToProcess;

  /**
   * @param {CustomEventEmitter} JobEventEmitter 
   * @param {boolean} IsJobCancelled 
   * @param {string[]} ListOfPendingUrlsToProcess 
   */
  constructor(
    JobEventEmitter = new CustomEventEmitter(),
    IsJobCancelled = false,
    ListOfPendingUrlsToProcess = [],
  ){
    this.JobEventEmitter = JobEventEmitter;
    this.IsJobCancelled = IsJobCancelled;
    this.ListOfPendingUrlsToProcess = ListOfPendingUrlsToProcess;
    this.HandleJobEventEmitterResponses();
    this.HandleUrlProcessJob();
  }

  HandleJobEventEmitterResponses = () => {
    this.JobEventEmitter.on(JobEventEmitterEnums.REQUEST_ALL_JOBS_TO_CANCEL, () => (this.IsJobCancelled = true));
    this.JobEventEmitter.on(JobEventEmitterEnums.ADD_URL_TO_PROCESS, (url) => this.ListOfPendingUrlsToProcess.push(url));
  }

  /**
   * Process a url from the remote lucas image db and upload it into our local db.
   */
  /**
   * FIXME: I am allowing 10 processes to run in the background,
   * but is the system use up all 10 of them, or only 1 of them running?
   */
  HandleUrlProcessJob = () => {
    this.ListOfPendingUrlsToProcess.push(UrlHelper.LucasRemoteRootImageDirectoryPath);
    const job = setInterval(() => {
      if (this.IsJobCancelled) {
        clearInterval(job);
        console.log("[JOB]: ProcessUrlJob is cancelled!")
      } else if (
        this.ActiveThreadNo < UrlHelper.MaximumNumberOfProcessableRequests 
        && this.ListOfPendingUrlsToProcess.length > 0
      ) {
        this.ActiveThreadNo++;
        this.FetchDOMTextArray();
      }
    }, [UrlHelper.JobTimeout]);
  }

  /**
   * TODO: Finish the javadoc later.
   */
  FetchDOMTextArray = () => {
    const site = this.ListOfPendingUrlsToProcess.pop();
    if (site) {
      fetch(site)
      .then(async response => {
        if (response) {
          const result = await response.text();
          const domTextArray = result.split("\n").filter(domRow => domRow.includes("a href="));
          const domTextObj = new DomTextObj(site, domTextArray);
          this.JobEventEmitter.emit(JobEventEmitterEnums.ADD_DOM_TEXT, domTextObj);
        }
        this.ActiveThreadNo--;
      /** TODO: Better error message here. */
      }).catch((err) => {
        console.error("[Error in FetchDOMTextArray]:", err, site);
        this.ActiveThreadNo--;
      });
    } else {
      this.ActiveThreadNo--;
    }
  }
};

module.exports = { ProcessUrlJob };
