import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../StyleSheets/Book.css';

function Book() {
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [inCart, setInCart] = useState(false);
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/books/${id}`)
            .then(res => {
                setBook(res.data);
                setLoading(false);

                // Check if book is already in cart
                const cart = JSON.parse(localStorage.getItem('cart')) || [];
                const alreadyInCart = cart.find(item => item.id === res.data.id);
                setInCart(!!alreadyInCart);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [id]);

    const addToCart = () => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];

        // Prevent duplicates
        const alreadyInCart = cart.find(item => item.id === book.id);
        if (alreadyInCart) return;

        cart.push({
            id: book.id,
            title: book.title,
            price: book.cost,
            coverImage: book.coverImage,
            quantity: 1
        });

        localStorage.setItem('cart', JSON.stringify(cart));
        setInCart(true);
    };

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
                        <span>{book.genre}</span>
                        <span> | </span>
                        <span>{book.publishedYear}</span>
                    </p>
                    <p className="book-price">${book.cost.toFixed(2)}</p>

                    <p className="book-description">
                        {book.description}
                    </p>

                    <button
                        className="add-to-cart"
                        onClick={addToCart}
                        disabled={inCart} // disable if already in cart
                    >
                        {inCart ? 'In Cart' : 'Add to Cart'}
                    </button>
                    {inCart && (
                        <Link to="/cart" className="view-cart">
                            View Cart
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Book;
