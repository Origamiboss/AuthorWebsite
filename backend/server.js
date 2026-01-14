require('dotenv').config();
const express = require('express');
// const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const PORT = process.env.PORT || 5000;

const app = express();

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json());

// Serve uploads folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Temporary /api/slide route
app.get('/api/slides', (req, res) => {
    const slides = [
        {
            id: 1,
            title: 'Guy',
            imageUrl: `http://localhost:${PORT}/uploads/slides/guy.png`
        },
        {
            id: 2,
            title: 'Money',
            imageUrl: `http://localhost:${PORT}/uploads/slides/money.png`
        },
        {
            id: 3,
            title: 'Stocks',
            imageUrl: `http://localhost:${PORT}/uploads/slides/stock.png`
        }
    ];
    res.json(slides);
});
// Temporary /api/books route
app.get('/api/books', (req, res) => {
    const books = [
        {
            id: 1,
            title: 'Death Row',
            description: 'Talia Kemper is on death row for murdering her husband. \
            She had an alibi and no known motive, yet Talia’s unwavering protestations of innocence have always been ignored.Then one day in the visiting area, she sees a recognizable stranger she’s certain is her husband.\
            It turns out the man she’s been convicted of killing may not be dead after all.But as the days tick away toward Talia’s execution, what will it take for her to be believed?', 
            cost: 19.99,
            imageUrl: `http://localhost:${PORT}/uploads/books/book1.jpg`
        },
        {
            id: 2,
            title: 'Not Our Daughter: A Thriller',
            description: 'Thirteen years ago, Cole and Lisa Shipley were fostering an infant with hopes of adopting her. \
            Overnight everything was turned upside down, when the child’s mother bled to death on their front doorstep. Her last words: He’s coming here…for her! Save her. \
            Afraid, bewildered, and with a baby in their arms, they fled. The longer they hid, the guiltier they looked.',
            cost: 19.99,
            imageUrl: `http://localhost:${PORT}/uploads/books/book2.jpg`
        }
    ];
    res.json(books);
});

// Root route
app.get('/', (req, res) => {
    res.send('API Running');
});

// Start server
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
