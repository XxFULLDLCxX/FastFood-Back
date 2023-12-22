import { prisma } from '@/config';
import { PaymentsParams } from '@/utils/protocols/payments';

const findMany = () => {
  return prisma.payment.findMany({});
};

const findUniqueByCode = (code: number) => {
  return prisma.payment.findUnique({ where: { code } });
};

const create = (params: PaymentsParams) => {
  return prisma.payment.create({ data: params });
};

const updateByCode = (params: Partial<PaymentsParams>) => {
  return prisma.payment.update({ data: params, where: { code: params.code } });
};

const paymentsRepository = { findMany, findUniqueByCode, create, updateByCode };

export default paymentsRepository;
