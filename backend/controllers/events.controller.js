import { pool } from '../utils/db.js';

export async function getAllEvents(req, res) {
    try {
        const [events] = await pool.query(`
      SELECT id, name, description, date, fileName
      FROM events
    `);

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
}

export async function getEventById(req, res) {
    const { id } = req.params;

    try {
        const [rows] = await pool.query(`
      SELECT id, name, description, date, fileName
      FROM events
      WHERE id = ?
    `, [id]);

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
}
