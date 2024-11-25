import React, { useState, useEffect } from 'react';
import './EventCarousel.css';

// Import images from the /images folder
import event1 from '../images/festivalchr.jpg';
import event2 from '../images/Halloween.jpg';
import event3 from '../images/winterfest.jpg';
import event4 from '../images/weekend-events-2.png';

const EventCarousel = () => {
  const images = [
    event1,
    event2,
    event3,
    event4
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(intervalId); // Clear the interval when the component unmounts
  }, []);

  const handleDotClick = (index) => {
    setCurrentIndex(index); // Change to the clicked dot's corresponding image
  };

  return (
    <div className="carousel">
      <div className="carousel-images">
        <img
          src={images[currentIndex]}
          alt={`Event ${currentIndex + 1}`}
          className="carousel-image"
        />
      </div>
      <div className="carousel-dots">
        {images.map((_, index) => (
          <span
            key={index}
            className={`dot ${currentIndex === index ? 'active' : ''}`}
            onClick={() => handleDotClick(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default EventCarousel;