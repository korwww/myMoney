import express from 'express';
import { deleteReview, findReviewById } from '../controllers/review.controller';

const router = express.Router();

router.get('/:id', findReviewById);
router.delete('/:id', deleteReview);

export { router as reviewsRouter };
