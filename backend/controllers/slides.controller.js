import { pool } from '../utils/db.js';

export async function getActiveSlides(req, res) {
    try {
        const [slides] = await pool.query(`
      SELECT *
      FROM slides
      WHERE is_active = 1
      ORDER BY slide_order ASC
    `);

        const baseUrl = `${req.protocol}://${req.get('host')}`;

        const slidesWithUrls = slides.map(slide => ({
            ...slide,
            imageUrl: slide.coverImage
                ? `${baseUrl}/uploads/slides/${slide.coverImage}`
                : `${baseUrl}/uploads/slides/default.png`
        }));

        res.json(slidesWithUrls);

    } catch (err) {
        console.error('Error fetching slides:', err);
        res.status(500).json({ error: 'Failed to fetch slides' });
    }
}
