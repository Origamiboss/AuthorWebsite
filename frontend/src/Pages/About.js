import React from 'react';
import '../StyleSheets/About.css';

function About() {
    return (
        <div>
            <div className="author-name">
                <h1>Author Mckauthorton</h1>
            </div>
            <div className="author-information">
                <img src="/Author.png" alt="Author Mckauthorton"/>
                <p>I was once a lad from Timberlan</p>
                <p>Contact Information</p>
            </div>
            <div className="author-links">
                <a href="Facebook URL" target="_blank" rel="noopener noreferrer">Facebook</a>
            </div>
        </div>
    );
}
export default About;