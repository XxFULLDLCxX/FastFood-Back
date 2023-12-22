import { Payment } from '@prisma/client';

export type PaymentsParams = Omit<Payment, 'id' | 'createdAt' | 'updatedAt'>;

export type PaymentsUpdate = {
  userId: number;
  paidAmount: number;
  code: number;
};
