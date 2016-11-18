/**
 * Created by ray.xie on 11/18/2016.
 */

import express from 'express';
import path from 'path';
import exphab from 'express-handlebars';
import bodyParser from 'body-parser';

import authHandler from './authentication-handler';
import config from '../config/config';

export default () => {
  const app = express();

  app.use(authHandler);

  app.engine('.hbs', exphab({
    defaultLayour: 'main',
    extname: '.hbs',
    layoutDir: path.join(__dirname, 'views/layouts'),
  }));

  app.set('view engine', '.hbs');
  app.set('views', path.join(__dirname, 'views'));

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  app.listen(config.expressServer.port, (err) => {
    if (err) {
      return console.log(`something went wrong:${err}`);
    }

    return console.log(`server is listening on port ${config.expressServer.port}`);
  });

  return app;
};

