import { ERROR_MESSAGE } from '../constance/errorMessage';
import {
  ICreateReviewProps,
  checkDuplicateReport,
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

export const serviceDeleteReport = async (reportId: number) => {
  return await deleteReport(reportId);
};

export const serviceCreateReport = async ({
  reportedUserId,
  reporterUserId,
  reason,
}: ICreateReviewProps) => {
  const isDuplicateReport = await checkDuplicateReport({
    reportedUserId,
    reporterUserId,
  });
  if (isDuplicateReport) {
    throw new Error(ERROR_MESSAGE.DUPLICATE_REPORT);
  }
  return await createReport({
    reportedUserId,
    reporterUserId,
    reason,
  });
};
