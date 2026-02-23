import React from 'react';
import { Link } from 'react-router-dom';

function Layout({ children }) {
    const navLinks = [
        ["Home", "/"],
        ["Books", "/books"],
        ["About", "/about"],
        ["Newsletter", "/newsletter"],
        ["Bonus Content", "/bonus_content"],
        //["Book Club Kits", "/book_club_kits"],
        ["Contact", "/contact"],
        ["Cart", "/cart"],
    ];

    return (
        <div className="min-h-screen flex flex-col bg-bg"> {/* use bg-bg from tailwind.config.js */}

            {/* Header */}
            <header className="flex flex-col">

                {/* Banner */}
                <div className="w-full h-80 bg-viridiam bg-cover bg-center flex flex-col justify-center">
                    <h3 className="text-sandstone text-6xl text-center drop-shadow-md">
                        <span>Kimberly </span>
                        <span>Climer</span>
                    </h3>
                    <h3 className="text-purple text-5xl text-center drop-shadow-md">
                        Author
                    </h3>
                </div>

                {/* Toolbar */}
                <nav className="w-full h-16 bg-toolbar flex items-center justify-center">
                    {navLinks.map(([label, path], index) => (
                        <Link
                            key={label}
                            to={path}
                            className="relative mx-4 px-3 py-2 text-purple text-lg font-bold rounded hover:bg-toolbar-hover"
                        >
                            {label}
                            {index < navLinks.length - 1 && (
                                <span className="absolute -right-4 top-1/2 -translate-y-1/2 h-3/5 w-[2px] bg-black" />
                            )}
                        </Link>
                    ))}
                </nav>
            </header>

            {/* Main content */}
            <main className="flex-1">
                {children}
            </main>

            {/* Footer */}
            <footer className="bg-heather text-white text-center border-t border-white/10 px-6 py-10">
                <p className="text-base tracking-wider m-0">2026 My Website</p>
                <h3 className="text-6xl font-semibold mt-2 mb-0">Kimberly Climer</h3>
                <h4 className="text-2xl font-normal text-red-500 m-0">Author</h4>
            </footer>

        </div>
    );
}

export default Layout;
