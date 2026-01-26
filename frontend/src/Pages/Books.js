import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Books() {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/books`);
                setBooks(res.data);
            } catch (err) {
                console.error('Failed to fetch products', err);
            }
        };
        fetchProducts();
    }, []);

    return (
        <section className="flex flex-col">

            {/* Header */}
            <header className="bg-secondary h-40 flex flex-col justify-center items-center mb-12">
                <h1 className="text-3xl md:text-4xl lg:text-[2.6rem] font-bold mb-2">Books</h1>
                <p className="text-text text-lg md:text-xl">Discover stories by Kimberly Climer</p>
            </header>

            {/* Grid */}
            <div className="flex flex-col gap-10 max-w-[1200px] mx-auto px-4">
                {books.map(book => (
                    <article
                        key={book.id}
                        className="flex flex-col md:flex-row gap-6 p-6 bg-triary rounded-2xl shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-200 min-h-[300px]"
                    >
                        {/* Image - all same size */}
                        <div className="flex-shrink-0 w-40 h-60 md:w-[200px] md:h-[300px] overflow-hidden rounded-lg">
                            <img
                                src={book.coverImage}
                                alt={book.title}
                                className="w-full h-full object-cover"
                                loading="lazy"
                            />
                        </div>

                        {/* Content */}
                        <div className="flex flex-col flex-1">
                            <h2 className="text-2xl font-semibold text-header mb-1">{book.title}</h2>
                            <h3 className="text-muted text-lg mb-2">{book.genre}</h3>
                            <p className="text-text text-base mb-3 line-clamp-4">{book.description}</p>
                            <p className="font-semibold text-lg mb-4">${book.cost?.toFixed(2) ?? '19.99'}</p>

                            {/* Button */}
                            <Link
                                to={`/books/${book.id}`}
                                className="inline-flex items-center justify-center px-6 py-3 bg-link text-white font-semibold rounded-full shadow-md hover:bg-link-hover hover:-translate-y-1 transition-all duration-200"
                            >
                                View Details
                            </Link>
                        </div>
                    </article>

                ))}
            </div>
        </section>
    );
}

export default Books;
