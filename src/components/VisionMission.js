import React from 'react';

const VisionMission = () => {
  return (
    <section id="more" style={styles.section}>
      <h2 style={styles.title}>Visión y Misión</h2>
      <div style={styles.content}>
        <div style={styles.block}>
          <h3 style={styles.subtitle}>Visión</h3>
          <p style={styles.text}>
            Ser un referente educativo en la formación integral de niños felices, creativos y responsables, promoviendo valores y habilidades para la vida.
          </p>
        </div>
        <div style={styles.block}>
          <h3 style={styles.subtitle}>Misión</h3>
          <p style={styles.text}>
            Brindar un ambiente seguro y estimulante donde los niños puedan aprender, explorar y desarrollarse plenamente, apoyados por un equipo comprometido y profesional.
          </p>
        </div>
      </div>
    </section>
  );
};

const styles = {
  section: {
    backgroundColor: '#e6f0ff',
    padding: '40px 20px',
    textAlign: 'center',
  },
  title: {
    color: '#004080',
    fontFamily: "'Poppins', sans-serif",
    fontSize: '2rem',
    marginBottom: '30px',
  },
  content: {
    display: 'flex',
    justifyContent: 'center',
    gap: '60px',
    flexWrap: 'wrap',
  },
  block: {
    maxWidth: '400px',
    textAlign: 'left',
  },
  subtitle: {
    color: '#0073e6',
    fontSize: '1.5rem',
    marginBottom: '10px',
  },
  text: {
    fontSize: '1.1rem',
    lineHeight: '1.6',
    color: '#003366',
  },
};

export default VisionMission;
