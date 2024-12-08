import express from 'express';
import updateBalance from '../../controllers/users/updateBalance.js';
import getUserInfo from '../../controllers/users/getUserInfo.js';
import authenticateToken from '../../middleware/authenticateToken.js';

const router = express.Router();

router.patch('/balance', authenticateToken, updateBalance);
router.get('/', authenticateToken, getUserInfo);

export default router;
