import express from 'express';
import { getReviewsWithPagination } from '../controllers/reviews.controller';
import { authentication } from '../middlewares/authentication';

const router = express.Router();

router.use(express.json());

router.route('/').get(authentication, getReviewsWithPagination).post();

router.route('/:id').get().patch().delete();

export { router as reviewsRouter };
