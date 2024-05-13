import express from 'express';
import { createReview, getReviews } from '../controllers/reviews.controller';

const router = express.Router();

router.use(express.json());

router.route('/').get(getReviews).post();

router.route('/:id').get().patch().delete();

router.route('/').post(createReview);

export { router as reviewsRouter };
