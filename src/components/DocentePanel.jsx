import React, { useState, useEffect } from 'react';

const DocentePanel = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Si aún quieres mostrar perfil, descomenta esto:
  // const [teacherProfile, setTeacherProfile] = useState(null);

  // Recupera user de localStorage
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const token = user.token;
  const docenteId = user.id;

  const fetchStudents = async () => {
    if (!docenteId || !token) {
      console.error('Falta docenteId o token en localStorage');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`http://localhost:3001/api/docente/estudiantes/${docenteId}`, {
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        }
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setStudents(data);
    } catch (err) {
      console.error('Error al cargar estudiantes:', err);
    } finally {
      setLoading(false);
    }
  };

  // Si quieres seguir obteniendo perfil del docente:
  /*
  const fetchTeacherProfile = async () => {
    try {
      const res = await fetch(`http://localhost:3001/api/docente/teacher-profile/${docenteId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const profile = await res.json();
      setTeacherProfile(profile);
    } catch (err) {
      console.error('Error al cargar perfil del docente:', err);
    }
  };
  */

  useEffect(() => {
    fetchStudents();
    // fetchTeacherProfile();
  }, []);

  if (loading) return <p>Cargando...</p>;

  return (
    <div className="docente-panel">
      <h2>Panel del Docente</h2>

      {/* Si quieres mostrar datos del docente, descomenta: */}
      {/*
      {teacherProfile && (
        <div className="teacher-profile">
          <h3>{teacherProfile.nombre_docente}</h3>
          <p>Email: {teacherProfile.email}</p>
          <p>Teléfono: {teacherProfile.telefono}</p>
        </div>
      )}
      */}

      <h3>Estudiantes asignados:</h3>
      {students.length === 0 ? (
        <p>No hay estudiantes asignados.</p>
      ) : (
        <ul className="students-list">
          {students.map(e => (
            <li key={e.id}>
              {e.nombre} — Nacido: {e.fecha_nacimiento}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DocentePanel;
