import express from 'express';
import { authentication } from '../middlewares/authentication';
import {
  cancelReport,
  addReport,
  getSuspendedUsers,
} from '../controllers/reports.controller';
import {
  validateAddReport,
  validateCancelReport,
} from '../validators/reports.validator';

const router = express.Router();

router.post('/', validateAddReport, authentication(true), addReport);
router.delete('/:id', validateCancelReport, authentication(true), cancelReport);
router.get('/users', authentication(true), getSuspendedUsers);

export { router as reportsRouter };
