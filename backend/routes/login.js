const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../bd');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'electro_tecno_secret_dev_key_2026';

router.post('/', async (req, res) => {
  try {
    const { usuario, password } = req.body;
    if (!usuario || !password) {
      return res.status(400).json({ error: 'Completá usuario y contraseña.' });
    }

    const [rows] = await pool.query('SELECT * FROM usuarios WHERE usuario = ? LIMIT 1', [
      usuario.trim(),
    ]);
    if (!rows.length) {
      return res.status(401).json({ error: 'Usuario o contraseña incorrectos.' });
    }

    const userRecord = rows[0];
    const valid = await bcrypt.compare(password, userRecord.password);
    if (!valid) {
      return res.status(401).json({ error: 'Usuario o contraseña incorrectos.' });
    }

    const userPayload = {
      id: userRecord.id,
      usuario: userRecord.usuario,
      nombre: userRecord.nombre,
      rol: userRecord.rol,
    };
    const token = jwt.sign(userPayload, JWT_SECRET, { expiresIn: '8h' });

    res.json({ token, user: userPayload });
  } catch (error) {
    console.error('Error en POST /api/login:', error);
    res.status(500).json({ error: 'Error interno al iniciar sesión.' });
  }
});

module.exports = router;
