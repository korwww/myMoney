import express from 'express';
import { authentication } from '../middlewares/authentication';

import {
  CheckedDuplicateEmail,
  CheckedDuplicateNickname,
  JoinUser,
  LoginUser,
  LogoutUser,
  UserInfo,
} from '../controllers/user.controller';

const router = express.Router();

router.post('/login', LoginUser);
router.post('/logout', LogoutUser);
router.post('/checked_email', CheckedDuplicateEmail);
router.post('/checked_nickname', CheckedDuplicateNickname);
router.post('/join', JoinUser);
router.get('/me', authentication, UserInfo);

export { router as usersRouter };
