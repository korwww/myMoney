import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { SALT_ROUNDS, TOKEN_PRIVATE_KEY } from '../settings';
import { IUserInfo } from '../middlewares/authentication';
import { IUser } from '../models/user.model';

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

export const getUserSuspensionStatus = (user: IUser) => {
  const userExpirationDate = new Date(user.expiredDate);
  const currentDate = new Date();

  const timeDiff = userExpirationDate.getTime() - currentDate.getTime();
  const daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24));

  return { isSuspended: userExpirationDate > currentDate, daysLeft };
};
