const express = require('express');
const pool = require('../bd');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { nombre, email, telefono, asunto, mensaje } = req.body;
    if (!nombre || !email || !mensaje) {
      return res
        .status(400)
        .json({ error: 'Nombre, correo electrónico y mensaje son obligatorios.' });
    }

    const [result] = await pool.query(
      'INSERT INTO consultas (nombre, email, telefono, asunto, mensaje) VALUES (?, ?, ?, ?, ?)',
      [
        nombre.trim(),
        email.trim(),
        telefono ? telefono.trim() : null,
        asunto ? asunto.trim() : 'Consulta general',
        mensaje.trim(),
      ]
    );

    res.status(201).json({
      message: 'Consulta guardada correctamente.',
      id: result.insertId,
    });
  } catch (error) {
    console.error('Error en POST /api/contacto:', error);
    res.status(500).json({ error: 'No se pudo guardar la consulta.' });
  }
});

module.exports = router;
