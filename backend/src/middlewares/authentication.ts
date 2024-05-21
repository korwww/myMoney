import { NextFunction, Response, Request } from 'express';
import jwt from 'jsonwebtoken';

import { TOKEN_PRIVATE_KEY } from '../settings';
import { serviceGetUserInfo } from '../services/user.service';
import { ERROR_MESSAGE } from '../constance/errorMessage';

export interface IUserInfo {
  email: string;
  id: number;
  isAdmin: boolean;
}

export interface CustomRequest extends Request {
  user?: IUserInfo;
}

/**
 * 사용자 인증을 위한 미들웨어
 * @param requireLogin - 로그인이 필요한지 여부를 결정 (기본값은 false)
 * @returns Express 미들웨어 함수
 */
export const authentication = (requireLogin: boolean = false) => {
  return async (req: CustomRequest, res: Response, next: NextFunction) => {
    const accessToken = req.cookies['access-token'];
    if (!accessToken) {
      if (requireLogin) {
        return res.status(401).send({ message: ERROR_MESSAGE.TOKEN_NOT_FOUND });
      }
      return next();
    }

    // JWT 검증
    try {
      jwt.verify(accessToken, TOKEN_PRIVATE_KEY!);
    } catch (err) {
      if (err instanceof jwt.TokenExpiredError) {
        return res.status(401).send({ message: ERROR_MESSAGE.SESSION_EXPIRED });
      }
      return res.status(401).send({ message: ERROR_MESSAGE.INVALID_TOKEN });
    }

    // JWT Decode
    const decodedToken = jwt.decode(accessToken);
    if (typeof decodedToken === 'string' || decodedToken === null) {
      return res.status(401).send({ message: ERROR_MESSAGE.INVALID_TOKEN });
    }

    const { email } = decodedToken as IUserInfo;
    try {
      const userInfoResult = await serviceGetUserInfo(email);

      // 사용자가 차단된 경우
      if ('suspendedUser' in userInfoResult) {
        return res.status(403).send({
          message: 'User is suspended',
          ...userInfoResult.suspendedUser,
        });
      }

      const { user } = userInfoResult;
      if (!user) {
        return res.status(404).send({ message: ERROR_MESSAGE.USER_NOT_FOUND });
      }

      req.user = {
        email: user.email,
        id: user.id,
        isAdmin: user.isAdmin,
      };

      next();
    } catch (err) {
      next(err);
    }
  };
};
