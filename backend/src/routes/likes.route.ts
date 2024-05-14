import express from 'express';
import { addLike, removeLike } from '../controllers/like.controller';

const router = express.Router();

router.post('/:id', addLike);
router.delete('/:id', removeLike);

export { router as likeRouter };
