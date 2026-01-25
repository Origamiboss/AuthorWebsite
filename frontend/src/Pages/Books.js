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
        <section className="store">
            <header className="store-header">
                <h1>Books</h1>
                <p>Discover stories by Kimberly Climer</p>
            </header>

            <div className="store-grid">
                {books.map(book => (
                    <article className="store-card" key={book.id}>

                        {/* Image */}
                        <div className="store-image-wrapper">
                            <img
                                src={book.coverImage}
                                alt={book.title}
                                className="store-image"
                                loading="lazy"
                            />
                        </div>

                        {/* Content */}
                        <div className="store-content">
                            <h2 className="store-title">{book.title}</h2>
                            <h3 className="store-genre">{book.genre}</h3>

                            <p className="store-description">
                                {book.description}
                            </p>

                            <p className="store-price">
                                ${book.cost?.toFixed(2) ?? '19.99'}
                            </p>
                        </div>

                        {/* Action */}
                        <Link
                            to={`/books/${book.id}`}
                            className="store-button"
                        >
                            View Details
                        </Link>
                    </article>
                ))}
            </div>
        </section>
    );
}

export default Books;