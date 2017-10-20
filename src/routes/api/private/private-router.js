import express from 'express';
import accountRouter from './account';
import marketRouter from './market';

import { authHandler } from '../../../auth';

const router = express.Router();

router.use('/', authHandler);
router.use('/account', accountRouter);
router.use('/market', marketRouter);

export default router;
