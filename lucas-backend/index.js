// backend/index.js
const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(bodyParser.json());


// ===========================
const mysql = require ('mysql2');
// connecting Database
const connection = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "lucas",
});

// ===========================
app.post("/app", (_, res) => {
  res.json([
    {
      id: "1",
      title: "Book Review: The Name of the Wind",
    },
    {
      id: "2",
      title: "Game Review: Pokemon Brillian Diamond",
    },
    {
      id: "3",
      title: "Show Review: Alice in Borderland",
    },
  ]);
});

// ===========================================
app.get("/fetch-single-image", (req, res) => {
  // Handle the POST request here

  console.log("fetch-single-image", req.query, req.body);
});

// ===============================
app.post("/image", (req, res) => {
  // Handle the POST request here
  //const data = req.body;
});

// ===========================================
app.get("/get-scheduler-properties", (req, res) => {
  // Handle the POST request here
  res.json({
    id: "1",
    name: "Scheduler Propetries",
    seconds: "0", // second (0 - 59, OPTIONAL)
    minutes: "0", // minute (0 - 59)
    hour: "0", // hour (0 - 23)
    dayOfMonth: "*/3", // day of month (1 - 31)
    month: "*", // month (1 - 12)
    dayOfWeek: "*" // day of week (0 - 7) (0 or 7 is Sun)
  });
});

// ===========================================
app.get("/get-last-server-update", async (req, res) => {
  // Handle the POST request here
  res.json({
    id: "1",
    vesion: "v1.0", // The number of times we updated the server,
    lastImageUpdateTime: "2024-10-12T13:32:59.450Z", // ISO Date Time format
    lastApiUpdateTime: "2024-11-12T13:32:59.450Z" // The latest time when the API mapped the lucas database.If it's not changing after a period of time, then the API is down.
  });
});

// ===========================================
app.get("/get-last-db-update", async (_, res) => {
  try {
    //[[{ id: 1, user_id: null, stamp: null }], [...]]
    const response = await connection.promise().query(
      //`SELECT * FROM remote_api_call`,
      `SELECT * FROM remote_api_call`,
      []
    );
    console.log(response[0][0]);
    res.status(202).json({
      user_id: response[0][0].id,
      stamp: response[0][0].stamp,
    });
  } catch (err) {
    res.status(500).json({
      message: err,
    });
  }
});

app.post("/post-last-db-update", async (req, res) => {
    try {
    const {user_id, stamp} = req.body;
    const response = await connection.promise().query(
      //`SELECT * FROM remote_api_call`,
      `UPDATE remote_api_call SET user_id = ?, stamp = ? WHERE id = 1`,
      [user_id, stamp]
    );
    console.log(response);
    res.status(202).json({
      message: "done",
    });
  } catch (err) {
    res.status(500).json({
      message: err,
    });
  }
});






/**
 * What data is stored in these database tables?
 * 1. Scheduler Properties:
 *      The Properties of the Scheduler that can be dynamically changed. 
 *      Default value of the properties now are: "0 * * * * *" meaning,
 *      that it will run after every 1 min.
 * 
 * 2. Last Image Server Update:
 *      Stores the latest information about the date when the Image server is updated
 *      by fetching the images from the remote lucas website and inserting those image informations
 *      into our database. If this date is changed, then every host will request the database
 *      to fetch the newly added images to them, so they could download them from the
 *      lucas database.
 */

// =====================
app.listen(3002, () => {
  console.log("listening for requests on port 3002");
});
