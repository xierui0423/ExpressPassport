import express from 'express';
import path from 'path';
import exphab from 'express-handlebars';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

import passport from '../auth/auth';
import errorHandler from './error-handler';

import router from '../routes';

import config from '../config/index';

export default () => {
    const app = express();

    // Middlewares
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(cookieParser());

    // Add headers for CORS
    app.use((req, res, next) => {
        // Website you wish to allow to connect
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');

        // Request methods you wish to allow
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

        // Request headers you wish to allow
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

        // Set to true if you need the website to include cookies in the requests sent
        // to the API (e.g. in case you use sessions)
        res.setHeader('Access-Control-Allow-Credentials', true);

        // Pass to next layer of middleware
        if (req.method === 'OPTIONS') {
            res.sendStatus(200);
        } else {
            next();
        }
    });

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

