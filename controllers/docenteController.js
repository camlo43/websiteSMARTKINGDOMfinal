const db = require('../config/db');
const path = require('path');
const fs = require('fs');

const teacherProfilesPath = path.join(__dirname, '../data/teacherProfiles.json');

const getMisEstudiantes = async (req, res) => {
  const docente_id = req.user.id; // get docente_id from authenticated user

  try {
    // Get salones assigned to the docente
    const [salones] = await db.execute(
      'SELECT id, nombre FROM salones WHERE docente_id = ?',
      [docente_id]
    );

    if (salones.length === 0) {
      return res.status(404).json({ message: 'No salones found for this docente' });
    }

    // Extract salon IDs
    const salonIds = salones.map(s => s.id);

    // Get niños assigned to those salones
    const [ninos] = await db.execute(
      `SELECT n.id, n.nombre AS nombre_completo, n.edad, n.salon_id, s.nombre AS nombre_salon
       FROM niños n
       JOIN salones s ON n.salon_id = s.id
       WHERE n.salon_id IN (${salonIds.map(() => '?').join(',')})`,
      salonIds
    );

    res.json(ninos);
  } catch (error) {
    console.error('Error fetching niños for docente:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getInfoEstudiante = async (req, res) => {
  const estudiante_id = req.user.id; // get estudiante id from authenticated user

  try {
    // Query niño info with docente and salon info
    const [rows] = await db.execute(
      `SELECT n.id AS estudiante_id, n.nombre AS nombre_estudiante, n.edad,
              s.id AS salon_id, s.nombre AS nombre_salon,
              u.id AS docente_id, u.nombre AS nombre_docente
       FROM niños n
       JOIN salones s ON n.salon_id = s.id
       JOIN usuarios u ON s.docente_id = u.id
       WHERE n.id = ?`,
      [estudiante_id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Información del estudiante no encontrada' });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error('Error fetching info del estudiante:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// New endpoint to get teacher profile by teacher ID
const getTeacherProfile = (req, res) => {
  const teacherId = parseInt(req.params.teacher_id, 10);

  fs.readFile(teacherProfilesPath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading teacher profiles:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }

    let profiles;
    try {
      profiles = JSON.parse(data);
    } catch (parseErr) {
      console.error('Error parsing teacher profiles JSON:', parseErr);
      return res.status(500).json({ message: 'Internal server error' });
    }

    const profile = profiles.find(p => p.id === teacherId);
    if (!profile) {
      return res.status(404).json({ message: 'Teacher profile not found' });
    }

    res.json(profile);
  });
};

module.exports = {
  getMisEstudiantes,
  getInfoEstudiante,
  getTeacherProfile
};
