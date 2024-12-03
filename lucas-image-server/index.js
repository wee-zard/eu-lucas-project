// backend/index.js
const bodyParser = require('body-parser');
const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const FilesUtil = require('./services/filesUtil');
const UrlHelper = require('./helper/UrlHelper');
const app = express();
app.use(cors());
app.use(bodyParser.json());

// ========================
//joining path of directory 
const LocalDirectoryPath = {
  ImagesFolder: path.join(__dirname, 'resources', 'lucas'),
  LucasImageServer: path.join("")
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
app.post('/image', (req, res) => {
  const images = req.body.requestBody;

  imagesToFetch = images.length;
  let base64Results = [];

  images.forEach(element => {
    const imagePath = path.join(
      Boolean(element.isImageFromLocalEnvironment) 
        ? LocalDirectoryPath.ImagesFolder
        : "https://gisco-services.ec.europa.eu/lucas/photos/", 
      element.year.toString(),
      element.countryCode,
      element.coordinateX < 100 
        ? (element.coordinateX < 10 ? '00'+element.coordinateX : '0'+element.coordinateX) 
        : element.coordinateX,
      element.coordinateY < 100 
      ? (element.coordinateY < 10 ? '00'+element.coordinateY : '0'+element.coordinateY) 
      : element.coordinateY,
      element.imageName
    );
    if (element.isImageFromLocalEnvironment) {
      FilesUtil.FetchImageFromLocalDirectory(imagePath, (err, data) => {
        if (err) {
          imagesToFetch--;
        } //res.status(404).json({ error: 'Cannot found image in the requested location!' });
        else {
          const base64StringFormat = "data:image/jpeg;base64," + Buffer.from(data).toString('base64');
          base64Results.push(base64StringFormat);
          imagesToFetch--;
          if (imagesToFetch <= 0) {
            res.status(200).json(base64Results);
          }
        };
      });
    } else {
      fetch(imagePath)
        .then(async response => {
          if (response) {
            const result = await response.arrayBuffer();
            const base64StringFormat = "data:image/jpeg;base64," + Buffer.from(result).toString('base64');
            base64Results.push(base64StringFormat);
            imagesToFetch--;
            if (imagesToFetch <= 0) {
              res.status(200).json(base64Results);
            }
          } else {
            imagesToFetch--;
          }
        }).catch((err) => {
          imagesToFetch--;
        });
    }


        
    
      


  });
})

// ===============================
app.post('/image123', (req, res) => {
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

const defaultPort = 3001;

app.listen(process.argv[2] ?? defaultPort, () => {
  console.log(`listening for requests on port ${process.argv[2] ?? defaultPort}`)
})

/**
 * TODO: Csak a HU mappában lévő képek kellenek nekünk 2006-tól 20xx-ig.
 * Esetleg lehetne egyszerűsíteni, hogy egy gombnyomással, a felhasználó kezdeményezze
 * a képek letöltését a távoli lucas képadatbázisból.
 */
// ===============================================================
const {ImageFetchersUtil} = require('./services/imageFetchersUtil');
new ImageFetchersUtil();


//const SchedulerUtil = require('./services/schedulersUtil');
//SchedulerUtil.InitScheduler();
