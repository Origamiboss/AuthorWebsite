import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function NewsletterPage() {
    const [events, setEvents] = useState([]);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");

    //News letter states
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    // Fetch events
    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/api/events`)
            .then((res) => setEvents(res.data))
            .catch((err) => console.error(err));
    }, []);

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const days = useMemo(() => {
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const arr = Array(firstDay).fill(null);
        for (let d = 1; d <= daysInMonth; d++) arr.push(d);
        return arr;
    }, [year, month]);

    const goPrevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
    const goNextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

    const eventsByDate = useMemo(() => {
        const map = {};
        events.forEach((event) => {
            const dateOnly = event.date.split("T")[0];
            if (!map[dateOnly]) map[dateOnly] = [];
            map[dateOnly].push(event);
        });
        return map;
    }, [events]);

    const eventsForDay = (day) => {
        if (!day) return [];
        const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(
            day
        ).padStart(2, "0")}`;
        return eventsByDate[dateStr] || [];
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        setLoading(true);

        try {
            const res = await axios.post(
                `${process.env.REACT_APP_API_URL}/api/newsletter`,
                { email, name }
            );

            setSuccess("A comfirmation email has been sent to your inbox!");
            setEmail("");
            setName("");
        } catch (err) {
            console.error(err);

            if (err.response) {
                // Server responded with a status code outside 2xx
                setError(err.response.data.message || "Subscription failed.");
            } else if (err.request) {
                // No response received
                setError("Server not responding. Try again later.");
            } else {
                // Something else happened
                setError("An unexpected error occurred.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-bg flex justify-center items-start p-6 md:p-10">
            <div className="w-full max-w-3xl bg-sandstone rounded-xl shadow-md p-6 md:p-8">

                {/* Calendar Header */}
                <div className="flex justify-between items-center mb-6">
                    <button
                        onClick={goPrevMonth}
                        className="bg-link text-white px-3 py-2 rounded-md hover:bg-link-hover transition-colors"
                    >
                        &lt;
                    </button>
                    <h1 className="text-2xl font-semibold">
                        {currentDate.toLocaleString("default", { month: "long", year: "numeric" })}
                    </h1>
                    <button
                        onClick={goNextMonth}
                        className="bg-link text-white px-3 py-2 rounded-md hover:bg-link-hover transition-colors"
                    >
                        &gt;
                    </button>
                </div>

                {/* Weekdays */}
                <div className="grid grid-cols-7 text-center font-bold text-header mb-2">
                    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                        <div key={day}>{day}</div>
                    ))}
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-2">
                    {days.map((day, index) => (
                        <div
                            key={index}
                            className={`h-28 p-2 rounded-md ${day ? "bg-bg border border-gray-300 cursor-pointer hover:bg-toolbar-soft" : ""}`}
                        >
                            {day && (
                                <>
                                    <span className="font-bold">{day}</span>
                                    <div className="mt-1 flex flex-col gap-1">
                                        {eventsForDay(day).map((event) => (
                                            <div key={event.id} className="text-sm text-link hover:underline">
                                                <Link to={`/events/${event.id}`}>{event.name}</Link>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>
                    ))}
                </div>

                {/* Newsletter Form */}
                <div className="mt-8 bg-viridiam rounded-2xl shadow-lg p-6 md:p-8 max-w-md mx-auto">
                    {error && (
                        <div className="bg-red-100 text-red-700 px-4 py-2 rounded-lg text-sm">
                            {error}
                        </div>
                    )}

                    {success && (
                        <div className="bg-green-100 text-green-700 px-4 py-2 rounded-lg text-sm">
                            {success}
                        </div>
                    )}
                    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="First Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary-soft transition"
                        />
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary-soft transition"
                        />
                        <button
                            type="submit"
                            className="mt-2 px-4 py-2 bg-link text-white font-semibold rounded-full shadow-md hover:bg-link-hover hover:shadow-lg transition transform active:translate-y-0"
                        >
                            Subscribe
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
