import userService from '@/services/users-service';
import { UserParams } from '@/utils/protocols/users';
import { Request, Response } from 'express';
import httpStatus from 'http-status';

async function post(req: Request, res: Response) {
  const result = await userService.create(req.body as UserParams);
  return res.status(httpStatus.CREATED).send(result);
}
const usersController = {
  post,
};

export default usersController;
