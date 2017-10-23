import express from 'express';
import club from '../../../../services/club';

const router = express.Router();

router.get('/retrieve', club.clubService.retrieve);

export default router;
