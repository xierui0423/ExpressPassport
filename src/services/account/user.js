import crypto from 'crypto';
import uuid from 'node-uuid';
import jwt from 'jsonwebtoken';
import config from '../../config';

import { models } from '../../database';

const User = models.user.User;

const userService = {};

// Public
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
            }).then(() => {
                res.send(`User ${user.name} has been created!`);
            }).catch(next);
        }
    }).catch(next);
};

userService.login = (req, res, next) => {
    const user = req.body;
    const hash = crypto.createHash('sha256');
    // TODO user passport local strategy
    User.findOne({ where: { username: user.username } }).then((loginUser) => {
        if (loginUser && hash.update(loginUser.salt).update(user.password).digest('hex') === loginUser.password) {
            // Store the token in cookie
            res.cookie('JWT', jwt.sign({ userId: loginUser.id }, config.expressServer.authKey), {
                maxAge: 3600000,
                httpOnly: true,
            }).status(200).json({ message: 'Ok', payload: loginUser });
        } else {
            res.status(401).json({ message: 'Unauthorized' });
        }
    }).catch(next);
};


// Private
userService.retrieve = (req, res, next) => {
    User.findOne({
        where: { id: req.user.dataValues.id },
    }).then((user) => {
        res.json({ payload: user || {} });
    }).catch(next);
};

userService.logout = (req, res) => {
    // Store the token in cookie
    res.cookie('JWT', '').status(200).json({ message: 'Ok' });
};

export default userService;
