// 비즈니스 로직 작성
import { ERROR_MESSAGE } from '../constance/errorMessage';
import {
  findUserByEmail,
  findUserByNickname,
  createUser as createNewUser,
} from '../models/user.model';
import {
  hashPassword,
  comparePassword,
  generateToken,
  getUserSuspensionStatus,
} from '../utils/authUtils';

export const login = async (email: string, password: string) => {
  const user = await findUserByEmail(email);
  if (!user) throw new Error(ERROR_MESSAGE.USER_NOT_FOUND);

  const { isSuspended, daysLeft } = getUserSuspensionStatus(user);
  if (isSuspended)
    return {
      user,
      isSuspended,
      suspensionRemainingDays: daysLeft,
    };

  const isPasswordMatch = await comparePassword(password, user.password);
  if (!isPasswordMatch) throw new Error(ERROR_MESSAGE.NOT_MATCHED_PASSWORD);

  const token = generateToken(user);
  return { user, token, isAdmin: !!user.isAdmin };
};

export const checkDuplicateEmail = async (email: string) => {
  const user = await findUserByEmail(email);
  if (user) throw new Error(ERROR_MESSAGE.DUPLICATE_EMAIL);
};

export const checkDuplicateNickname = async (nickname: string) => {
  const user = await findUserByNickname(nickname);
  if (user) throw new Error(ERROR_MESSAGE.DUPLICATE_NICKNAME);
};

export const join = async (
  email: string,
  password: string,
  nickname: string,
) => {
  const hashedPassword = await hashPassword(password);
  await createNewUser({ email, password: hashedPassword, nickname });
};

export const getUserInfo = async (email: string) => {
  const user = await findUserByEmail(email);
  if (!user) throw new Error(ERROR_MESSAGE.USER_NOT_FOUND);
  return { user };
};
