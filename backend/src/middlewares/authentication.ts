import { NextFunction, Response, Request } from 'express';
import jwt from 'jsonwebtoken';

import { TOKEN_PRIVATE_KEY } from '../settings';
import { getUserSuspensionStatus } from '../utils/authUtils';
import { getUserInfo } from '../services/user.service';
import { ERROR_MESSAGE } from '../constance/errorMessage';

export interface IUserInfo {
  email: string;
  id: number;
}

export interface CustomRequest extends Request {
  user?: IUserInfo;
}

export const authentication = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  const accessToken = req.cookies['access-token'];
  if (!accessToken) {
    throw new Error(ERROR_MESSAGE.TOKEN_NOT_FOUND);
  }

  // JWT 검증
  try {
    jwt.verify(accessToken, TOKEN_PRIVATE_KEY!);
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError) {
      throw new Error(ERROR_MESSAGE.SESSION_EXPIRED);
    }

    throw new Error(ERROR_MESSAGE.INVALID_TOKEN);
  }

  // JWT Decode
  const decodedToken = jwt.decode(accessToken);
  if (typeof decodedToken === 'string' || decodedToken === null) {
    throw new Error(ERROR_MESSAGE.INVALID_TOKEN);
  }

  const { email } = decodedToken as IUserInfo;
  const { user } = await getUserInfo(email);

  if (!user) {
    throw new Error(ERROR_MESSAGE.USER_NOT_FOUND);
  }

  // 계정이 정지된 유저인지 확인
  const { isSuspended, daysLeft } = getUserSuspensionStatus(user);
  if (isSuspended) {
    return res.status(403).send({
      message: ERROR_MESSAGE.USER_IS_SUSPENDED,
      email: user.email,
      reportCount: user.expiredDate,
      isSuspended,
      suspensionRemainingDays: daysLeft,
    });
  }

  req.user = {
    email: user.email,
    id: user.id,
  };

  next();
};
