import { AppDataSource } from '../data-source';
import { Report } from '../entity/report_content.entity';
import { User } from '../entity/users.entity';
import { ERROR_MESSAGE } from '../constance/errorMessage';

const reportRepository = AppDataSource.getRepository(Report);
const userRepository = AppDataSource.getRepository(User);

export interface ICreateReviewProps {
  reportedUserId: number;
  reporterUserId: number;
  reason: string;
}

export const findSuspendedUsers = async () => {
  const users = await userRepository
    .createQueryBuilder('user')
    .select([
      'user.id AS reportedUserId',
      'user.nickname AS nickname',
      'user.email AS reportedUserEmail',
      'user.isAdmin AS isAdmin',
      'report_content.id AS reportId',
      'COUNT(report_content.id) AS reportCount',
      'MAX(report_content.created_at) AS reportedDate',
      'MAX(report_content.reason) AS reportReason',
    ])
    .leftJoin(
      Report,
      'report_content',
      'report_content.reported_user_id = user.id',
    )
    .groupBy('user.id, report_content.id')
    .having('reportCount > 0')
    .getRawMany();

  return users;
};

export const deleteReport = async (id: number) => {
  const report = await reportRepository.findOneBy({ id });
  if (!report) {
    throw new Error(ERROR_MESSAGE.INVALID_DATA);
  }
  return await reportRepository.remove(report);
};

export const createReport = async ({
  reportedUserId,
  reporterUserId,
  reason,
}: ICreateReviewProps) => {
  const reportedUser = await userRepository.findOneBy({ id: reportedUserId });
  if (!reportedUser) throw new Error(ERROR_MESSAGE.INVALID_USER);

  const report = new Report();
  report.reporterUserId = reporterUserId;
  report.reason = reason;
  report.user = reportedUser;

  return await reportRepository.save(report);
};

export const checkDuplicateReport = async ({
  reportedUserId,
  reporterUserId,
}: {
  reportedUserId: number;
  reporterUserId: number;
}) => {
  const report = await reportRepository.find({
    where: {
      user: { id: reportedUserId },
      reporterUserId: reporterUserId,
    },
  });

  return report.length > 0;
};
