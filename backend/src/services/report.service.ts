import {
  ICreateReviewProps,
  createReport,
  deleteReport,
  findSuspendedUsers,
} from '../models/report.model';
import { calcSuspensionEndDate } from '../utils/authUtils';

export const serviceFindSuspendedUsers = async () => {
  const users = await findSuspendedUsers();

  const extendedUsers = users.map((user) => ({
    ...user,
    isSuspended:
      calcSuspensionEndDate(parseInt(user.reportCount), user.reportedDate) > 0,
  }));

  return { users: extendedUsers };
};

export const serviceCancelReport = async (reportId: number) => {
  return await deleteReport(reportId);
};

export const serviceCreateReport = async ({
  reportedUserId,
  reporterUserId,
  reason,
}: ICreateReviewProps) => {
  return await createReport({
    reportedUserId,
    reporterUserId,
    reason,
  });
};
