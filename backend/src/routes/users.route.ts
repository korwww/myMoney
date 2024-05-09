import express from 'express';

import {
  CheckedDuplicateEmail,
  CheckedDuplicateNickname,
  JoinUser,
  LoginUser,
  LogoutUser,
} from '../controllers/user.controller';

const router = express.Router();

router.post('/login', LoginUser);
router.post('/logout', LogoutUser);
router.post('/checked_email', CheckedDuplicateEmail);
router.post('/checked_nickname', CheckedDuplicateNickname);
router.post('/join', JoinUser);

export { router as usersRouter };
