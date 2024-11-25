import React from "react";
import "./EventCardGrid.css";

const EventCardGrid = ({ events, loading, city }) => {
  return (
    <div className="event-card-grid-container">
      {loading ? (
        <p>Loading events...</p>
      ) : events.length > 0 ? (
        <div className="event-card-grid">
          {events.map((event, index) => (
            <div key={index} className="event-card">
              <a href={event.url} target="_blank" rel="noopener noreferrer">
                <img
                  src={event.image_url || "https://via.placeholder.com/250x150"}
                  alt={event.name}
                  className="event-card-image"
                />
              </a>
              <div className="event-details">
                <h3>{event.name}</h3>
                <p><strong>Date:</strong> {event.date}</p>
                <p><strong>Location:</strong> {event.location}</p>
                <p>{event.description}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No events found for {city || "this location"}.</p>
      )}
    </div>
  );
};

export default EventCardGrid;
