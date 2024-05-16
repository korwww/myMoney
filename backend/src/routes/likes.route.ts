import { authentication } from './../middlewares/authentication';
import express from 'express';
import { addLike, cancelLike } from '../controllers/like.controller';

const router = express.Router();

router.post('/:id', authentication, addLike);
router.delete('/:id', authentication, cancelLike);

export { router as likeRouter };
