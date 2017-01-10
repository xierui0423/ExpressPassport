import express from 'express';
import account from '../../../../../services/account';

const router = express.Router();

router.post('/register', account.userService.register);
router.post('/login', account.userService.login);

export default router;
