import express from 'express'
import updateBalance from '../../controllers/users/updateBalance.js'
import getUserInfo from '../../controllers/users/getUserInfo.js'

const router = express.Router()

router.patch('/balance', updateBalance)

router.get('/', getUserInfo)


export default router
