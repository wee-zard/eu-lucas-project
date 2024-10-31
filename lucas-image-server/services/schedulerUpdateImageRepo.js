const axios = require("axios");
const path = require("path");
const FilesUtil = require("./filesUtil");

const SchedulerUpdateImageRepo = {
  LastImageServerUpdateSite: "http://localhost:3002/get-last-server-update",
  SchedulingTimesLocal: path.join(__dirname.replace("services", "resources"),"scheduler","schedulingTimes.json"),

  /**
   * @param {(lastUpdateTime: Date) => void} callback - A function that gives back if the server needs to be updated or not.
   */
  FetchLastUpdateTimeOfRemoteServer: (callback) => {
    axios
      .get(SchedulerUpdateImageRepo.LastImageServerUpdateSite)
      .then((response) => callback(new Date(response.data.lastUpdateTime)))
      .catch((err) => console.error(err));
  },

  /**
   * @param {(isUpdateRequested: boolean) => void} callback - Determines whether to updated the local image server with the latest images from the remote server.
   */
  IsImageServerNeedsToBeUpdated: (callback) => {
    SchedulerUpdateImageRepo.FetchLastUpdateTimeOfRemoteServer(
      (lastUpdateTime) => {
        FilesUtil.FetchLastUpdateTimeFromLocalDirectory(
          SchedulerUpdateImageRepo.SchedulingTimesLocal,
          (lastUpdateTimeLocal) =>
            callback(
              lastUpdateTimeLocal !== undefined &&
                (lastUpdateTimeLocal === null ||
                  lastUpdateTimeLocal.getTime() < lastUpdateTime.getTime())
            )
        );
      }
    );
  },

  InitImageServerUpdate: () => {
    SchedulerUpdateImageRepo.IsImageServerNeedsToBeUpdated(
      (isUpdateRequested) => {
        if (isUpdateRequested) {
          console.log("Update requested on the image server");
          /**
           * TODO: Go to the lucas remote database and download all images. 
           * so the local image depository can be up-to-date
           */
        }
      }
    );
  },
};

module.exports = { ...SchedulerUpdateImageRepo };
