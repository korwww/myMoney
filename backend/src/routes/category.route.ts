import express from 'express';
import { getCategory } from '../controllers/category.controller';

const router = express.Router();

router.get('/', getCategory);

export { router as categoryRouter };
