import 'express-async-errors';
import express from 'express';
import cors from 'cors';
import { errorHandler } from '@/middlewares';
import categoriesRouter from './routers/categories-router';
import productsRouter from './routers/products-router';
import paymentsRouter from './routers/payments-router';
import usersRouter from './routers/users-router';

const app = express();
app.use(cors());
app.use(express.json());
app.get('/healthz', (_req, res) => {
  res.send('OK!');
});
app.use('/categories', categoriesRouter);
app.use('/products', productsRouter);
app.use('/payments', paymentsRouter);
app.use('/users', usersRouter);
app.use(errorHandler);

export default app;
