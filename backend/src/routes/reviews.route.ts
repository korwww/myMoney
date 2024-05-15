import express from 'express';
import { getReviewsWithPagination } from '../controllers/reviews.controller';

const router = express.Router();

router.use(express.json());

router.route('/').get(getReviewsWithPagination).post();

router.route('/:id').get().patch().delete();

export { router as reviewsRouter };
