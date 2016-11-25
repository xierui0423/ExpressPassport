/**
 * Created by ray.xie on 11/22/2016.
 */

import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import config from '../../config';
// import db from '../database/database';
// const User = db.import('./database/models/users');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
opts.secretOrKey = config.expressServer.authKey;
// opts.issuer = 'accounts.examplesoft.com';
// opts.audience = 'yoursite.net';

export default new JwtStrategy(opts, (payload, done) => {
  // User.findOne({ id: jwt_payload.sub }, (err, account) => {
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
});
