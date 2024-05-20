// 비즈니스 로직 작성
import { ERROR_MESSAGE } from '../constance/errorMessage';
import {
  findUserByEmail,
  findUserByNickname,
  createUser as createNewUser,
  findUserWithReportInfo,
} from '../models/user.model';
import {
  hashPassword,
  comparePassword,
  generateToken,
  suspendedUser,
} from '../utils/authUtils';

export const serviceLogin = async (email: string, password: string) => {
  const user = await findUserWithReportInfo(email);
  if (!user) throw new Error(ERROR_MESSAGE.USER_NOT_FOUND);

  const isPasswordMatch = await comparePassword(password, user.password);
  if (!isPasswordMatch) throw new Error(ERROR_MESSAGE.NOT_MATCHED_PASSWORD);

  // 정지된 유저 처리
  if (user.reportCount > 0 && user.reportedDate) {
    return suspendedUser(user);
  }

  const token = generateToken(user);
  return { user, token, isAdmin: !!user.isAdmin };
};

export const serviceCheckDuplicateEmail = async (email: string) => {
  const user = await findUserByEmail(email);
  if (user) throw new Error(ERROR_MESSAGE.DUPLICATE_EMAIL);
};

export const serviceCheckDuplicateNickname = async (nickname: string) => {
  const user = await findUserByNickname(nickname);
  if (user) throw new Error(ERROR_MESSAGE.DUPLICATE_NICKNAME);
};

export const serviceJoin = async (
  email: string,
  password: string,
  nickname: string,
) => {
  const hashedPassword = await hashPassword(password);
  await createNewUser({ email, password: hashedPassword, nickname });
};

export const serviceGetUserInfo = async (email: string) => {
  const user = await findUserWithReportInfo(email);
  if (!user) throw new Error(ERROR_MESSAGE.USER_NOT_FOUND);

  if (user.reportCount > 0 && user.reportedDate) {
    return suspendedUser(user);
  }

  return { user };
};
