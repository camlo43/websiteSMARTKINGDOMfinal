require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001; // set port to 3001 as requested

const db = require('./config/db');

// Middleware
app.use(cors());
app.use(express.json());

// Import routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const studentRoutes = require('./routes/studentRoutes');
const gradeRoutes = require('./routes/gradeRoutes');
const classroomRoutes = require('./routes/classroomRoutes');
const docenteRoutes = require('./routes/docenteRoutes');
const adminRoutes = require('./routes/adminRoutes');

// Use routes
app.use('/api/auth', authRoutes);
app.use('/usuarios', userRoutes);
app.use('/estudiantes', studentRoutes);
app.use('/notas', gradeRoutes);
app.use('/salones', classroomRoutes);
app.use('/api/docente', docenteRoutes);
app.use('/api/admin', adminRoutes);

// New route: GET /salones - return all salones from salones table
app.get('/salones', async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM salones');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// New route: GET /estudiantes/conSalones - return estudiantes with their salones using JOIN
app.get('/estudiantes/conSalones', async (req, res) => {
  try {
    const [rows] = await db.execute(
      `SELECT niños.name AS estudiante, salones.name AS salon
       FROM niños
       JOIN salones ON niños.salon_id = salones.id`
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
