// server.js
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import paypalRoutes from './routes/paypal.js';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { pool } from './utils/db.js';
import fs from 'fs';
import path from 'path';

const PORT = process.env.PORT || 5000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve uploads folder
app.use('/uploads', express.static(join(__dirname, 'uploads')));

//Serve paypal route
app.use('/api/paypal', paypalRoutes);

// GET /api/books
app.get('/api/books', async (req, res) => {
    try {
        const [books] = await pool.query(
            `SELECT id, title, genre, description, fileName
             FROM books`
        );

        if (books.length === 0) {
            return res.json([]); // empty list is OK
        }

        const baseUrl = `${req.protocol}://${req.get('host')}`;
        const uploadDir = path.join(__dirname, 'uploads', 'books');

        const booksWithImages = await Promise.all(
            books.map(async (book) => {
                let coverImage = `${baseUrl}/uploads/books/default.jpg`;

                if (book.fileName) {
                    const filePath = path.join(
                        uploadDir,
                        path.basename(book.fileName)
                    );

                    try {
                        await fs.promises.access(filePath);
                        coverImage = `${baseUrl}/uploads/books/${book.fileName}`;
                    } catch {
                        // file missing -> fallback
                    }
                }

                return {
                    ...book,
                    coverImage
                };
            })
        );

        res.json(booksWithImages);

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

        const book = rows[0];
        const baseUrl = `${req.protocol}://${req.get('host')}`;

        const uploadDir = path.join(__dirname, 'uploads', 'books');
        const filePath = book.fileName
            ? path.join(uploadDir, book.fileName)
            : null;

        let coverImage = `${baseUrl}/uploads/books/default.jpg`;

        if (filePath) {
            try {
                await fs.promises.access(filePath, fs.constants.F_OK);
                coverImage = `${baseUrl}/uploads/books/${book.fileName}`;
            } catch {
                // file does not exist -> keep default
            }
        }

        res.json({
            ...book,
            coverImage
        });

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
// Get a single event by ID
app.get('/api/events/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const [rows] = await pool.query(
            `SELECT id, name, description, date, fileName
             FROM events
             WHERE id = ?`,
            [id]
        );

        if (rows.length === 0) {
            return res.status(404).json({ error: 'Event not found' });
        }

        const event = rows[0];
        const baseUrl = `${req.protocol}://${req.get('host')}`;

        const eventWithUrl = {
            ...event,
            imageUrl: event.fileName
                ? `${baseUrl}/uploads/events/${event.fileName}`
                : `${baseUrl}/uploads/events/default.png`
        };

        res.json(eventWithUrl);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database error' });
    }
});

//Get Reviews by book id
app.get('/api/reviews', async (req, res) => {
    try {
        const [reviews] = await pool.query(
            `SELECT id, bookId, comment, rating, reviewerName
                FROM reviews`
        );
        res.json(reviews);
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
