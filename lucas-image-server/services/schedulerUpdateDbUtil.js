const axios = require("axios");

/**
 * Fetch a table from the database to determine WHO should map the whole
 * lucas remote image database and update the image information to the db.
 */
const SchedulerUpdateDbUtil = {
  /**
   * @param {() => void} callback
   */
  InitDatabaseUpdate: (callback) => {
    SchedulerUpdateDbUtil.GetDatabaseUpdateTableInfo((user_id, stamp) => {
      if (
        !user_id ||
        (user_id &&
          new Date(stamp).setHours(new Date(stamp).getHours() + 3) <=
            new Date())
      ) {
        // If the table is null, then init it with a value.
        // TODO:
        SchedulerUpdateDbUtil.UpdateDatabaseUpdateTableInfo(
          process.argv[2],
          new Date().toISOString()
        );
      }
      if (user_id === process.argv[2]) {
        SchedulerUpdateDbUtil.UpdateDatabaseUpdateTableInfo(
          null,
          new Date().toISOString()
        );

        /**
         * TODO: Implement the followings:
         * 1. Map the whole Lucas image database and check which images are not stored locally.
         * 2. Download the missing images from the db (if there was any image)
         * -> If yes, then: Save those images in the local directories. Save the information of the images in the db.
         * -> If no, then: cancel this job.
         * 3. Cancel the job.
         */

        callback();
      } else {
        callback();
      }
    });
  },

  /**
   * @param {(user_id: number | null, stamp: string | null) => void} callback
   */
  GetDatabaseUpdateTableInfo: (callback) => {
    axios
      //TODO: Moving this URLs to a variable (change url later to backend url)
      .get("http://localhost:3002/get-last-db-update")
      .then((response) => callback(response.data.user_id, response.data.stamp))
      .catch((err) => console.error(err));
  },

  /**
   * @param {number | null} user_id
   * @param {string | null} stamp
   */
  UpdateDatabaseUpdateTableInfo: (user_id, stamp) => {
    axios
      //TODO: Moving this URLs to a variable (change url later to backend url)
      .post("http://localhost:3002/post-last-db-update", {
        user_id: user_id,
        stamp: stamp,
      })
      .catch((err) => console.error(err));
  },
};

module.exports = { ...SchedulerUpdateDbUtil };
