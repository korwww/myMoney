import { body } from 'express-validator';
import { validator } from './validator';

const validateEmail = body('email')
  .trim()
  .notEmpty()
  .withMessage('Email is required')
  .isEmail()
  .withMessage('Invalid email form');

const validateNickname = body('nickname')
  .trim()
  .notEmpty()
  .withMessage('Nickname is required');

const validatePassword = body('password')
  .trim()
  .notEmpty()
  .withMessage('Password is required');

// 유효성검사
export const validateJoin = [
  validateEmail,
  validateNickname,
  validatePassword,
  validator,
];
export const validateCheckedEmail = [validateEmail, validator];
export const validateCheckedNickname = [validateNickname, validator];
export const validateLogin = [validateEmail, validatePassword, validator];
