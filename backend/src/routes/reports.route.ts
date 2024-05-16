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

router.post('/', validateAddReport, authentication, addReport);
router.delete('/:id', validateCancelReport, authentication, cancelReport);
router.get('/users', authentication, getSuspendedUsers);

export { router as reportsRouter };
