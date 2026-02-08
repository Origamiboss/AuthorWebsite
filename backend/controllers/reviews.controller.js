import { pool } from '../utils/db.js';

export async function getReviews(req, res) {
  const { bookId } = req.query;

  try {
    let query = `
      SELECT id, bookId, comment, rating, reviewerName
      FROM reviews
    `;
    const params = [];

    // Optional filter by book ID
    if (bookId) {
      query += ' WHERE bookId = ?';
      params.push(bookId);
    }

    const [reviews] = await pool.query(query, params);

    res.json(reviews);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
}
