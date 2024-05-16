import express from 'express';
import {
  deleteReview,
  getReviewDetails,
  createReview,
  updateReview,
  getReviewsWithPagination,
} from '../controllers/reviews.controller';
import { authentication } from '../middlewares/authentication';

const router = express.Router();

router.use(express.json());

router.route('/').get(authentication, getReviewsWithPagination).post();

router
  .route('/:id')
  .get(getReviewDetails)
  .patch()
  .delete(authentication, deleteReview);

router.post('/', authentication, createReview);
router.patch('/:id', authentication, updateReview);

export { router as reviewsRouter };
