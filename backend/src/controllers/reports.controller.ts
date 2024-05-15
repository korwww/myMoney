import { Response } from 'express';

import { CustomRequest } from '../middlewares/authentication';
import {
  serviceCancelReport,
  serviceFindSuspendedUsers,
} from '../services/report.service';
import { ERROR_MESSAGE } from '../constance/errorMessage';

export const getSuspendedUsers = async (req: CustomRequest, res: Response) => {
  try {
    const { users } = await serviceFindSuspendedUsers();
    res.status(200).send({ message: 'Success', users });
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const cancelReport = async (req: CustomRequest, res: Response) => {
  const { isAdmin } = req.user!;
  if (!isAdmin) {
    throw new Error(ERROR_MESSAGE.DENIED);
  }

  const { id } = req.params;
  const parseIntId = parseInt(id);
  try {
    await serviceCancelReport(parseIntId);
    res.status(200).send({ message: 'success' });
  } catch (error: any) {
    throw new Error(error.message);
  }
};
