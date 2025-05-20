import React from 'react';
import { FaCalendarDay, FaClock, FaTasks } from 'react-icons/fa';

const schedule = [
  { day: 'Lunes', time: '8:00 - 12:00', activity: 'Clases y actividades' },
  { day: 'Martes', time: '8:00 - 12:00', activity: 'Clases y actividades' },
  { day: 'Miércoles', time: '8:00 - 12:00', activity: 'Clases y actividades' },
  { day: 'Jueves', time: '8:00 - 12:00', activity: 'Clases y actividades' },
  { day: 'Viernes', time: '8:00 - 12:00', activity: 'Clases y actividades' },
];

const Schedule = () => {
  return (
    <section id="horario" style={styles.section}>
      <h2 style={styles.title}>Horario de Clases y Rutinas</h2>
      <table style={styles.table}>
        <thead>
          <tr>
            <th><FaCalendarDay /> Día</th>
            <th><FaClock /> Horario</th>
            <th><FaTasks /> Actividad</th>
          </tr>
        </thead>
        <tbody>
          {schedule.map(({ day, time, activity }, index) => (
            <tr key={index}>
              <td>{day}</td>
              <td>{time}</td>
              <td>{activity}</td>
            </tr>
          ))}
        </tbody>
      </table>
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
    fontSize: '2rem',
    marginBottom: '30px',

  },
  table: {
    margin: '0 auto',
    borderCollapse: 'collapse',
    width: '80%',
    maxWidth: '600px',
  },
  th: {
    border: '1px solid #0073e6',
    padding: '10px',
    backgroundColor: '#0073e6',
    color: '#ffffff',
  },
  td: {
    border: '1px solid #0073e6',
    padding: '10px',
  },
};

export default Schedule;
