import express from 'express';

import apiRouter from './api';
import viewRouter from './view';

// eslint-disable-next-line
const router = express.Router();

router.use('/api', apiRouter);
router.use('/view', viewRouter);

export default router;
