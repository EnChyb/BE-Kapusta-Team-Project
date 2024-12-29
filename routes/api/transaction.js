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
router.delete('/:transactionId', authenticateToken, deleteTransaction);
router.get('/income-categories', authenticateToken, getIncomesCat);
router.get('/expense-categories', authenticateToken, getExpenseCat);
router.get('/period-data', authenticateToken, getPeriodDataTransactions);
router.get('/user-transactions', authenticateToken, getUserTransactions);
router.post('/', authenticateToken, addTransaction);

/**
 * @swagger
 * components:
 *   schemas:
 *     Transaction:
 *       type: object
 *       required:
 *         - description
 *         - category
 *         - amount
 *         - date
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the transaction
 *         description:
 *           type: string
 *           description: Description of the transaction
 *           example: "Zakup artykułów spożywczych"
 *         category:
 *           type: string
 *           description: Category of the transaction
 *           enum: [Products, Alcohol, Entertainment, Health, Transport, Housing, Technique, Communal, Communication, Sports, Hobbies, Education, Other, Salary, Bonus]
 *           example: "Products"
 *         amount:
 *           type: number
 *           description: Amount of the transaction
 *           example: 100.5
 *         date:
 *           type: string
 *           format: date
 *           description: Date of the transaction
 *           example: "2024-12-18"
 *         owner:
 *           type: string
 *           description: ID of the user who made the transaction
 *           example: "5f8f8c44b54764421b7168f5"
 */

/**
 * @swagger
 * /api/transactions/expense:
 *   post:
 *     summary: Dodaj nowy wydatek
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Transaction'
 *     responses:
 *       201:
 *         description: Wydatek dodany pomyślnie
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Transaction'
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Błąd serwera
 */

/**
 * @swagger
 * /api/transactions/income:
 *   post:
 *     summary: Dodaj nowy przychód
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Transaction'
 *     responses:
 *       201:
 *         description: Przychód dodany pomyślnie
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Transaction'
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Błąd serwera
 */

/**
 * @swagger
 * /api/transactions/income:
 *   get:
 *     summary: Pobierz przychody użytkownika
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista przychodów użytkownika
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Transaction'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Brak przychodów
 */

/**
 * @swagger
 * /api/transactions/expense:
 *   get:
 *     summary: Pobierz wydatki użytkownika
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista wydatków użytkownika
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Transaction'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Brak wydatków
 */

/**
 * @swagger
 * /api/transactions/{transactionId}:
 *   delete:
 *     summary: Usuń transakcję
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
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
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Transakcja nie znaleziona
 *       500:
 *         description: Błąd serwera
 */

/**
 * @swagger
 * /api/transactions/income-categories:
 *   get:
 *     summary: Pobierz kategorie przychodów
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista kategorii przychodów
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Brak kategorii
 */

/**
 * @swagger
 * /api/transactions/expense-categories:
 *   get:
 *     summary: Pobierz kategorie wydatków
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista kategorii wydatków
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Brak kategorii
 */

/**
 * @swagger
 * /api/transactions/period-data:
 *   get:
 *     summary: Pobierz dane transakcji za okres
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dane transakcji za okres
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Transaction'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Brak danych
 */

/**
 * @swagger
 * /api/transactions/user-transactions:
 *   get:
 *     summary: Pobierz transakcje użytkownika
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista transakcji użytkownika
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Transaction'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Brak transakcji
 */

/**
 * @swagger
 * /api/transactions:
 *   post:
 *     summary: Dodaj nową transakcję
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Transaction'
 *     responses:
 *       201:
 *         description: Transakcja dodana pomyślnie
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Transaction'
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Błąd serwera
 */



export default router;
