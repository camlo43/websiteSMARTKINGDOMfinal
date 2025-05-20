import React from 'react';

const Map = () => {
  return (
    <section id="location" style={styles.section}>
      <h2 style={styles.title}>Ubicación</h2>
      <div style={styles.mapContainer}>
        <iframe
          title="Smart Kingdom Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.034849927927!2d-74.8057132!3d10.9889531!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8ef42d511b62dc31%3A0x34a65ebd35a5847a!2sSmart%20Kingdom!5e0!3m2!1sen!2sco!4v1687000000000!5m2!1sen!2sco"
          width="100%"
          height="400"
          style={{ border: 0, borderRadius: '10px' }}
          allowFullScreen=""
          loading="lazy"
        />
      </div>
    </section>
  );
};

const styles = {
  section: {
    backgroundColor: '#ffffff',
    padding: '40px 20px',
    textAlign: 'center',
  },
  title: {
    color: '#004080',
    fontFamily: "'Montserrat', sans-serif",
    fontSize: '2rem',
    marginBottom: '20px',
  },
  mapContainer: {
    maxWidth: '800px',
    margin: '0 auto',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
};

export default Map;
