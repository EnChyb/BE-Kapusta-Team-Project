const express = require('express')
const logger = require('morgan')
const cors = require('cors')

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./utils/swaggerConfig');

const authRouter = require('./routes/api/auth')
const transactionRouter = require('./routes/api/transaction')
const userRouter = require('./routes/api/user')

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

// API DOCUMENTATION
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ROUTING
app.use('/auth', authRouter)
app.use('/transaction', transactionRouter)
app.use('/user', userRouter)


// MIDDLEWARE - ERRORS
app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message })
})

module.exports = app
