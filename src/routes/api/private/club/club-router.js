import express from 'express';
import club from '../../../../services/club';

const router = express.Router();

router.get('/retrieve', club.clubService.retrieve);
router.post('/update-player', club.clubService.updatePlayer);
router.post('/update-tactic', club.clubService.updateTactic);

export default router;
