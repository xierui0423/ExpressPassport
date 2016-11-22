/**
 * Created by ray.xie on 11/18/2016.
 */

import express from 'express';
import rp from 'request-promise';
import jwt from 'jsonwebtoken';

import db from '../../database';
import passport from '../../auth';

import config from '../../config';

const User = db.import('../../database/models/user/users');

// eslint-disable-next-line
const router = express.Router();

router.use('/', passport.authenticate('jwt', { session: false }));

router.get('/users', (req, rsp) => {
  User.findOne({ order: [['id', 'DESC']] }).then((user) => {
    if (user) {
      rsp.render('home', {
        name: user.get('name'),
      });
    } else {
      rsp.send('No users are available');
    }
  });
});

router.post('/user', (req, rsp) => {
  const user = req.body;

  User.create({
    name: user.name,
    age: user.age,
  }).then(() => { rsp.sendStatus(200); });
});



export default router;
