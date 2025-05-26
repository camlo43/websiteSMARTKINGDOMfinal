const db = require('../config/db');

const Classroom = {
  create: async (classroom) => {
    const { name, teacher_id } = classroom;
    const [result] = await db.execute(
      'INSERT INTO classrooms (name, teacher_id) VALUES (?, ?)',
      [name, teacher_id]
    );
    return result;
  },

  findById: async (id) => {
    const [rows] = await db.execute(
      'SELECT * FROM classrooms WHERE id = ?',
      [id]
    );
    return rows[0];
  },

  findAll: async () => {
    const [rows] = await db.execute('SELECT * FROM classrooms');
    return rows;
  }
};

module.exports = Classroom;
