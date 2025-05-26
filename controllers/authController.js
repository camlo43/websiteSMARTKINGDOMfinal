const db = require('../config/db');

const authController = {
  login: async (req, res) => {
    const { correo, contraseña } = req.body;

    if (!correo || !contraseña) {
      return res.status(400).json({ message: 'Correo y contraseña son requeridos' });
    }

    try {
      const [rows] = await db.execute(
        'SELECT id, nombre, rol_id FROM usuarios WHERE correo = ? AND contraseña = ?',
        [correo, contraseña]
      );

      if (rows.length === 0) {
        return res.status(401).json({ message: 'Credenciales incorrectas' });
      }

      const user = rows[0];
      return res.json({
        id: user.id,
        nombre: user.nombre,
        rol_id: user.rol_id
      });
    } catch (error) {
      console.error('Error en login:', error);
      return res.status(500).json({ message: 'Error del servidor' });
    }
  }
};

module.exports = authController;
