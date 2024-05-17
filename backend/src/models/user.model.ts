import { AppDataSource } from '../data-source';
import { Report } from '../entity/report_content.entity';
import { User } from '../entity/users.entity';

export interface IUser {
  id: number;
  password: string;
  email: string;
  nickname: string;
  isAdmin: boolean;
  reportCount: number;
}

export interface IUserWithReportInfo extends IUser {
  reportReason?: string | null;
  reportedDate: string | null;
}

const userRepository = AppDataSource.getRepository(User);

export const findUserWithReportInfo = async (email: string) => {
  const [userFromDB]: IUserWithReportInfo[] = await userRepository
    .createQueryBuilder('user')
    .select([
      'user.id as id',
      'user.nickname as nickname',
      'user.email as email',
      'user.password as password',
      'user.isAdmin as isAdmin',
      'COUNT(report_content.id) AS reportCount',
      'MAX(report_content.created_at) AS reportedDate',
    ])
    .leftJoin(
      Report,
      'report_content',
      'report_content.reported_user_id = user.id',
    )
    .where('user.email = :email', { email })
    .groupBy('user.id')
    .getRawMany();

  return { ...userFromDB, reportCount: Number(userFromDB.reportCount) };
};

export const findUserByEmail = async (email: string) => {
  return await userRepository.findOneBy({ email });
};

export const findUserByNickname = async (nickname: string) => {
  return await userRepository.findOneBy({ nickname });
};

export const findUserById = async (id: number) => {
  return await userRepository.findOneBy({ id });
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
