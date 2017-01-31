import express from 'express';
import match from '../../../../services/match';

const router = express.Router();

router.get('/retrieve', match.matchService.retrieve);
router.post('/create', match.matchService.create);

export default router;
