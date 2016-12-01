/**
 * Created by ray.xie on 11/22/2016.
 */

import crypto from 'crypto';
import uuid from 'node-uuid';
import jwt from 'jsonwebtoken';
import config from '../../config';

import { models } from '../../database';

const User = models.user.User;

const userService = {};

userService.register = (req, res, next) => {
  const user = req.body;
  const salt = uuid.v4();
  const hash = crypto.createHash('sha256');

  User.findOne({ where: { username: user.username } }).then((createdUser) => {
    // Don't allow duplicate username
    if (createdUser) {
      res.send('The username has been taken, please choose another one!');
    } else {
      User.create({
        username: user.username,
        password: hash.update(salt).update(user.password).digest('hex'),
        salt,
      }).then(() => { res.send(`User ${user.name} has been created!`); }).catch(next);
    }
  }).catch(next);
};

userService.retrieve = (req, res, next) => {
  console.log(req.user.username);
  User.findOne({ order: [['id', 'DESC']] }).then((user) => {
    res.json(user || []);
  }).catch(next);
};

userService.login = (req, res, next) => {
  const user = req.body;
  const hash = crypto.createHash('sha256');
  // TODO user passport local strategy
  User.findOne({ where: { username: user.username } }).then((loginUser) => {
    if (loginUser && hash.update(loginUser.salt).update(user.password).digest('hex') === loginUser.password) {
      res.set({ JWT: jwt.sign({ userId: loginUser.id }, config.expressServer.authKey) });
      res.send(200);
    } else {
      res.send(401);
    }
  }).catch(next);
};

export default userService;
