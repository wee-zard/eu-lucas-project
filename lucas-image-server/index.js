// backend/index.js
const bodyParser = require('body-parser');
const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(bodyParser.json());

// ========================
//joining path of directory 
const LocalDirectoryPath = {
  ImagesFolder: path.join(__dirname, 'resources', 'images'),
}

// ===========================
app.post('/app', (_, res) => {
  res.json([
    {
      "id":"1",
      "title":"Book Review: The Name of the Wind"
    },
    {
      "id":"2",
      "title":"Game Review: Pokemon Brillian Diamond"
    },
    {
      "id":"3",
      "title":"Show Review: Alice in Borderland"
    }
  ])
})

// ===========================================
app.get('/fetch-single-image', (req, res) => {
  // Handle the POST request here

  console.log('fetch-single-image', req.query, req.body);

  const filedata = path.join(LocalDirectoryPath.ImagesFolder, "38023110C.jpg");
  fs.readFile(`${filedata}`, (err, data) => {
    if (err) {
      // Fail if the file can't be read. Send a response back to the client
      res.status(404).json({ error: 'Error while fetching image from the server!' });
      res.writeHead(200, {'Content-Type': 'image/jpeg'}).end(data); // Send the file data to the browser.
    } else {
      // Send the file data to the browser.
      res.writeHead(200, {'Content-Type': 'image/jpeg'}).end(data);
    }
  });
})

// ===============================
app.post('/image', (req, res) => {
  // Handle the POST request here
  //const data = req.body;

  //const filedata = path.join(directoryPath, "38023110C.jpg");
  fs.readFile(`${filedata}`, (err, data) => {
    if (err) {
      // Fail if the file can't be read. Send a response back to the client
      res.status(404).json({ error: 'Error while fetching image from the server!' });
      res.writeHead(200, {'Content-Type': 'image/jpeg'}).end(data); // Send the file data to the browser.
    } else {
      // Send the file data to the browser.
      res.writeHead(200, {'Content-Type': 'image/jpeg'}).end(data);
    }
  });
})

// =====================

/**
 * TODO: Implement an endpoint that will fetch the error logs of the lucas-image-server in a json file.
 * If no error log found, then write out "No error Log found".
 * Why do I need this endpoint? Lets assume that the lucas-image-server will run at a user for a long time,
 * but he discovered that something is not working with this server. With a public endpoin, we could fetch
 * the error logs instead of opening the project folder and reading the logs itself (in my opinion).
 */

app.listen(process.argv[2] ?? 3001, () => {
  console.log(`listening for requests on port ${process.argv[2] ?? 3001}`)
})

// ===============================================================
const {ImageFetchersUtil} = require('./services/imageFetchersUtil');
new ImageFetchersUtil();


//const SchedulerUtil = require('./services/schedulersUtil');
//SchedulerUtil.InitScheduler();
