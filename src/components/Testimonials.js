import React from 'react';

const testimonials = [
  {
    id: 1,
    parent: "María G.",
    comment: "Mi hijo ha aprendido mucho y se siente feliz en Smart Kingdom.",
  },
  {
    id: 2,
    parent: "Carlos R.",
    comment: "Excelente atención y ambiente seguro para los niños.",
  },
  {
    id: 3,
    parent: "Ana P.",
    comment: "Los docentes son muy dedicados y profesionales.",
  },
];

const Testimonials = () => {
  return (
    <section id="testimonios" style={styles.section}>
      <h2 style={styles.title}>Testimonios de Padres</h2>
      <div style={styles.gallery}>
        {testimonials.map(({ id, parent, comment }) => (
          <div key={id} style={styles.card}>
            <p style={styles.comment}>"{comment}"</p>
            <p style={styles.parent}>- {parent}</p>
          </div>
        ))}
      </div>
      <section id="inscripcion" style={styles.enrollmentSection}>
        <h3 style={styles.enrollmentTitle}>
          Inscribe a tu hijo en nuestra increíble institución y únete a la familia Smart Kingdom
        </h3>
        <a
          href="/matricula-costos.pdf"
          download
          style={styles.downloadButton}
          aria-label="Descargar PDF de inscripción y matrícula"
        >
          Descargar PDF de Inscripción
        </a>
      </section>
    </section>
  );
};

const styles = {
  section: {
    backgroundColor: '#e6f0ff',
    padding: '40px 20px',
    textAlign: 'center',
    fontFamily: "'Montserrat', sans-serif",
  },
  title: {
    color: '#004080',
    fontSize: '2rem',
    marginBottom: '30px',
    fontFamily: "'Montserrat', sans-serif",
  },
  gallery: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    flexWrap: 'wrap',
  },
  card: {
    backgroundColor: '#ffffff',
    padding: '20px',
    borderRadius: '15px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    maxWidth: '300px',
    flex: '1 1 300px',
    fontFamily: "'Montserrat', sans-serif",
  },
  comment: {
    fontStyle: 'italic',
    color: '#004080',
    fontSize: '1.1rem',
    marginBottom: '10px',
    fontFamily: "'Montserrat', sans-serif",
  },
  parent: {
    fontWeight: 'bold',
    color: '#0073e6',
    fontFamily: "'Montserrat', sans-serif",
  },
  downloadSection: {
    marginTop: '30px',
  },
  enrollmentSection: {
    marginTop: '40px',
    backgroundColor: '#cce0ff',
    padding: '30px 20px',
    borderRadius: '15px',
    textAlign: 'center',
    fontFamily: "'Montserrat', sans-serif",
  },
  enrollmentTitle: {
    color: '#003366',
    fontSize: '1.8rem',
    marginBottom: '25px',
    fontWeight: 'bold',
    fontFamily: "'Montserrat', sans-serif",
  },
  downloadButton: {
    display: 'inline-block',
    backgroundColor: '#0073e6',
    color: '#ffffff',
    padding: '12px 25px',
    borderRadius: '25px',
    textDecoration: 'none',
    fontWeight: 'bold',
    fontSize: '1.1rem',
    fontFamily: "'Montserrat', sans-serif",
    transition: 'background-color 0.3s ease',
  },
};

export default Testimonials;
