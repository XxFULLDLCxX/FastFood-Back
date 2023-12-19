import usersController from '@/controllers/users-controller';
import { Router } from 'express';

const usersRouter = Router();

usersRouter.post('/', usersController.post);

export default usersRouter;
