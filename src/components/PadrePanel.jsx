import React, { useEffect, useState } from 'react';
import { FaStickyNote } from 'react-icons/fa';
import { motion } from 'framer-motion';
import './PadrePanel.css';

const PadrePanel = () => {
  const [notas, setNotas] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem('user'));
  const estudianteId = user?.id;

  useEffect(() => {
    const fetchNotas = async () => {
      try {
        const token = user?.token;
        const response = await fetch('http://localhost:3001/api/padre/notas/' + estudianteId, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (!response.ok) throw new Error('Error al obtener las notas');
        const data = await response.json();
        setNotas(data);
      } catch (error) {
        alert(error.message);
      } finally {
        setLoading(false);
      }
    };
    if (estudianteId) fetchNotas();
  }, [estudianteId]);

  // Group notes by tipo_nota, asignatura, and fecha
  const groupedNotas = notas.reduce((acc, nota) => {
    const key = nota.tipo_nota + '|' + nota.asignatura + '|' + nota.fecha;
    if (!acc[key]) acc[key] = [];
    acc[key].push(nota);
    return acc;
  }, {});

  if (loading) return <p>Cargando notas...</p>;

  return (
    <div className="padrePanel">
      <h2>Panel de Padre</h2>
      {notas.length === 0 ? (
        <p>No hay notas disponibles.</p>
      ) : (
        Object.entries(groupedNotas).map(([key, notasGroup]) => {
          const [tipoNota, asignatura, fecha] = key.split('|');
          return (
            <motion.div
              key={key}
              className="notaCard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h3><FaStickyNote /> {asignatura}</h3>
              <p><strong>Tipo de nota:</strong> {tipoNota}</p>
              <p><strong>Fecha:</strong> {fecha}</p>
              <ul>
                {notasGroup.map(nota => (
                  <li key={nota.id}>Valor: {nota.valor}</li>
                ))}
              </ul>
            </motion.div>
          );
        })
      )}
    </div>
  );
};

export default PadrePanel;
