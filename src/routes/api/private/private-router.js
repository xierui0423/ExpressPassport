import express from 'express';
import accountRouter from './account';
import { authHandler } from '../../../auth';

const router = express.Router();

router.use('/', authHandler);
router.use('/account', accountRouter);

export default router;
