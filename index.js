// index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const docenteRoutes = require('./routes/docente'); // <<--- Nuevo

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/docente', docenteRoutes); // <<--- Nuevo

app.listen(PORT, () => {
  console.log('Server running on port ' + PORT);
});

