import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../StyleSheets/Home.css'; // your slideshow CSS

function Home() {
    const [books, setBooks] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    // Fetch slides and books from backend
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/books`)
            .then(res => setBooks(res.data))
            .catch(err => console.error(err));
        axios.get(`${process.env.REACT_APP_API_URL}/api/reviews`)
            .then(res => setReviews(res.data))
            .catch(err => console.error(err));
    }, []);

    // Slideshow controls
    const nextSlide = () => {
        setCurrentIndex((currentIndex + 1) % books.length);
    };

    const prevSlide = () => {
        setCurrentIndex((currentIndex - 1 + books.length) % books.length);
    };

    const setSlide = (index) => {
        setCurrentIndex(index);
    };

    const currentBook = books[currentIndex];
    const filteredReviews = currentBook
        ? reviews.filter(r => r.bookId === currentBook.id)
        : [];

    return (
        <div>
            {/* Only render slideshow if slides exist */}
            {books.length > 0 && (
                <>
                    <div className="slideshow-container">
                        <img
                            src={books[currentIndex].coverImage}
                            alt={books[currentIndex].title}
                        />
                        <span className="prev" onClick={prevSlide}>&#10094;</span>
                        <span className="next" onClick={nextSlide}>&#10095;</span>
                    </div>

                </>
            )}

            <div className="reviews-section">
                {filteredReviews.length > 0 ? (
                    filteredReviews.map(review => (
                        <div key={review.id} className="review-card">
                            <h4>"{review.comment}"</h4>
                            <h5>-{review.reviewerName}</h5>
                            <p>{review.rating} / 10</p>
                        </div>
                    ))
                ) : (
                    <p>No reviews for this book yet.</p>
                )}
            </div>
            <div className="home-newsletter">
                <p>Join my newsletter and get all the latest updates on upcoming books and events right in your inbox!</p>
                <Link to="/newsletter" className="newsletter-button">Subscribe Now</Link>
            </div>
        </div>
    );
}

export default Home;
