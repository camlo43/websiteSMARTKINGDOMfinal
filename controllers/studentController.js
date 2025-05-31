exports.getMisEstudiantes = (req, res) => {
  const docenteId = req.user.id; // del token

  const query = `
    SELECT n.id, n.nombre, n.fecha_nacimiento, n.salon_id, u.nombre AS acudiente
    FROM niños n
    JOIN usuarios u ON n.usuario_id = u.id
    WHERE n.docente_id = ?
  `;

  db.query(query, [docenteId], (err, results) => {
    if (err) {
      console.error('Error al obtener los estudiantes:', err);
      return res.status(500).json({ message: 'Error interno del servidor' });
    }

    return res.json(results);
  });
};

