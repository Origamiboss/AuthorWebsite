import React from 'react';
import { Link } from 'react-router-dom';
import '../StyleSheets/Layout.css';

function Layout({ children }) {
    return (
        <div className="layout">
            <header className="header">
                <h1 className="banner">Author Page</h1>
                <nav className="toolbar">
                    <Link to="/">Home</Link>
                    <Link to="/about">About</Link>
                </nav>
            </header>

            <main className="main">
                {children}
            </main>

            <footer>
                <p>2026 My Website</p>
            </footer>
        </div>
    );
}

export default Layout;
