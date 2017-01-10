import passport from 'passport';
import jwtStratedy from './jwt';

passport.use(jwtStratedy);

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(obj, done) {
    done(null, obj);
});

export default passport;

export const authHandler = [passport.authenticate('jwt', { session: false })];

