import express from 'express';
import registerUser from '../../controllers/auth/registerUser.js';
import loginUser from '../../controllers/auth/loginUser.js';
import logoutUser from '../../controllers/auth/logoutUser.js';
import refreshUserToken from '../../controllers/auth/refreshUserToken.js';
import googleAuthUser from '../../controllers/auth/googleAuthUser.js';
import authenticateToken from '../../middleware/authenticateToken.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', authenticateToken, logoutUser);
router.post('/refresh', authenticateToken, refreshUserToken);
router.get('/google', googleAuthUser);

export default router;
