import paymentsRepository from '@/repositories/payments-repository';
import usersRepository from '@/repositories/users-repository';
import setError from '@/utils/errors';
import { PaymentsUpdate } from '@/utils/protocols/payments';
import httpStatus from 'http-status';

const read = async () => {
  const payments = await paymentsRepository.findMany();
  if (payments.length === 0) throw setError(httpStatus.NOT_FOUND);
  return payments;
};

async function create() {
  const result = await paymentService.create();
  return result;
}

async function update({ code, userId, paidAmount }: PaymentsUpdate) {
  const payment = await paymentsRepository.findUniqueByCode(code);
  if (paidAmount < payment.total) throw setError(httpStatus.PAYMENT_REQUIRED, 'O valor está abaixo do total a pagar');

  const result = await paymentsRepository.updateByCode({
    code,
    change: paidAmount - payment.total,
    status: 'PAID',
    userId
  });
  return result;
}

const paymentService = { read, create, update };

export default paymentService;
