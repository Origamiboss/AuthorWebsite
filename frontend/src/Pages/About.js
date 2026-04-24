import React from 'react';

function About() {
    return (
        <div className="px-4 md:px-0">

            {/* Author Name */}
            <div className="text-center my-10">
                <h1 className="text-4xl font-bold text-candy">Author Mckauthorton</h1>
            </div>

            {/* Author Information */}
            <div className="flex flex-col items-center gap-3 max-w-xl mx-auto p-5 bg-sandstone rounded-xl shadow-md">
                <img
                    src="/Author.png"
                    alt="Author Mckauthorton"
                    className="w-44 h-44 object-cover rounded-full border-4 border-azur"
                />
                <p className="text-center text-base text-text m-0">I was once a lad from Timberlan</p>
                <p className="text-center text-base text-text m-0">Contact Information</p>
            </div>

            {/* Author Links */}
            <div className="text-center my-8">
                <a
                    href="Facebook URL"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-4 py-2 bg-link text-white font-bold rounded-md hover:bg-link-hover transition-colors"
                >
                    Facebook
                </a>
            </div>
        </div>
    );
}

export default About;
