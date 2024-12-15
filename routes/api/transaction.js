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
import getUserTransactions from '../../controllers/transactions/getUserTransactions.js';
import addTransaction from '../../controllers/transactions/addTransaction.js';

const router = express.Router();

router.post('/expense', authenticateToken, addExpense);  
router.post('/income', authenticateToken, addIncome);
router.get('/income', authenticateToken, getIncome);
router.get('/expense', authenticateToken, getExpense);
// router.delete('/:transactionId', authenticateToken, deleteTransaction);
router.get('/income-categories', authenticateToken, getIncomesCat);
router.get('/expense-categories', authenticateToken, getExpenseCat);
router.get('/period-data', authenticateToken, getPeriodDataTransactions);
router.get('/user-transactions', authenticateToken, getUserTransactions);


/**
 * @swagger
 * /api/transactions:
 *   post:
 *     summary: Dodaj nową transakcję
 *     tags: [Transactions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *               type:
 *                 type: string
 *                 enum: [income, expense]
 *               category:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date-time
 *               description:
 *                 type: string
 *               userId:
 *                 type: string
 *                 format: uuid
 *     responses:
 *       201:
 *         description: Transakcja dodana pomyślnie
 *         content:
 *           application/json:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *               code:
 *                 type: integer
 *               data:
 *                 type: object
 *                 properties:
 *                   amount:
 *                     type: number
 *                   type:
 *                     type: string
 *                     enum: [income, expense]
 *                   category:
 *                     type: string
 *                   date:
 *                     type: string
 *                     format: date-time
 *                   description:
 *                     type: string
 *                   userId:
 *                     type: string
 *                     format: uuid
 *       500:
 *         description: Błąd serwera
 */
router.post('/', authenticateToken, addTransaction);

/**
 * @swagger
 * /api/transactions/{transactionId}:
 *   delete:
 *     summary: Usuń transakcję
 *     tags: [Transactions]
 *     parameters:
 *       - in: path
 *         name: transactionId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID transakcji
 *     responses:
 *       200:
 *         description: Transakcja usunięta pomyślnie
 *       404:
 *         description: Transakcja nie znaleziona
 *       500:
 *         description: Błąd serwera
 */
router.delete('/:transactionId', authenticateToken, deleteTransaction);


export default router;
