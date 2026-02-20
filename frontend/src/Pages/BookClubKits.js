import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
function BookClubKits() {
    return (
        <div className="min-h-screen flex justify-center items-center bg-bg p-6">
            <div className="max-w-3xl text-center">
                <h1 className="text-4xl font-bold mb-4">Book Club Kits</h1>
                <p className="text-lg text-text mb-6">Welcome to the Book Club Kits page! Here you can find everything you need to host a successful book club meeting, including discussion questions, author insights, and exclusive content related to our books. Whether you're a seasoned book club organizer or just starting out, our kits are designed to enhance your reading experience and spark engaging conversations. Stay tuned for updates and new kits added regularly!</p>
            </div>
        </div>
    )
} export default BookClubKits;