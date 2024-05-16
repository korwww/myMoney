import express from 'express';
import { authentication } from '../middlewares/authentication';
import {
  cancelReport,
  getSuspendedUsers,
} from '../controllers/reports.controller';

const router = express.Router();

router.delete('/:id', authentication, cancelReport);

router.get('/users', authentication, getSuspendedUsers);

export { router as reportsRouter };
