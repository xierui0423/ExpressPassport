/**
 * Created by ray.xie on 11/18/2016.
 */

import passport from 'passport';
import jwt from 'jsonwebtoken';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';


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


export default passport.initialize();
