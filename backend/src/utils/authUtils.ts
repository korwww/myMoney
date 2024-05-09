import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { IUserInfo } from '../models/user.model';
import { SALT_ROUNDS, TOKEN_PRIVATE_KEY } from '../settings';

export const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, SALT_ROUNDS);
};

export const comparePassword = async (
  password: string,
  loginUserPassword: string,
) => {
  return await bcrypt.compare(password, loginUserPassword);
};

export const generateToken = (loginUser: IUserInfo) => {
  const { email, id } = loginUser;
  return jwt.sign({ email, id }, TOKEN_PRIVATE_KEY!, {
    expiresIn: '10h',
  });
};
