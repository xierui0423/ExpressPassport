import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import config from '../../config';
import { models } from '../../database';
import redisClient from '../../redis';

const User = models.user.User;

const opts = {
    jwtFromRequest: ExtractJwt.fromExtractors([req => req && req.cookies && req.cookies.JWT]),
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
                redisClient.hmset(payload.userId, userFromDb.dataValues);
                done(null, userFromDb.dataValues);
            }).catch(done);
        }
    });
    //
    // // TODO Get user info from in memory cache (redis?)
    // User.findOne({ where: { id: payload.userId } }).then((loginUser) => {
    //     done(null, loginUser);
    // }).catch(done);
});
