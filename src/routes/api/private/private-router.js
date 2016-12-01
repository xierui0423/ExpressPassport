/**
 * Created by ray.xie on 11/24/2016.
 */

import express from 'express';
import accountRouter from './account';
import { authHandler } from '../../../auth';

const router = express.Router();

router.use('/', authHandler);
router.use('/account', accountRouter);

export default router;
