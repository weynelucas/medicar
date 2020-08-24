import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { AuthenticationFailed } from '../errors/apiErrors';
import User from '../models/User';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

class AuthenticateUserService {
  public async execute({ email, password }: Request): Promise<Response> {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      throw new AuthenticationFailed();
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new AuthenticationFailed();
    }

    await user.updateLastLogin();

    const token = sign({}, 'bd8ea156f417dc88ba0b5bf6772bf06f', {
      subject: user.id.toString(),
      expiresIn: '1d',
    });

    return { user, token };
  }
}

export default AuthenticateUserService;
