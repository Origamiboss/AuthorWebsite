import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

// Routes
import bookRoutes from './routes/books.routes.js';
import eventRoutes from './routes/events.routes.js';
import reviewRoutes from './routes/reviews.routes.js';
import newsletterRoutes from './routes/newsletter.routes.js';
//import authRoutes from './routes/auth.routes.js';
import slideRoutes from './routes/slides.routes.js';
import paypalRoutes from './routes/paypal.routes.js';
import contactRoutes from './routes/contact.routes.js';

const app = express();

// __dirname setup for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* Global Middleware  */
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* Static Files */
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

/*  API Routes  */
app.use('/api/books', bookRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/newsletter', newsletterRoutes);
app.use('/api/contact', contactRoutes);
//app.use('/api/auth', authRoutes);
app.use('/api/slides', slideRoutes);
app.use('/api/paypal', paypalRoutes);

/* Health Check */
app.get('/api/health', (_, res) => {
    res.json({ status: 'ok' });
});

/*  React Production Build  */
if (process.env.NODE_ENV === 'production') {
    const clientBuildPath = path.join(__dirname, '../client/dist');

    app.use(express.static(clientBuildPath));

    app.get('*', (_, res) => {
        res.sendFile(path.join(clientBuildPath, 'index.html'));
    });
}

/* Global Error Handler */
app.use((err, req, res, next) => {
    console.error(err.stack);

    res.status(err.status || 500).json({
        error: err.message || 'Internal Server Error',
    });
});

export default app;
