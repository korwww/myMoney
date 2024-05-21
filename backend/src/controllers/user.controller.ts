import { Response, Request } from 'express';

import { CustomRequest } from '../middlewares/authentication';
import {
  serviceCheckDuplicateEmail,
  serviceCheckDuplicateNickname,
  serviceGetUserInfo,
  serviceLogin,
  serviceJoin,
} from '../services/user.service';
import { ERROR_MESSAGE } from '../constance/errorMessage';

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const loginResult = await serviceLogin(email, password);

    // 사용자가 차단된 경우
    if ('suspendedUser' in loginResult) {
      return res.status(403).send({
        message: 'User is suspended',
        ...loginResult.suspendedUser,
      });
    }

    const { isAdmin, token, user } = loginResult;

    res
      .status(200)
      .cookie('access-token', token, { httpOnly: true })
      .send({ message: 'success', isAdmin, email: user.email });
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const logoutUser = async (req: Request, res: Response) => {
  res.clearCookie('access-token');
  res.sendStatus(204);
};

export const checkedDuplicateEmail = async (req: Request, res: Response) => {
  const { email } = req.body;
  try {
    await serviceCheckDuplicateEmail(email);
    res.status(200).send({ message: 'success' });
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const checkedDuplicateNickname = async (req: Request, res: Response) => {
  const { nickname } = req.body;
  try {
    await serviceCheckDuplicateNickname(nickname);
    res.status(200).send({ message: 'success' });
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const joinUser = async (req: Request, res: Response) => {
  const { email, password, nickname } = req.body;

  try {
    await serviceJoin(email, password, nickname);
    res.status(201).send({ message: 'Created' });
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getUserInfo = async (req: CustomRequest, res: Response) => {
  const { email } = req.user!;

  if (!email) {
    throw new Error(ERROR_MESSAGE.INVALID_USER);
  }

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

    res.status(200).send({
      email: user.email,
      nickname: user.nickname,
      reportCount: user.reportCount,
    });
  } catch (error: any) {
    throw new Error(error.message);
  }
};
