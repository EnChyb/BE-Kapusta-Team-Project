// routes/api/transactions.js
import express from 'express';
import authenticateToken from '../../middleware/authenticateToken.js';
import addIncome from '../../controllers/transactions/addIncome.js';
import getIncome from '../../controllers/transactions/getIncome.js';
import addExpense from '../../controllers/transactions/addExpense.js';  // Importujemy kontroler
import getExpense from '../../controllers/transactions/getExpense.js';
import deleteTransaction from '../../controllers/transactions/deleteTransaction.js';
import getIncomesCat from '../../controllers/transactions/getIncomesCat.js';
import getExpenseCat from '../../controllers/transactions/getExpensesCat.js';
import getPeriodDataTransactions from '../../controllers/transactions/getPeriodDataTransactions.js';

const router = express.Router();

router.post('/expense', authenticateToken, addExpense);  

router.post('/income', authenticateToken, addIncome);
router.get('/income', authenticateToken, getIncome);
router.get('/expense', authenticateToken, getExpense);
router.delete('/', authenticateToken, deleteTransaction);
router.get('/income-categories', authenticateToken, getIncomesCat);
router.get('/expense-categories', authenticateToken, getExpenseCat);
router.get('/period-data', authenticateToken, getPeriodDataTransactions);

export default router;
