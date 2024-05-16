import { body, param } from 'express-validator';
import { validator } from './validator';
import { bannedWordsRegex } from '../constance/bannedWord';

const validateCommentContent = body('content')
  .trim()
  .notEmpty()
  .withMessage('Content is required')
  .custom((content) => {
    if (bannedWordsRegex.test(content)) {
      return false;
    }
    return true;
  })
  .withMessage('Content includes banned words');

const validateReviewId = body('reviewId')
  .trim()
  .notEmpty()
  .withMessage('ReviewID is required')
  .isInt({ min: 1 })
  .withMessage('ReviewID must be an integer');

const validateCommentId = param('id')
  .trim()
  .notEmpty()
  .withMessage('CommentID is required')
  .isInt({ min: 1 })
  .withMessage('CommentID must be an integer');

export const validateAddComment = [
  validateCommentContent,
  validateReviewId,
  validator,
];

export const validateEditComment = [
  validateCommentContent,
  validateCommentId,
  validateReviewId,
  validator,
];
