import { Response, Request } from 'express';

import { CustomRequest } from '../middlewares/authentication';
import {
  checkDuplicateEmail,
  checkDuplicateNickname,
  getUserInfo,
  join,
  login,
} from '../services/user.service';
import { ERROR_MESSAGE } from '../constance/errorMessage';

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const loginResult = await login(email, password);

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
  res.send(204).end();
};

export const checkedDuplicateEmail = async (req: Request, res: Response) => {
  const { email } = req.body;
  try {
    await checkDuplicateEmail(email);
    res.status(200).send({ message: 'success' });
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const checkedDuplicateNickname = async (req: Request, res: Response) => {
  const { nickname } = req.body;
  try {
    await checkDuplicateNickname(nickname);
    res.status(200).send({ message: 'success' });
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const joinUser = async (req: Request, res: Response) => {
  const { email, password, nickname } = req.body;

  try {
    await join(email, password, nickname);
    res.status(201).send({ message: 'Created' });
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const userInfo = async (req: CustomRequest, res: Response) => {
  // 요청에서 사용자 ID를 얻습니다. (인증 미들웨어를 통해 req.user에 사용자 정보가 존재한다고 가정)
  // const { userId } = req.body; -> postman 테스트용 코드(테스트 할 때는 바로 밑에 코드는 주석처리하고 사용해야함!)
  const { email } = req.user!;

  // 사용자 ID가 없는 경우, 즉 인증이 제대로 되지 않은 경우
  if (!email) {
    throw new Error(ERROR_MESSAGE.INVALID_USER);
  }

  try {
    // 사용자 ID를 사용하여 데이터베이스에서 사용자 정보를 조회
    const userInfoResult = await getUserInfo(email);

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
