import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../StyleSheets/Books.css';

function Books() {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/books`);
            setBooks(res.data);
        } catch (err) {
            console.error('Failed to fetch products', err);
        }
    };



    return (
        <div className="store-page">
            <h1>Book Store</h1>

            <div className="store-grid">
                {books.map(product => (
                    <div className="store-card" key={product.id}>
                        <img
                            src={product.coverImage}
                            alt={product.title}
                            className="store-image"
                        />

                        <h2>{product.title}</h2>
                        <h3>{product.genre}</h3>
                        <p className="store-price">${product.cost?.toFixed(2) ?? '19.99'}</p>

                        <Link
                            key={product.id}
                            to={`/books/${product.id}`}
                            className="store-button"
                        >
                            View Details
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Books;