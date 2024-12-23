import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import transactionsRouter from '../routes/api/transaction.js';

const app = express();

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'My API',
      version: '1.0.0',
      description: 'API Documentation for My Project',
    },
  },
  apis: ['./routes/*.js'], // Ścieżka do plików z definicjami endpointów - dodawać przy nowej ścieżce
};

const swaggerSpec = swaggerJSDoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use(express.json());
app.use('/api/transactions', transactionsRouter);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});


export default swaggerSpec

