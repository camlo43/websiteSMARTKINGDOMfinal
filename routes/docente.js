
// routes/docente.js
const express = require('express');
const router = express.Router();
const pool = require('../db'); // Asegúrate de tener tu conexión MySQL en db.js

// Obtener estudiantes del docente actual
router.get('/estudiantes/:docenteId', async (req, res) => {
  const { docenteId } = req.params;

  try {
    const [rows] = await pool.query('SELECT * FROM niños WHERE docente_id = ?', [docenteId]);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener los estudiantes' });
  }
});

module.exports = router;
