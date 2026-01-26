import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Home() {
    const [books, setBooks] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    // Fetch books and reviews
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/books`)
            .then(res => setBooks(res.data))
            .catch(err => console.error(err));

        axios.get(`${process.env.REACT_APP_API_URL}/api/reviews`)
            .then(res => setReviews(res.data))
            .catch(err => console.error(err));
    }, []);

    const nextSlide = () => setCurrentIndex((currentIndex + 1) % books.length);
    const prevSlide = () => setCurrentIndex((currentIndex - 1 + books.length) % books.length);

    const currentBook = books[currentIndex];
    const filteredReviews = currentBook
        ? reviews.filter(r => r.bookId === currentBook.id)
        : [];

    return (
        <div className="flex flex-col">

            {/* Slideshow */}
            {books.length > 0 && (
                <div className="relative w-full h-[500px] flex justify-center items-center overflow-hidden mb-16">
                    <img
                        src={books[currentIndex].coverImage}
                        alt={books[currentIndex].title}
                        className="max-w-full max-h-full object-cover transition-opacity duration-500"
                    />
                    <span
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-secondary text-text p-2 rounded-full cursor-pointer select-none hover:bg-secondary-soft"
                        onClick={prevSlide}
                    >
                        &#10094;
                    </span>
                    <span
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-secondary text-text p-2 rounded-full cursor-pointer select-none hover:bg-secondary-soft"
                        onClick={nextSlide}
                    >
                        &#10095;
                    </span>
                </div>
            )}

            {/* Reviews */}
            <div className="bg-secondary py-12 flex flex-wrap justify-center gap-8">
                {filteredReviews.length > 0 ? (
                    filteredReviews.map(review => (
                        <div
                            key={review.id}
                            className="flex flex-col items-center text-center p-6 h-[260px] shadow-md bg-white rounded-md"
                        >
                            <h4 className="text-2xl md:text-3xl lg:text-4xl italic line-clamp-3">
                                "{review.comment}"
                            </h4>
                            <h5 className="text-xl md:text-2xl text-text mt-2 mb-4">
                                -{review.reviewerName}
                            </h5>
                            <p className="text-xl md:text-2xl text-text">
                                {review.rating} / 10
                            </p>
                        </div>
                    ))
                ) : (
                    <p className="text-text text-lg">No reviews for this book yet.</p>
                )}
            </div>

            {/* Newsletter */}
            <div className="my-16 mx-auto px-8 py-10 bg-triary rounded-2xl text-center shadow-lg max-w-3xl">
                <p className="text-text text-lg md:text-xl mb-8 leading-relaxed">
                    Join my newsletter and get all the latest updates on upcoming books and events right in your inbox!
                </p>
                <Link
                    to="/newsletter"
                    className="inline-block px-6 py-3 bg-link text-text font-medium text-lg rounded-full shadow-md hover:bg-link-hover transform hover:-translate-y-1 transition-all duration-200"
                >
                    Subscribe Now
                </Link>
            </div>

        </div>
    );
}

export default Home;
