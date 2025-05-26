const db = require('../config/db');

const User = {
  findByEmail: async (email) => {
    const [rows] = await db.execute(
      'SELECT * FROM usuarios WHERE correo = ?',
      [email]
    );
    return rows[0];
  }
};

module.exports = User;
