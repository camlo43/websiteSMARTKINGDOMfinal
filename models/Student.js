const db = require('../config/db');

const Student = {
  create: async (student) => {
    const { name, age, classroom_id } = student;
    const [result] = await db.execute(
      'INSERT INTO students (name, age, classroom_id) VALUES (?, ?, ?)',
      [name, age, classroom_id]
    );
    return result;
  },

  findById: async (id) => {
    const [rows] = await db.execute(
      'SELECT * FROM students WHERE id = ?',
      [id]
    );
    return rows[0];
  },

  findAll: async () => {
    const [rows] = await db.execute('SELECT * FROM students');
    return rows;
  },

  findAllWithClassroom: async () => {
    const [rows] = await db.execute(
      `SELECT students.name AS studentName, classrooms.name AS classroomName
       FROM students
       JOIN classrooms ON students.classroom_id = classrooms.id`
    );
    return rows;
  }
};

module.exports = Student;
