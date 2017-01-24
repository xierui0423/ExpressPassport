import passport from 'passport';
import jwtStratedy from './jwt';

passport.use(jwtStratedy);

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((obj, done) => {
    done(null, obj);
});

export default passport;

export const authHandler = [passport.authenticate('jwt', { session: false })];

