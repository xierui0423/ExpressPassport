/**
 * Created by ray.xie on 11/24/2016.
 */

import express from 'express';
import accountRouter from './account';
import passport from '../../../auth';

const router = express.Router();

router.use('/', passport.authenticate('jwt', { session: false }));
router.use('/account', accountRouter);

export default router;
