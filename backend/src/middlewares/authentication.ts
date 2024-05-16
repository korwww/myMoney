import { NextFunction, Response, Request } from 'express';
import jwt from 'jsonwebtoken';

import { TOKEN_PRIVATE_KEY } from '../settings';
import { getUserInfo } from '../services/user.service';
import { ERROR_MESSAGE } from '../constance/errorMessage';

export interface IUserInfo {
  email: string;
  id: number;
  isAdmin: boolean;
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
  const userInfoResult = await getUserInfo(email);

  // 사용자가 차단된 경우
  if ('suspendedUser' in userInfoResult) {
    return res.status(403).send({
      message: 'User is suspended',
      ...userInfoResult.suspendedUser,
    });
  }

  const { user } = userInfoResult;
  if (!user) {
    throw new Error(ERROR_MESSAGE.USER_NOT_FOUND);
  }

  req.user = {
    email: user.email,
    id: user.id,
    isAdmin: user.isAdmin,
  };

  next();
};
