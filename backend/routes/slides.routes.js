import { Router } from 'express';
import { getActiveSlides } from '../controllers/slides.controller.js';

const router = Router();

// GET /api/slides
router.get('/', getActiveSlides);

export default router;
