import paymentService from '@/services/payments-service';
import { PaymentsUpdate } from '@/utils/protocols/payments';
import { Request, Response } from 'express';

async function get(_req: Request, res: Response) {
  const result = await paymentService.read();
  return res.send(result);
}

async function post(_req: Request, res: Response) {
  const result = await paymentService.create();
  return res.send(result);
}

async function update(req: Request, res: Response) {
  const result = await paymentService.update(req.body as PaymentsUpdate);
  return res.send(result);
}

const paymentsController = { get, post, update };

export default paymentsController;
