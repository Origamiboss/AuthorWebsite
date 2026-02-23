import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios';

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
        if (cart.find(item => item.id === book.id)) return;

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

    if (loading) return <p className="text-center text-lg text-text">Loading book...</p>;
    if (!book) return <p className="text-center text-lg text-text">Book not found</p>;

    return (
        <div className="min-h-screen bg-bg flex justify-center p-6 md:p-10">
            <div className="flex flex-col md:flex-row bg-sandstone rounded-xl shadow-md overflow-hidden max-w-3xl w-full">
                {/* Book Cover */}
                <div className="md:w-1/3 h-auto md:h-auto">
                    <img
                        src={book.coverImage}
                        alt={book.title}
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Book Details */}
                <div className="flex-1 flex flex-col justify-between p-6 md:p-8">
                    <h1 className="text-2xl md:text-3xl font-bold text-header">{book.title}</h1>
                    <p className="text-muted mb-4">{book.genre} | {book.publishedYear}</p>
                    <p className="text-text mb-4">{book.description}</p>
                    <p className="text-header font-bold text-lg mb-4">${book.cost.toFixed(2)}</p>

                    <button
                        onClick={addToCart}
                        disabled={inCart}
                        className={`px-4 py-2 rounded-md font-semibold text-white transition ${inCart ? "bg-azur cursor-not-allowed" : "bg-link hover:bg-link-hover"
                            }`}
                    >
                        {inCart ? "In Cart" : "Add to Cart"}
                    </button>

                    {inCart && (
                        <Link
                            to="/cart"
                            className="inline-block mt-2 px-4 py-2 bg-link text-white rounded-md hover:bg-link-hover transition"
                        >
                            View Cart
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Book;
