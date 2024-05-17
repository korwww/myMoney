import express from 'express';

import { authentication } from '../middlewares/authentication';
import {
  checkedDuplicateEmail,
  checkedDuplicateNickname,
  joinUser,
  loginUser,
  logoutUser,
  userInfo,
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
router.post('/checked_email', validateCheckedEmail, checkedDuplicateEmail);
router.post(
  '/checked_nickname',
  validateCheckedNickname,
  checkedDuplicateNickname,
);
router.post('/join', validateJoin, joinUser);
router.get('/me', authentication(true), userInfo);

export { router as usersRouter };
