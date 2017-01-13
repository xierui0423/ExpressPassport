import express from 'express';
import accountRouter from './account';
import { authHandler } from '../../../auth';

const router = express.Router();

router.use('/', authHandler);
router.use('/account', accountRouter);
router.use('/player', accountRouter);

export default router;
