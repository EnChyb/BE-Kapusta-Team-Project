const express = require('express')

const router = express.Router()

router.post('/income', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.get('/income', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.post('/expense', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.get('/expense', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.delete('/', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.get('/income-categories', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.get('/expense-categories', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.get('/period-data', async (req, res, next) => {
  res.json({ message: 'template message' })
})

module.exports = router
