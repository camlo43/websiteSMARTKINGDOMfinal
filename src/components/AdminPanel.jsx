import React, { useEffect, useState } from 'react';
import './AdminPanel.css';

const AdminPanel = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem('user'));
  const token = user?.token;

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/admin/dashboard', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (!response.ok) throw new Error('Error al obtener datos del dashboard');
        const data = await response.json();
        setDashboardData(data);
      } catch (error) {
        alert(error.message);
      } finally {
        setLoading(false);
      }
    };
    if (token) fetchDashboardData();
  }, [token]);

  if (loading) return <p>Cargando datos del administrador...</p>;

  if (!dashboardData) return <p>No se encontraron datos.</p>;

  return (
    <div className="adminPanel">
      <h2>Panel de Administrador</h2>

      <section>
        <h3>Salones y Docentes</h3>
        <table className="adminTable">
          <thead>
            <tr>
              <th>Salón</th>
              <th>Docente Encargada</th>
              <th>Estudiantes</th>
              <th>Notas Subidas</th>
            </tr>
          </thead>
          <tbody>
            {dashboardData.classrooms.map(classroom => {
              const studentsInClass = dashboardData.students.filter(s => s.classroom_name === classroom.classroom_name);
              const notesInClass = dashboardData.notes.filter(n => studentsInClass.some(st => st.student_name === n.student_name && n.teacher_name === classroom.teacher_name));
              return (
                <tr key={classroom.id}>
                  <td>{classroom.classroom_name}</td>
                  <td>{classroom.teacher_name}</td>
                  <td>
                    <ul>
                      {studentsInClass.map(student => (
                        <li key={student.id}>{student.student_name} (Edad: {student.age})</li>
                      ))}
                    </ul>
                  </td>
                  <td>
                    <ul>
                      {notesInClass.map(note => (
                        <li key={note.id}>
                          {note.asignatura} - {note.tipo_nota} - {note.valor} - {note.fecha} (Estudiante: {note.student_name})
                        </li>
                      ))}
                    </ul>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default AdminPanel;
