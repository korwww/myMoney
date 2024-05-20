import express from 'express';

import { authentication } from '../middlewares/authentication';
import {
  checkedDuplicateEmail,
  checkedDuplicateNickname,
  joinUser,
  loginUser,
  logoutUser,
  getUserInfo,
} from '../controllers/user.controller';
import {
  validateCheckedEmail,
  validateCheckedNickname,
  validateJoin,
  validateLogin,
} from '../validators/users.validator';

const router = express.Router();

router.post('/login', validateLogin, loginUser);
router.post('/logout', logoutUser);
router.post('/checkedEmail', validateCheckedEmail, checkedDuplicateEmail);
router.post(
  '/checkedNickname',
  validateCheckedNickname,
  checkedDuplicateNickname,
);
router.post('/join', validateJoin, joinUser);
router.get('/me', authentication(true), getUserInfo);

export { router as usersRouter };
