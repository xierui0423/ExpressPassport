/**
 * Created by ray.xie on 11/24/2016.
 */

import express from 'express';
import accountRouter from './account';

const router = express.Router();

router.use('/account', accountRouter);

export default router;
