import React from 'react';
import './EventCardGrid.css';

const EventCardGrid = () => {
  const events = Array.from({ length: 12 }).map((_, i) => ({
    id: i,
    image: 'https://via.placeholder.com/150',
    title: `Event ${i + 1}`,
  }));

  return (
    <div className="event-card-grid">
      {events.map((event) => (
        <div key={event.id} className="event-card">
          <img src={event.image} alt={event.title} />
          <p>{event.title}</p>
        </div>
      ))}
    </div>
  );
};

export default EventCardGrid;
