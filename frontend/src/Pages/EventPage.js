import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

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

    if (loading) return <p className="text-center mt-20 text-lg text-text">Loading event...</p>;
    if (!event) return <p className="text-center mt-20 text-lg text-text">Event not found</p>;

    return (
        <div className="min-h-screen flex justify-center items-start bg-bg p-6 md:p-10">
            <div className="w-full max-w-3xl bg-triary rounded-xl shadow-lg overflow-hidden flex flex-col">
                {/* Event Image */}
                <img
                    src={event.imageUrl}
                    alt={event.name}
                    className="w-full h-80 md:h-96 object-cover bg-secondary"
                />

                {/* Event Details */}
                <div className="p-6 md:p-8 flex flex-col gap-4">
                    <h1 className="text-2xl md:text-3xl font-semibold text-header">{event.name}</h1>

                    <p className="text-muted text-sm md:text-base">
                        <span>{new Date(event.date).toLocaleDateString()}</span>
                        {event.location && (
                            <>
                                <span> | </span>
                                <span>{event.location}</span>
                            </>
                        )}
                    </p>

                    <p className="text-text text-base md:text-lg leading-relaxed">{event.description}</p>

                    {/* Interested Button */}
                    <button
                        onClick={markInterested}
                        disabled={interested}
                        className={`mt-4 px-4 py-2 rounded-md font-semibold text-white w-fit transition ${interested ? "bg-muted cursor-not-allowed" : "bg-link hover:bg-link-hover"
                            }`}
                    >
                        {interested ? "Marked Interested" : "Mark as Interested"}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default EventPage;
