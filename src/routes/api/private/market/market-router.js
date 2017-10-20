import express from 'express';
import market from '../../../../services/market';

const router = express.Router();

router.get('/retrieve', market.marketService.retrieve);

export default router;
