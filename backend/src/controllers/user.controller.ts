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
