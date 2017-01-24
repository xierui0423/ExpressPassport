import express from 'express';
import player from '../../../../services/player';

const router = express.Router();

router.get('/retrieve', player.playerService.retrieve);
router.post('/create', player.playerService.create);

export default router;
