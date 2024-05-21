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

router.post('/', authentication(true), validateAddComment, addComment);
router.patch('/:id', authentication(true), validateEditComment, editComment);
router.delete('/:id', authentication(true), removeComment);

export { router as commentsRouter };
