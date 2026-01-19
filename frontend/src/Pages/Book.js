import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../StyleSheets/Book.css';

function Book() {
    const { id } = useParams();      // book ID from URL
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/books/${id}`)
            .then(res => {
                setBook(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [id]);

    if (loading) return <p>Loading book...</p>;
    if (!book) return <p>Book not found</p>;

    return (
        <div className="book-page">
            <div className="book-card">
                <img
                    src={book.coverImage}
                    alt={book.title}
                    className="book-cover"
                />

                <div className="book-details">
                    <h1 className="book-title">{book.title}</h1>

                    <p className="book-meta">
                        <span>{book.genre}</span> •{" "}
                        <span>{book.publishedYear}</span>
                    </p>

                    <p className="book-description">
                        {book.description}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Book;
