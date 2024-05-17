import {
  validateAddComment,
  validateEditComment,
} from './../validators/comments.validator';
import { authentication } from './../middlewares/authentication';
import express from 'express';
import {
  addComment,
  editComment,
  removeComment,
} from '../controllers/comment.controller';

const router = express.Router();

router.post('/', authentication, validateAddComment, addComment);
router.patch('/:id', authentication, validateEditComment, editComment);
router.delete('/:id', authentication, removeComment);

export { router as commentsRouter };
