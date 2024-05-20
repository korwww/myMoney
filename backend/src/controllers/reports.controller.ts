import { Response, Request } from 'express';

import { CustomRequest } from '../middlewares/authentication';
import {
  serviceDeleteReport,
  serviceCreateReport,
  serviceFindSuspendedUsers,
} from '../services/report.service';
import { ERROR_MESSAGE } from '../constance/errorMessage';

export const getSuspendedUsers = async (req: Request, res: Response) => {
  try {
    const { users } = await serviceFindSuspendedUsers();
    res.status(200).send({ message: 'Success', users });
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const deleteReport = async (req: CustomRequest, res: Response) => {
  const { isAdmin } = req.user!;
  if (!isAdmin) {
    throw new Error(ERROR_MESSAGE.DENIED);
  }

  const { id } = req.params;
  const parseIntId = parseInt(id);
  try {
    await serviceDeleteReport(parseIntId);
    res.status(200).send({ message: 'success' });
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const addReport = async (req: CustomRequest, res: Response) => {
  const { id } = req.user!;
  const { reportedUserId, reason } = req.body;

  try {
    await serviceCreateReport({
      reportedUserId: Number(reportedUserId),
      reason,
      reporterUserId: Number(id),
    });
    res.status(201).send({ message: 'Created' });
  } catch (error: any) {
    throw new Error(error.message);
  }
};
