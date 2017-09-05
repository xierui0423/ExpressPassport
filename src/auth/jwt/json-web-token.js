import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import jwt from 'jsonwebtoken';

import config from '../../config';
import { models } from '../../database';
import redisClient from '../../redis';

const User = models.user.User;

const opts = {
  // set usedId 0 for guest
  jwtFromRequest: ExtractJwt.fromExtractors(
    [req => (req && req.cookies && req.cookies.JWT) ||
      jwt.sign({ userId: 0 }, config.expressServer.authKey)]
  ),
  secretOrKey: config.expressServer.authKey,
  passReqToCallback: true,
};
// opts.issuer = 'accounts.examplesoft.com';
// opts.audience = 'yoursite.net';

export default new JwtStrategy(opts, (req, payload, done) => {
  redisClient.hgetall(payload.userId, (err, userFromCache) => {
    if (userFromCache) {
      done(null, userFromCache);
    } else {
      User.findOne({ where: { id: payload.userId } }).then((userFromDb) => {
        if (userFromDb) {
          redisClient.hmset(payload.userId, userFromDb.dataValues);
          done(null, userFromDb.dataValues);
        } else {
          done(null, { id: 0 });
        }
      }).catch(done);
    }
  });
});
