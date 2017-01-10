import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import config from '../../config';
import { models } from '../../database';

const User = models.user.User;

const opts = {
    jwtFromRequest: ExtractJwt.fromExtractors([req => req && req.cookies && req.cookies['JWT']]),
    secretOrKey: config.expressServer.authKey,
    passReqToCallback: true,
};
// opts.issuer = 'accounts.examplesoft.com';
// opts.audience = 'yoursite.net';

export default new JwtStrategy(opts, (req, payload, done) => {
    // TODO Get user info from in memory cache (redis?)
    User.findOne({ where: { id: payload.userId } }).then((loginUser) => {
        done(null, loginUser);
    }).catch(done);
});
