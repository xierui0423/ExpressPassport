/**
 * Created by ray.xie on 9/30/2016.
 */

// Dream starts here

import express from 'express';
import path from 'path';
import exphab from 'express-handlebars';
import bodyParser from 'body-parser';
import rp from 'request-promise';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import db from './database/database';

const SECRET_KEY = 'secret';
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
opts.secretOrKey = SECRET_KEY;
// opts.issuer = 'accounts.examplesoft.com';
// opts.audience = 'yoursite.net';
passport.use(new JwtStrategy(opts, (payload, done) => {
  // User.findOne({ id: jwt_payload.sub }, (err, user) => {
  //   if (err) {
  //     return done(err, false);
  //   }
  if (payload.key) {
    done(null, payload.key);
  } else {
    done(null, false);
      // or you could create a new account
  }
  // });
}));

const app = express();
const port = 3000;

app.use(passport.initialize());

app.engine('.hbs', exphab({
  defaultLayour: 'main',
  extname: '.hbs',
  layoutDir: path.join(__dirname, 'views/layouts'),
}));

app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'views'));

const logRequestHeaderMiddleware = (req, rsp, next) => {
  console.log(req.url);
  next();
};

const testMiddleware = (req, rsp, next) => {
  req.chance = Math.random();
  next();
};

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logRequestHeaderMiddleware);
app.use(testMiddleware);


const User = db.import('./database/models/users');

app.get('/users', passport.authenticate('jwt', { session: false }), (req, rsp) => {
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

app.post('/user', (req, rsp) => {
  const user = req.body;

  User.create({
    name: user.name,
    age: user.age,
  }).then(() => { rsp.sendStatus(200); });
});

// Error handler
app.use((err, req, rsp, next) => {
  // log the error, for now just console.log
  console.log(err);
  rsp.status(500).send('Something broke!');
  next();
});

app.get('/login', (req, rsp) => {
  rsp.json(jwt.sign({ foo: 'bar', key: 'keykey' }, SECRET_KEY));
});

app.get('/test', (req, rsp) => {
  rp({
    uri: 'https://blog.risingstack.com/node-hero-node-js-request-module-tutorial/',
  }).then((val) => {
    rsp.send(val);
  });
});


app.listen(port, (err) => {
  if (err) {
    return console.log(`something went wrong:${err}`);
  }

  return console.log(`server is listening on port ${port}`);
});

