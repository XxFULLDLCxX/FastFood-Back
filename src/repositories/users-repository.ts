import { prisma } from '@/config';
import { UserParams } from '@/utils/protocols/users';

const create = (params: UserParams) => {
  return prisma.user.create({ data: params });
};

const usersRepository = {
  create,
};

export default usersRepository;
