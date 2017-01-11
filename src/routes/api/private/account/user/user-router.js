import express from 'express';
import account from '../../../../../services/account';

const router = express.Router();

router.get('/retrieve', account.userService.retrieve);
router.post('/logout', account.userService.logout);

export default router;
