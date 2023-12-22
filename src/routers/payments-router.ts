import paymentsController from '@/controllers/payments-controller';
import { Router } from 'express';

const paymentsRouter = Router();

paymentsRouter.get('/', paymentsController.get);

export default paymentsRouter;
