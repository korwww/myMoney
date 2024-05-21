import express from 'express';
import { authentication } from '../middlewares/authentication';
import {
  deleteReport,
  addReport,
  getSuspendedUsers,
} from '../controllers/reports.controller';
import {
  validateAddReport,
  validateDeleteReport,
} from '../validators/reports.validator';

const router = express.Router();

router.post('/', validateAddReport, authentication(true), addReport);
router.delete('/:id', validateDeleteReport, authentication(true), deleteReport);
router.get('/users', authentication(true), getSuspendedUsers);

export { router as reportsRouter };
