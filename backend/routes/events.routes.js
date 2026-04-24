import { Router } from 'express';
import {
    getAllEvents,
    getEventById
} from '../controllers/events.controller.js';

const router = Router();

// GET /api/events
router.get('/', getAllEvents);

// GET /api/events/:id
router.get('/:id', getEventById);

export default router;
