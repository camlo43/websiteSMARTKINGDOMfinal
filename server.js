require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Import routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const studentRoutes = require('./routes/studentRoutes');
const gradeRoutes = require('./routes/gradeRoutes');
const classroomRoutes = require('./routes/classroomRoutes');

// Use routes
app.use('/login', authRoutes);
app.use('/register', authRoutes);
app.use('/usuarios', userRoutes);
app.use('/estudiantes', studentRoutes);
app.use('/notas', gradeRoutes);
app.use('/salones', classroomRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
