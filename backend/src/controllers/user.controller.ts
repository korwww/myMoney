import { Response } from 'express';
import { QueryError } from 'mysql2';

import { AppDataSource } from '../data-source';
import { User } from '../entity/users.entity';
import { CustomRequest } from '../middlewares/authentication';
import {
  comparePassword,
  generateToken,
  hashPassword,
} from '../utils/authUtils';

const userRepository = AppDataSource.getRepository(User);

// user.controller.ts 코드 -> 모델+서비스 코드로 분리하는 리팩토링 작업할 예정입니다.

export const LoginUser = async (req: CustomRequest, res: Response) => {
  const { email, password } = req.body;

  const user = await userRepository.findOneBy({ email });
  if (!user) return res.status(404).send({ message: 'User not found' });

  const matchedPassword = await comparePassword(password, user.password);
  if (!matchedPassword)
    return res.status(400).send({ message: 'Not Matched Password' });

  const token = generateToken(user);

  res
    .status(200)
    .cookie('access-token', token, { httpOnly: true })
    .send({ message: 'success', isAdmin: !!user.is_admin });
};

export const LogoutUser = async (req: CustomRequest, res: Response) => {
  res.clearCookie('access-token');
  res.send(204).end();
};

export const CheckedDuplicateEmail = async (
  req: CustomRequest,
  res: Response,
) => {
  const { email } = req.body;

  const user = await userRepository.findOneBy({ email });
  if (user) return res.status(409).send({ message: 'Duplicate email' });

  return res.status(200).send({ message: 'success' });
};

export const CheckedDuplicateNickname = async (
  req: CustomRequest,
  res: Response,
) => {
  const { nickname } = req.body;

  const user = await userRepository.findOneBy({ nickname });
  if (user) return res.status(409).send({ message: 'Duplicate nickname' });

  return res.status(200).send({ message: 'success' });
};

export const JoinUser = async (req: CustomRequest, res: Response) => {
  try {
    const { email, password, nickname } = req.body;

    const today = new Date();
    today.setDate(today.getDate() - 1);

    const user = new User();
    user.email = email;
    user.password = await hashPassword(password);
    user.nickname = nickname;
    user.expired_date = today;
    await userRepository.save(user);

    return res.status(201).send({ message: 'Created' });
  } catch (error) {
    if ((error as QueryError).code === 'ER_DUP_ENTRY')
      return res.status(409).send({ message: 'Duplicate Email or Nickname' });
  }
  return res.status(500).send({ message: 'Internal Server Error' });
};

export const UserInfo = async (req: CustomRequest, res: Response) => {
  // 요청에서 사용자 ID를 얻습니다. (인증 미들웨어를 통해 req.user에 사용자 정보가 존재한다고 가정)
  // const { userId } = req.body; -> postman 테스트용 코드(테스트 할 때는 바로 밑에 코드는 주석처리하고 사용해야함!)
  const userId = req.user?.id;

  // 사용자 ID가 없는 경우, 즉 인증이 제대로 되지 않은 경우
  if (!userId) {
    return res.status(401).send({ message: 'Unauthorized' });
  }

  try {
    // 사용자 ID를 사용하여 데이터베이스에서 사용자 정보를 조회
    const user = await userRepository.findOneBy({ id: userId });

    // 사용자 정보를 찾을 수 없는 경우
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    // 사용자의 이메일과 닉네임을 응답으로 반환
    return res.status(200).send({
      email: user.email,
      nickname: user.nickname,
    });
  } catch (error) {
    // 데이터베이스 조회 중 예외가 발생한 경우
    console.error(error);
    return res.status(500).send({ message: 'Internal Server Error' });
  }
};
