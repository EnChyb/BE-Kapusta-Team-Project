const express = require('express')
const updateBalance = require('../../controllers/users/updateBalance')
const getUserInfo = require('../../controllers/users/getUserInfo')

const router = express.Router()

router.patch('/balance', updateBalance)

router.get('/', getUserInfo)


module.exports = router
