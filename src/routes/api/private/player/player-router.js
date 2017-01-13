import express from 'express';
import player from '../../../../../services/player';

const router = express.Router();

router.get('/retrieve', account.playerService.retrieve);
router.post('/create', account.playerService.create);

export default router;
