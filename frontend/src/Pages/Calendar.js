import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../StyleSheets/Calendar.css";

export default function CalendarPage() {
    const [events, setEvents] = useState([]);
    const [currentDate, setCurrentDate] = useState(new Date());

    // Fetch events once
    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/api/events`)
            .then((res) => setEvents(res.data))
            .catch((err) => console.error(err));
    }, []);

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    // Compute days once per month
    const days = useMemo(() => {
        const firstDayOfMonth = new Date(year, month, 1);
        const lastDayOfMonth = new Date(year, month + 1, 0);

        const startDay = firstDayOfMonth.getDay(); // 0–6 (Sun–Sat)
        const daysInMonth = lastDayOfMonth.getDate();

        const arr = [];
        for (let i = 0; i < startDay; i++) arr.push(null); // padding for first week
        for (let d = 1; d <= daysInMonth; d++) arr.push(d); // actual days
        return arr;
    }, [year, month]);

    const goPrevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
    const goNextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

    // Pre-group events by date for performance
    const eventsByDate = useMemo(() => {
        const map = {};
        events.forEach((event) => {
            // Normalize date to YYYY-MM-DD
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

    return (
        <div className="calendar-page">
            <div className="calendar-container">
                <div className="calendar-header">
                    <button onClick={goPrevMonth}>&lt;</button>
                    <h1>
                        {currentDate.toLocaleString("default", {
                            month: "long",
                            year: "numeric",
                        })}
                    </h1>
                    <button onClick={goNextMonth}>&gt;</button>
                </div>

                <div className="calendar-weekdays">
                    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                        <div key={day}>{day}</div>
                    ))}
                </div>

                <div className="calendar-grid">
                    {days.map((day, index) => (
                        <div
                            key={index}
                            className={`calendar-cell ${day ? "active" : "empty"}`}
                        >
                            {day && (
                                <>
                                    <span className="calendar-day-number">{day}</span>
                                    <div className="calendar-events">
                                        {eventsForDay(day).map((event) => (
                                            <div key={event.id} className="calendar-event">
												<Link to={`/events/${event.id}`}>
                                                    <span>{event.name}</span>
                                                </Link>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
