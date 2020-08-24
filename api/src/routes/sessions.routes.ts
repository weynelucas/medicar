import { Router } from 'express';
import AuthenticateUserDto from '../dtos/AuthenticateUserDto';
import AuthenticateUserService from '../services/AuthenticateUserService';
import { transformAndValidate } from '../utils';

const sessionsRouter = Router();

sessionsRouter.post('/login', async (request, response) => {
  const { email, password } = await transformAndValidate(
    AuthenticateUserDto,
    request.body,
  );

  const authService = new AuthenticateUserService();
  const { user, token } = await authService.execute({ email, password });

  delete user.password;

  return response.json({ user, token });
});

export default sessionsRouter;
