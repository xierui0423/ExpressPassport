import express from 'express';
import accountRouter from './account';
import playerRouter from './player';
import matchRouter from './match';
import { authHandler } from '../../../auth';

const router = express.Router();

router.use('/', authHandler);
router.use('/account', accountRouter);
router.use('/player', playerRouter);
router.use('/match', matchRouter);

export default router;
