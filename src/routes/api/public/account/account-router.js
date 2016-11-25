/**
 * Created by ray.xie on 11/25/2016.
 */
import express from 'express';
import userRouter from './user/user-router';

const router = express.Router();

router.use('/user', userRouter);

export default router;
