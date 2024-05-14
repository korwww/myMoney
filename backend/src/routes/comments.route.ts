import express from 'express';
import {
  deleteComment,
  findAll,
  updateComment,
} from '../controllers/comment.controller';

const router = express.Router();

router.get('/', findAll);
router.patch('/:id', updateComment);
router.delete('/:id', deleteComment);

export { router as commentsRouter };
