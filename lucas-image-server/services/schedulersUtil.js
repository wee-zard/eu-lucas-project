const schedule = require("node-schedule");
const axios = require("axios");

const SchedulerUpdateDbUtil = require("./schedulerUpdateDbUtil");
const SchedulerUpdateImageRepo = require("./schedulerUpdateImageRepo");

const SchedulerUtil = {
  SchedulerPropertySite: "http://localhost:3002/get-scheduler-properties",

  InitScheduler: () => {
    SchedulerUtil.GetSchedulerPropertiesFromDatabase();
  },

  /**
   * Fetch the properties of the scheduler, so we could tell
   * when the scheduler should run.
   */
  GetSchedulerPropertiesFromDatabase: () => {
    axios
      .get(SchedulerUtil.SchedulerPropertySite)
      .then((response) =>
        SchedulerUtil.SetScheduler(
          `${response.data.seconds} ${response.data.minutes} ${response.data.hour} ${response.data.dayOfMonth} ${response.data.month} ${response.data.dayOfWeek}`
        )
      )
      .catch((err) => console.error(err));
  },

  /**
   * @param {string} schedulingTimeInterval - the scheduling interval.
   */
  SetScheduler: (schedulingTimeInterval) => {
    //SchedulerUpdateImageRepo.InitImageServerUpdate();
    //SchedulerUtil.InitDatabaseJob();

    // Source: https://www.npmjs.com/package/node-schedule
    const jobImageDownload = schedule.scheduleJob(schedulingTimeInterval, () => SchedulerUpdateImageRepo.InitImageServerUpdate());

    const jobDb = schedule.scheduleJob(schedulingTimeInterval, () => SchedulerUtil.InitDatabaseJob());
  },

  InitDatabaseJob: () => {
    // Update database if possible
    const jobDbUpdate = schedule.scheduleJob("*/3 * * * *", () => SchedulerUpdateDbUtil.InitDatabaseUpdate(() => jobDbUpdate.cancel()));
  },
};

module.exports = { ...SchedulerUtil };
