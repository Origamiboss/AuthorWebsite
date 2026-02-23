import React, { useState } from "react";
import axios from "axios";

function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    });

    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(null);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus(null);

        try {
            await axios.post("/api/contact", formData);
            setStatus("success");
            setFormData({ name: "", email: "", message: "" });
        } catch (err) {
            setStatus("error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-bg p-6">
            <div className="w-full max-w-2xl bg-white shadow-lg rounded-2xl p-8">
                <h1 className="text-4xl font-bold mb-4 text-center">Contact Us</h1>
                <p className="text-center text-gray-600 mb-6">
                    Have questions? Send us a message and we’ll get back to you.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Your Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <textarea
                        name="message"
                        placeholder="Your Message"
                        rows="5"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                    >
                        {loading ? "Sending..." : "Send Message"}
                    </button>
                </form>

                {status === "success" && (
                    <p className="text-green-600 mt-4 text-center">
                        Message sent successfully!
                    </p>
                )}

                {status === "error" && (
                    <p className="text-red-600 mt-4 text-center">
                        Something went wrong. Please try again.
                    </p>
                )}

                <div className="mt-8 text-center text-gray-600">
                    <p>Or email us directly at:</p>
                    <p className="font-semibold">whatever@gmail.com</p>
                </div>
            </div>
        </div>
    );
}

export default Contact;