import express from 'express';

const router = express.Router();

router.use(express.json());

router.route('/').get().post();

router.route('/:id').get().patch().delete();

module.exports = router;
