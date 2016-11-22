/**
 * Created by ray.xie on 11/18/2016.
 */

import express from 'express';
import rp from 'request-promise';
import jwt from 'jsonwebtoken';

// import db from '../../database';
// import passport from '../../auth';

import config from '../../config';

// const User = db.import('../../database/models/user/users');

// eslint-disable-next-line
const router = express.Router();

// router.use('/', passport.authenticate('jwt', { session: false }));

router.get('/login', (req, rsp) => {
  rsp.json(jwt.sign({ foo: 'bar', key: 'keykey' }, config.expressServer.authKey));
});

router.get('/test', (req, rsp) => {
  rp({
    uri: 'https://blog.risingstack.com/node-hero-node-js-request-module-tutorial/',
  }).then((val) => {
    rsp.send(val);
  });
});

export default router;
