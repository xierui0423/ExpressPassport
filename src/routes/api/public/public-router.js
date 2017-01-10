import express from 'express';
import accountRouter from './account';

const router = express.Router();

router.use('/account', accountRouter);

export default router;
