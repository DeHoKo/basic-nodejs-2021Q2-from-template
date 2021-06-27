import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { getAll } from '../users/user.service';
import { JWT_SECRET_KEY } from '../../common/config';

const generateAccessToken = (userId: string, username: string) =>
  jwt.sign({ userId, username }, JWT_SECRET_KEY!, { expiresIn: 60 * 60 });

export const loginUser = async (login: string, password: string) => {
  const users = await getAll();
  const user = users.find((el) => el.login === login);
  if (!user) {
    return undefined;
  }

  if (await bcrypt.compare(password, user.password)) {
    return generateAccessToken(user.id, user.name);
  }

  return undefined;
};
