import usersRepository from '@/repositories/users-repository';
import { UserParams } from '@/utils/protocols/users';

async function create(params: UserParams) {
  const result = await usersRepository.create(params);
  return result;
}
const userService = {
  create,
};

export default userService;
