import express from 'express';
import { getReviews } from '../controllers/getReviews';

const router = express.Router();

router.use(express.json());

router.route('/').get(getReviews).post();

router.route('/:id').get().patch().delete();

export { router as reviewsRouter };
