const express = require('express')
const addIncome = require('../../controllers/transactions/addIncome')
const getIncome = require('../../controllers/transactions/getIncome')
const addExpense = require('../../controllers/transactions/addExpense')
const getExpense = require('../../controllers/transactions/getExpense')
const deleteTransaction = require('../../controllers/transactions/deleteTransaction')
const getIncomesCat = require('../../controllers/transactions/getIncomesCat')
const getExpenseCat = require('../../controllers/transactions/getExpensesCat')
const getPeriodDataTransactions = require('../../controllers/transactions/getPeriodDataTransactions')

const router = express.Router()

router.post('/income', addIncome)
router.get('/income', getIncome)
router.post('/expense', addExpense)
router.get('/expense', getExpense)
router.delete('/', deleteTransaction)
router.get('/income-categories', getIncomesCat)
router.get('/expense-categories', getExpenseCat)
router.get('/period-data', getPeriodDataTransactions)

module.exports = router
