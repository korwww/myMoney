import { AppDataSource } from '../data-source';
import { User } from '../entity/users.entity';

export interface IUser {
  id: number;
  password: string;
  email: string;
  nickname: string;
  expiredDate: Date;
  isAdmin: boolean;
  reportCount: number;
}

const userRepository = AppDataSource.getRepository(User);

export const findUserByEmail = async (email: string) => {
  return await userRepository.findOneBy({ email });
};

export const findUserByNickname = async (nickname: string) => {
  return await userRepository.findOneBy({ nickname });
};

export const createUser = async (userData: {
  email: string;
  password: string;
  nickname: string;
}) => {
  const user = new User();
  user.email = userData.email;
  user.password = userData.password;
  user.nickname = userData.nickname;
  await userRepository.save(user);
};
