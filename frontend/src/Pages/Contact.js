import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
function Contact() {
    return (
        <div className="min-h-screen flex justify-center items-center bg-bg p-6">
            <div className="max-w-3xl text-center">
                <h1 className="text-4xl font-bold mb-4">Contact</h1>
                <p className="text-lg text-text mb-6">For inquiries, please email us at whatever@gmail.com </p>
            </div>
        </div>
    )
} export default Contact;