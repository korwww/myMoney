import express from 'express';
import {
  getReviews,
  deleteReview,
  getReviewDetails,
} from '../controllers/reviews.controller';

const router = express.Router();

router.use(express.json());

router.route('/').get(getReviews).post();

router.route('/:id').get(getReviewDetails).patch().delete();

export { router as reviewsRouter };
