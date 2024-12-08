import express from "express";
import morgan from "morgan";
import cors from "cors";

import swaggerUi from 'swagger-ui-express';
import swaggerSpec from "./utils/swaggerConfig.js";

import authRouter from './routes/api/auth.js';
import transactionRouter from './routes/api/transaction.js';
import userRouter from './routes/api/user.js';

import authenticateToken from './middleware/authenticateToken.js';

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(morgan(formatsLogger));
app.use(cors());
app.use(express.json());

// API DOCUMENTATION
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ROUTING
app.use('/auth', authRouter); 
app.use('/transaction', authenticateToken, transactionRouter); 
app.use('/user', authenticateToken, userRouter); 

// MIDDLEWARE - ERRORS
app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ message: err.message || 'Internal Server Error' });
});

export default app;
