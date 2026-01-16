import React, { useState } from 'react';
import Layout from './Pages/Layout';
import Home from './Pages/Home';
import About from './Pages/About';

function App() {
    const [currentPage, setCurrentPage] = useState('home');

    let pageContent;
    if (currentPage === 'home') pageContent = <Home />;
    else if (currentPage === 'about') pageContent = <About />;

    return (
        <Layout onNavigate={setCurrentPage}>
            {pageContent}
        </Layout>
    );
}

export default App;
