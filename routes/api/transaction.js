import express from 'express'
import addIncome from '../../controllers/transactions/addIncome.js'
import getIncome from '../../controllers/transactions/getIncome.js'
import addExpense from '../../controllers/transactions/addExpense.js'
import getExpense from '../../controllers/transactions/getExpense.js'
import deleteTransaction from '../../controllers/transactions/deleteTransaction.js'
import getIncomesCat from '../../controllers/transactions/getIncomesCat.js'
import getExpenseCat from '../../controllers/transactions/getExpensesCat.js'
import getPeriodDataTransactions from '../../controllers/transactions/getPeriodDataTransactions.js'


const router = express.Router()

router.post('/income', addIncome)
router.get('/income', getIncome)
router.post('/expense', addExpense)
router.get('/expense', getExpense)
router.delete('/', deleteTransaction)
router.get('/income-categories', getIncomesCat)
router.get('/expense-categories', getExpenseCat)
router.get('/period-data', getPeriodDataTransactions)

export default router
