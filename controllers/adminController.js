const db = require('../config/db');

const getDashboardData = async (req, res) => {
  try {
    // Get all teachers
    const [teachers] = await db.execute(
      `SELECT id, nombre FROM usuarios WHERE rol_id = 2`
    );

    // Get all classrooms with teacher names
    const [classrooms] = await db.execute(
      `SELECT c.id, c.name AS classroom_name, u.nombre AS teacher_name
       FROM classrooms c
       JOIN usuarios u ON c.teacher_id = u.id`
    );

    // Get all students with classroom names
    const [students] = await db.execute(
      `SELECT s.id, s.name AS student_name, s.age, c.name AS classroom_name
       FROM students s
       JOIN classrooms c ON s.classroom_id = c.id`
    );

    // Get all notes with student and teacher info
    const [notes] = await db.execute(
      `SELECT n.id, n.asignatura, n.tipo_nota, n.valor, n.fecha,
              s.name AS student_name, u.nombre AS teacher_name
       FROM notas n
       JOIN students s ON n.estudiante_id = s.id
       JOIN usuarios u ON n.docente_id = u.id`
    );

    res.json({
      teachers,
      classrooms,
      students,
      notes
    });
  } catch (error) {
    console.error('Error fetching admin dashboard data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  getDashboardData
};
