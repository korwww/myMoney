import { body, param } from 'express-validator';
import { validator } from './validator';

const validateReportedUserId = body('reportedUserId')
  .trim()
  .notEmpty()
  .withMessage('Reported userID is required')
  .isInt({ min: 1 })
  .withMessage('Reported userID must be an integer');

const validateReportReason = body('reason')
  .trim()
  .notEmpty()
  .withMessage('Reason is required');

const validateReportId = param('id')
  .trim()
  .notEmpty()
  .withMessage('ReportID is required')
  .isInt({ min: 1 })
  .withMessage('ReportID must be an integer');

export const validateAddReport = [
  validateReportedUserId,
  validateReportReason,
  validator,
];

export const validateDeleteReport = [validateReportId, validator];
