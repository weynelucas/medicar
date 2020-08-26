import { classToPlain } from 'class-transformer';
import { Router } from 'express';
import CreateUserDto from '../dtos/CreateUserDto';
import CreateUserService from '../services/CreateUserService';
import { transformAndValidate } from '../utils';

const usersRouter = Router();

usersRouter.post('/', async (request, response) => {
  const { name, email, password } = await transformAndValidate(
    CreateUserDto,
    request.body,
  );

  const userService = new CreateUserService();
  const user = await userService.execute({ name, email, password });

  return response.status(201).json(classToPlain(user));
});

export default usersRouter;
