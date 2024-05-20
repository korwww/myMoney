import { body } from 'express-validator';
import { validator } from './validator';

const validateReviewTitle = body('title')
  .trim()
  .notEmpty()
  .withMessage('Title is required')
  .isString()
  .withMessage('Title must be a string');

const validateReviewContent = body('content')
  .trim()
  .notEmpty()
  .withMessage('Content is required')
  .isString()
  .withMessage('Content must be a string');

const validateReviewCategoryId = body('categoryId')
  .notEmpty()
  .withMessage('Category ID is required')
  .isInt({ min: 1 })
  .withMessage('Category ID must be a positive integer');

const validateReviewStars = body('stars')
  .notEmpty()
  .withMessage('Stars are required')
  .isInt({ min: 1, max: 5 })
  .withMessage('Stars must be an integer between 1 and 5');

const validateReceiptImg = body('receiptImg')
  .trim()
  .notEmpty()
  .withMessage('Receipt image must be a valid URL');

const validateReviewImg = body('reviewImg')
  .trim()
  .notEmpty()
  .withMessage('Review image must be a valid URL');

export const validateReview = [
  validateReviewTitle,
  validateReviewContent,
  validateReviewCategoryId,
  validateReviewStars,
  validateReceiptImg,
  validateReviewImg,
  validator,
];
