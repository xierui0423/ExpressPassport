import express from 'express';

import privateRouter from './private';
import publicRouter from './public';

const router = express.Router();


router.use('/private', privateRouter);
router.use('/public', publicRouter);

export default router;
