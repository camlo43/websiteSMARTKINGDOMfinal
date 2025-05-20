import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import kids1 from '../kids1.jpeg';
import kids2 from '../kids2.jpeg';
import kids3 from '../kids3.jpeg';
import kids4 from '../kids4.jpeg';
import kids5 from '../kids5.jpeg';
import kids6 from '../kids6.jpeg';
import kids7 from '../kids7.jpeg';
import kids8 from '../kids8.png';
import './PhotoCarousel.css';

const photos = [
  kids1,
  kids2,
  kids3,
  kids4,
  kids5,
  kids6,
  kids7,
  kids8,
];

const PhotoCarousel = () => {
  const [current, setCurrent] = useState(0);
  const length = photos.length;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev === length - 1 ? 0 : prev + 1));
    }, 3000);
    return () => clearInterval(timer);
  }, [length]);

  if (!Array.isArray(photos) || photos.length === 0) {
    return null;
  }

  return (
    <section id="photos" className="photoCarouselSection">
      <h2 className="photoCarouselTitle">Galería de Fotos</h2>
      <div className="carousel">
        <AnimatePresence>
          {photos.map((photo, index) =>
            index === current ? (
              <motion.img
                key={index}
                src={photo}
                alt={`Slide ${index + 1}`}
                className="carouselImage active"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.8 }}
              />
            ) : null
          )}
        </AnimatePresence>
      </div>
      <div className="dots">
        {photos.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === current ? 'activeDot' : ''}`}
            onClick={() => setCurrent(index)}
          />
        ))}
      </div>
    </section>
  );
};

export default PhotoCarousel;
