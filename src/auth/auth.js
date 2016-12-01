/**
 * Created by ray.xie on 11/18/2016.
 */

import passport from 'passport';
import jwtStratedy from './jwt';

passport.use(jwtStratedy);

export default passport;

export const authHandler = [passport.authenticate('jwt', { session: false })];

