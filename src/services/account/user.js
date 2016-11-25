/**
 * Created by ray.xie on 11/22/2016.
 */

import crypto from 'crypto';
import uuid from 'node-uuid';

import { models } from '../../database';

const User = models.user.User;

const userService = {};

userService.register = (req, rsp, next) => {
  const user = req.body;
  const salt = uuid.v4();
  const hash = crypto.createHash('sha256');

  User.create({
    name: user.name,
    age: user.age,
    password: hash.update(salt).update(user.password).digest('hex'),
    salt,
  }).then(() => { rsp.send(`User ${user.name} has been created!`); }).catch(next);
};

userService.retrieve = (req, res, next) => {
  User.findOne({ order: [['id', 'DESC']] }).then((user) => {
    res.json(user || []);
  }).catch(next);
};

export default userService;
