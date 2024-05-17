import express from 'express';
import {
  removeReview,
  getReviewDetails,
  createReview,
  updateReview,
  getReviewsWithPagination,
  approveReviewByAdmin,
} from '../controllers/reviews.controller';
import { authentication } from '../middlewares/authentication';

const router = express.Router();

router.use(express.json());

router.route('/').get(authentication(), getReviewsWithPagination).post();

router
  .route('/:id')
  .get(authentication(), getReviewDetails)
  .delete(authentication(), removeReview);

router.post('/', authentication(true), createReview);
router.patch('/:id', authentication, updateReview);
router.patch('/:id/approve', authentication(true), approveReviewByAdmin);

export { router as reviewsRouter };
