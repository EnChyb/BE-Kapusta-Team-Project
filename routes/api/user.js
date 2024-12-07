const express = require('express')

const router = express.Router()

router.patch('/balance', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.get('/', async (req, res, next) => {
  res.json({ message: 'template message' })
})


module.exports = router
