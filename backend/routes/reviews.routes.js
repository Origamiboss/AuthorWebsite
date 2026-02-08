import { Router } from 'express';
import { getReviews } from '../controllers/reviews.controller.js';

const router = Router();

// GET /api/reviews
// Optional: ?bookId=123
router.get('/', getReviews);

export default router;
