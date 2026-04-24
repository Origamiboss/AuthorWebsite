import { Router } from 'express';
import {
    getAllBooks,
    getBookById
} from '../controllers/books.controller.js';

const router = Router();

// GET /api/books
router.get('/', getAllBooks);

// GET /api/books/:id
router.get('/:id', getBookById);

export default router;
