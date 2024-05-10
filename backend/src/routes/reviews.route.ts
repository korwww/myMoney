import express from 'express';
import { getReviews } from '../controllers/reviews.controller';
import { deleteReview, findReviewById } from '../controllers/review.controller';

const router = express.Router();

router.use(express.json());

router.route('/').get(getReviews).post();

router.route('/:id').get(findReviewById).patch().delete(deleteReview);

export { router as reviewsRouter };
