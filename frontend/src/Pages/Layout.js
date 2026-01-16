import React from 'react';
import '../StyleSheets/Layout.css';

function Layout({ children, onNavigate }) {
    return (
        <div className="layout">
            <header className="header">
                <h1 className="banner">Author Page</h1>
                <nav className="toolbar">
                    <a href="#" onClick={() => onNavigate('home')}>Home</a>
                    <a href="#" onClick={() => onNavigate('about')}>About</a>
                </nav>
            </header>

            <main className="main">
                {children} {
                    /* This is where the page content goes */
                }
            </main>

            <footer>
                <p>2026 My Website</p>
            </footer>
        </div>
    );
}

export default Layout;
