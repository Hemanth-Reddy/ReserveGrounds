import React, { useState, useEffect } from 'react';
import './Carousel.css'; // Import the CSS file

const ImageCarousel = () => {
  const images = [
    '/images/cricket1.PNG',  // Relative path from the public directory
    '/images/Gym1.PNG',
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Function to show the next image
  const showNextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  // Set interval to automatically switch images every 3 seconds
  useEffect(() => {
    const intervalId = setInterval(showNextImage, 3000);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="carousel-container">
      <div className="carousel-slide" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`carousel-image-${index}`}
            className="carousel-image"
          />
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;
