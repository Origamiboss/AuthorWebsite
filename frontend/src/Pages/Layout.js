import React from 'react';
import { Link } from 'react-router-dom';
import '../StyleSheets/Layout.css';

function Layout({ children }) {
    return (
        <div className="layout">
            <header className="header">
                <div className="banner">
                    
                    <h3>
                        <span>Kimberly </span> 
                        <span>Climer</span>
                    </h3>
                    
                    <h3>Author</h3>
                </div>
                <nav className="toolbar">
                    <Link to="/">Home</Link>
                    <Link to="/books">Books</Link>
                    <Link to="/about">About</Link>
                    <Link to='/newsletter'>Newsletter</Link>
                    <Link>Bonus Content</Link>
                    <Link>Book Club Kits</Link>
                    <Link>Contact</Link>
                    <Link to="/cart">Cart</Link>
                </nav>
            </header>

            <main className="main">
                {children}
            </main>

            <footer>
                <p>2026 My Website</p>
                <h3>Kimberly Climer</h3>
                <h4>Author</h4>
            </footer>
        </div>
    );
}

export default Layout;
