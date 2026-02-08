import { pool } from '../utils/db.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function getAllBooks(req, res) {
    try {
        const [books] = await pool.query(`
      SELECT id, title, genre, description, fileName
      FROM books
    `);

        if (books.length === 0) {
            return res.json([]);
        }

        const baseUrl = `${req.protocol}://${req.get('host')}`;
        const uploadDir = path.join(__dirname, '../uploads/books');

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
                        // fallback to default
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
}

export async function getBookById(req, res) {
    const bookId = Number(req.params.id);

    if (!Number.isInteger(bookId)) {
        return res.status(400).json({ error: 'Invalid book ID' });
    }

    try {
        const [rows] = await pool.query(`
      SELECT id, title, genre, publishedYear, description, cost, fileName
      FROM books
      WHERE id = ?
    `, [bookId]);

        if (rows.length === 0) {
            return res.status(404).json({ error: 'Book not found' });
        }

        const book = rows[0];
        const baseUrl = `${req.protocol}://${req.get('host')}`;

        const uploadDir = path.join(__dirname, '../uploads/books');
        const filePath = book.fileName
            ? path.join(uploadDir, book.fileName)
            : null;

        let coverImage = `${baseUrl}/uploads/books/default.jpg`;

        if (filePath) {
            try {
                await fs.promises.access(filePath, fs.constants.F_OK);
                coverImage = `${baseUrl}/uploads/books/${book.fileName}`;
            } catch {
                // fallback to default
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
}
