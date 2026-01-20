import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './Pages/Layout';
import Home from './Pages/Home';
import About from './Pages/About';
import Book from './Pages/Book';
import Cart from './Pages/Cart';
import Checkout from './Pages/Checkout';

function App() {
    return (
        <Layout>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/books/:id" element={<Book />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="*" element={<h2>Page Not Found</h2>} />
            </Routes>
        </Layout>
    );
}

export default App;
