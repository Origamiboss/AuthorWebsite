import crypto from 'crypto';
import { pool } from '../utils/db.js';
import { sendVerificationEmail } from '../services/email.service.js';

export async function subscribe(req, res) {
    const { email, name } = req.body;
    if (!email) return res.status(400).json({ error: 'Email required' });

    const token = crypto.randomBytes(32).toString('hex');
    const expires = new Date(Date.now() + 60 * 60 * 1000);

    try {
        await pool.query(`
      INSERT INTO newsletter (email, name, confirmed, confirmation_token, token_expires)
      VALUES (?, ?, false, ?, ?)
    `, [email, name, token, expires]);

        console.log('Sending email to:', email, 'with token:', token);
        await sendVerificationEmail(email, token);


        res.json({ message: 'Check your email to confirm subscription' });
    } catch (err) {
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ error: 'Email already subscribed' });
        }
        console.error(err);
        res.status(500).json({ error: 'Subscription failed' });
    }
}

export async function confirmSubscription(req, res) {
    const { token } = req.query;
    if (!token) return res.status(400).send('Invalid token');

    const [result] = await pool.query(`
    UPDATE newsletter
    SET confirmed = true,
        confirmation_token = NULL,
        token_expires = NULL
    WHERE confirmation_token = ?
      AND token_expires > NOW()
  `, [token]);

    if (result.affectedRows === 0) {
        return res.status(400).send('Invalid or expired token');
    }

    res.send('Newsletter subscription confirmed!');
}
