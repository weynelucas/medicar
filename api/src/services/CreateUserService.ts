import { ServiceError } from '../errors/apiErrors';
import User from '../models/User';

interface Request {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, password }: Request): Promise<User> {
    const emailAlreadyUsed = await User.findOne({
      where: { email },
    });

    if (emailAlreadyUsed) {
      throw new ServiceError('E-mail address already used.');
    }

    const user = User.create({ name, email });
    user.setPassword(password);
    await user.save();

    return user;
  }
}

export default CreateUserService;
