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

const router = express.Router();

router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.post('/checked_email', checkedDuplicateEmail);
router.post('/checked_nickname', checkedDuplicateNickname);
router.post('/join', joinUser);
router.get('/me', authentication, userInfo);

export { router as usersRouter };
