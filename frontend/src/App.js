import React from 'react';
import { Routes, Route } from 'react-router-dom';
//import "./StyleSheets/colors.css";

import Layout from './Pages/Layout';
import Home from './Pages/Home';
import About from './Pages/About';
import Book from './Pages/Book';
import Cart from './Pages/Cart';
import Checkout from './Pages/Checkout';
import Books from './Pages/Books';
import Newsletter from './Pages/Newsletter';
import EventPage from './Pages/EventPage';
import BonusContent from './Pages/BonusContent';
import BookClubKits from './Pages/BookClubKits';
import Contact from './Pages/Contact';

function App() {
    return (
        <Layout>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/books/:id" element={<Book />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/books" element={<Books />} />
                <Route path="/newsletter" element={<Newsletter />} />
                <Route path="/events/:id" element={<EventPage />} />
                <Route path="/bonus_content" element={<BonusContent />} />
                <Route path="/book_club_kits" element={<BookClubKits />} />
                <Route path="/contact" element={<Contact />} />  
                <Route path="*" element={<h2>Page Not Found</h2>} />
            </Routes>
        </Layout>
    );
}

export default App;
