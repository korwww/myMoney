import express from 'express';
import {
  getReviews,
  deleteReview,
  getReviewDetails,
  createReview,
  updateReview
} from '../controllers/reviews.controller';
import { authentication } from '../middlewares/authentication';

const router = express.Router();

router.use(express.json());

router.route('/').get(getReviews).post();

router.route('/:id').get(getReviewDetails).patch().delete();

router.post('/', authentication, createReview);
router.patch('/:id', authentication, updateReview);


export { router as reviewsRouter };

