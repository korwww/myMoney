import { authentication } from './../middlewares/authentication';
import express from 'express';
import { addLike, cancelLike } from '../controllers/like.controller';

const router = express.Router();

router.post('/:id', authentication(true), addLike);
router.delete('/:id', authentication(true), cancelLike);

export { router as likeRouter };
