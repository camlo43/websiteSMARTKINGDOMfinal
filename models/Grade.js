const db = require('../config/db');

const Grade = {
  create: async (grade) => {
    const { student_id, subject, grade_value } = grade;
    const [result] = await db.execute(
      'INSERT INTO grades (student_id, subject, grade_value) VALUES (?, ?, ?)',
      [student_id, subject, grade_value]
    );
    return result;
  },

  findByStudentId: async (student_id) => {
    const [rows] = await db.execute(
      'SELECT * FROM grades WHERE student_id = ?',
      [student_id]
    );
    return rows;
  },

  findAll: async () => {
    const [rows] = await db.execute('SELECT * FROM grades');
    return rows;
  }
};

module.exports = Grade;
