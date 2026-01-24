import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "../StyleSheets/EventPage.css";

function EventPage() {
    const { id } = useParams();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [interested, setInterested] = useState(false);

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/api/events/${id}`)
            .then((res) => {
                setEvent(res.data);
                setLoading(false);

                // Check if event is already in "interested" list (like a cart)
                const interestedEvents = JSON.parse(localStorage.getItem("interestedEvents")) || [];
                const alreadyInterested = interestedEvents.find((e) => e.id === res.data.id);
                setInterested(!!alreadyInterested);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }, [id]);

    const markInterested = () => {
        const interestedEvents = JSON.parse(localStorage.getItem("interestedEvents")) || [];

        // Prevent duplicates
        const alreadyInterested = interestedEvents.find((e) => e.id === event.id);
        if (alreadyInterested) return;

        interestedEvents.push({
            id: event.id,
            name: event.name,
            date: event.date,
            imageUrl: event.imageUrl,
            description: event.description
        });

        localStorage.setItem("interestedEvents", JSON.stringify(interestedEvents));
        setInterested(true);
    };

    if (loading) return <p>Loading event...</p>;
    if (!event) return <p>Event not found</p>;

    return (
        <div className="event-page">
            <div className="event-card">
                <img src={event.imageUrl} alt={event.name} className="event-image" />

                <div className="event-details">
                    <h1 className="event-title">{event.name}</h1>

                    <p className="event-meta">
                        <span>{new Date(event.date).toLocaleDateString()}</span>
                        {event.location && (
                            <>
                                <span> | </span>
                                <span>{event.location}</span>
                            </>
                        )}
                    </p>

                    <p className="event-description">{event.description}</p>

                    

                    
                </div>
            </div>
        </div>
    );
}

export default EventPage;
