// server.js
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { pool } from './utils/db.js';

const PORT = process.env.PORT || 5000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve uploads folder
app.use('/uploads', express.static(join(__dirname, 'uploads')));

// GET /api/books
app.get('/api/books', async (req, res) => {
    try {
        const [books] = await pool.query(
            `SELECT id, title, description, fileName
             FROM books`
        );

        const baseUrl = `${req.protocol}://${req.get('host')}`;

        const booksWithUrls = books.map(book => ({
            ...book,
            coverImage: book.fileName
                ? `${baseUrl}/uploads/books/${book.fileName}`
                : `${baseUrl}/uploads/books/default.png`
        }));

        res.json(booksWithUrls);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database error' });
    }
});

//Get a specific book by ID
app.get('/api/books/:id', async (req, res) => {
    const bookId = Number(req.params.id);

    if (!Number.isInteger(bookId)) {
        return res.status(400).json({ error: 'Invalid book ID' });
    }

    try {
        const [rows] = await pool.query(
            `SELECT id, title, genre, publishedYear, description, cost, fileName
             FROM books
             WHERE id = ?`,
            [bookId]
        );

        if (rows.length === 0) {
            return res.status(404).json({ error: 'Book not found' });
        }

        const baseUrl = `${req.protocol}://${req.get('host')}`;
        const book = rows[0];

        book.coverImage = book.fileName
            ? `${baseUrl}/uploads/books/${book.fileName}`
            : `${baseUrl}/uploads/books/default.png`;

        res.json(book);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database error' });
    }
});

// GET /api/events
app.get('/api/events', async (req, res) => {
    try {
        const [events] = await pool.query(
            `SELECT id, name, description, date, fileName
             FROM events`
        );

        const baseUrl = `${req.protocol}://${req.get('host')}`;

        const eventsWithUrls = events.map(event => ({
            ...event,
            imageUrl: event.fileName
                ? `${baseUrl}/uploads/events/${event.fileName}`
                : `${baseUrl}/uploads/events/default.png`
        }));

        res.json(eventsWithUrls);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database error' });
    }
});


// Root route
app.get('/', (req, res) => {
    res.send('API Running');
});

// Start server
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
