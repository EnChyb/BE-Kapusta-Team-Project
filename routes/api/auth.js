const express = require('express')

const registerUser = require('../../controllers/auth/registerUser')
const loginUser = require('../../controllers/auth/loginUser')
const logoutUser = require('../../controllers/auth/logoutUser')
const refreshUserToken = require('../../controllers/auth/refreshUserToken')
const googleAuthUser = require('../../controllers/auth/googleAuthUser')

const router = express.Router()

router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/logout', logoutUser)
router.post('/refresh', refreshUserToken)
router.get('/google', googleAuthUser)

module.exports = router
