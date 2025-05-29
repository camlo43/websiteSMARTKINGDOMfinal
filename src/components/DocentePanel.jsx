import React, { useEffect, useState } from 'react';
import { FaPlus, FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import './DocentePanel.css';

const DocentePanel = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [formData, setFormData] = useState({
    asignatura: '',
    tipoNota: 'semanal',
    valorNota: '',
    fecha: ''
  });
  const [teacherProfile, setTeacherProfile] = useState(null);
  const [userRole, setUserRole] = useState(null);

  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user?.id;
  const userRoleId = user?.rol_id;

  useEffect(() => {
    if (!user || !user.token) {
      alert('Token inválido o no encontrado. Por favor, inicie sesión nuevamente.');
      return;
    }

    const fetchTeacherProfile = async (teacherId) => {
      try {
        const response = await fetch(`http://localhost:3001/api/docente/teacher-profile/${teacherId}`, {
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        });
        if (!response.ok) throw new Error('Error fetching teacher profile');
        const data = await response.json();
        setTeacherProfile(data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchStudents = async (docenteId) => {
      try {
        const response = await fetch(`http://localhost:3001/api/docente/mis-estudiantes/${docenteId}`, {
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        });
        if (!response.ok) throw new Error('Error fetching students');
        const data = await response.json();
        setStudents(data);
      } catch (error) {
        alert(error.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchStudentTeacher = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/docente/info-estudiante', {
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        });
        if (!response.ok) throw new Error('Error fetching student info');
        const data = await response.json();
        if (data.docente_id) {
          await fetchTeacherProfile(data.docente_id);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (userRoleId === 2) {
      // User is a teacher
      setUserRole('teacher');
      fetchTeacherProfile(userId);
      fetchStudents(userId);
    } else if (userRoleId === 3) {
      // User is a student
      setUserRole('student');
      fetchStudentTeacher();
    } else {
      setUserRole('other');
      setLoading(false);
    }
  }, [userId, userRoleId, user?.token]);

  const openModal = (student) => {
    setSelectedStudent(student);
    setFormData({
      asignatura: '',
      tipoNota: 'semanal',
      valorNota: '',
      fecha: ''
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedStudent(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedStudent) return;

    const payload = {
      estudiante_id: selectedStudent.id,
      asignatura: formData.asignatura,
      tipo_nota: formData.tipoNota,
      valor: formData.valorNota,
      fecha: formData.fecha,
      docente_id: userId
    };

    try {
      const response = await fetch('http://localhost:3001/api/docente/notas', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify(payload)
      });
      if (!response.ok) throw new Error('Error al enviar la nota');
      alert('Nota agregada correctamente');
      closeModal();
    } catch (error) {
      alert(error.message);
    }
  };

  if (loading) return <p>Cargando...</p>;

  return (
    <div className="docentePanel">
      {teacherProfile && (
        <div className="teacherCard">
          <img src={teacherProfile.photo} alt={`Profesora ${teacherProfile.name}`} className="teacherPhoto" />
          <div className="welcomeMessage">
            <h2>Bienvenido al curso {teacherProfile.course}</h2>
            <p>{teacherProfile.description}</p>
          </div>
        </div>
      )}
      {userRole === 'teacher' && (
        <>
          <h2>Panel de Docente</h2>
          <table className="studentsTable">
            <thead>
              <tr>
                <th>Nombre Completo</th>
                <th>Edad</th>
                <th>Salón</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {students.length === 0 && (
                <tr><td colSpan="4">No hay estudiantes asignados.</td></tr>
              )}
              {students.map(student => (
                <tr key={student.id}>
                  <td>{student.nombre_completo}</td>
                  <td>{student.edad}</td>
                  <td>{student.nombre_salon}</td>
                  <td>
                    <button className="addNoteButton" onClick={() => openModal(student)}>
                      <FaPlus /> Agregar nota
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
      {userRole === 'student' && (
        <p>Este es el perfil de la docente encargada de tu salón.</p>
      )}
      {userRole === 'other' && (
        <p>No tienes acceso a esta sección.</p>
      )}

      <AnimatePresence>
        {showModal && (
          <motion.div
            className="modalOverlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="modalContent"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <button className="closeButton" onClick={closeModal}>
                <FaTimes />
              </button>
              <h3>Agregar nota para {selectedStudent.nombre_completo}</h3>
              <form onSubmit={handleSubmit} className="noteForm">
                <label>
                  Asignatura:
                  <input
                    type="text"
                    name="asignatura"
                    value={formData.asignatura}
                    onChange={handleChange}
                    required
                  />
                </label>
                <label>
                  Tipo de nota:
                  <select
                    name="tipoNota"
                    value={formData.tipoNota}
                    onChange={handleChange}
                  >
                    <option value="semanal">Semanal</option>
                    <option value="periodo">Período</option>
                  </select>
                </label>
                <label>
                  Valor de la nota:
                  <input
                    type="number"
                    name="valorNota"
                    value={formData.valorNota}
                    onChange={handleChange}
                    min="0"
                    max="100"
                    required
                  />
                </label>
                <label>
                  Fecha:
                  <input
                    type="date"
                    name="fecha"
                    value={formData.fecha}
                    onChange={handleChange}
                    required
                  />
                </label>
                <button type="submit" className="submitNoteButton">Enviar nota</button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DocentePanel;
