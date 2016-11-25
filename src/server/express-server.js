/**
 * Created by ray.xie on 11/18/2016.
 */

import express from 'express';
import path from 'path';
import exphab from 'express-handlebars';
import bodyParser from 'body-parser';

import passport from '../auth/passport';
import errorHandler from './error-handler';

import router from '../routes';

import config from '../config/index';

export default () => {
  const app = express();

  // Middlewares
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(passport.initialize());

  // Routes
  app.use('/', router);

  // Error handling
  app.use(errorHandler);

  // View engine
  app.engine('.hbs', exphab({
    defaultLayour: 'main',
    extname: '.hbs',
    layoutDir: path.join(__dirname, '../views/layouts'),
  }));

  app.set('view engine', '.hbs');
  app.set('views', path.join(__dirname, '../views'));

  // Start the server and listen on specified port
  app.listen(config.expressServer.port, (err) => {
    if (err) {
      return console.log(`something went wrong:${err}`);
    }

    return console.log(`server is listening on port ${config.expressServer.port}`);
  });

  return app;
};

