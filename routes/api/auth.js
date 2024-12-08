import express from'express'

import registerUser from '../../controllers/auth/registerUser.js'
import loginUser from '../../controllers/auth/loginUser.js'
import logoutUser from '../../controllers/auth/logoutUser.js'
import refreshUserToken from'../../controllers/auth/refreshUserToken.js'
import googleAuthUser from '../../controllers/auth/googleAuthUser.js'

const router = express.Router()

router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/logout', logoutUser)
router.post('/refresh', refreshUserToken)
router.get('/google', googleAuthUser)

export default router
