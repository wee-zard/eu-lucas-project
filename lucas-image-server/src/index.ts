import express from 'express';
import bodyParser from 'body-parser';
import { configureCorsMiddleware } from './middlewares/cors/cors.middleware';
import { configureRoutesMiddleware } from './middlewares/routes/routes.middleware';
import isMediaFolderCorrectlyStructured from './middlewares/media/media.middleware';

// Init express app
const app = express();

// Add cors to the server
app.use(configureCorsMiddleware());

// Add bodyParser
app.use(bodyParser.json());

// Add routes
app.use('/api', configureRoutesMiddleware());

if (isMediaFolderCorrectlyStructured()) {
  // Make the backend listening on a specific port.
  app.listen(6792, function check(error) {
    if (error) console.log(`Error while listening on port 6792!`, error);
    else console.log(`App listening on port 6792!`);
  });
}
