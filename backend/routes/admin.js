const express = require('express');
const jwt = require('jsonwebtoken');
const pool = require('../bd');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'electro_tecno_secret_dev_key_2026';

function verifyToken(req, res, next) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token requerido.' });
  }
  try {
    req.user = jwt.verify(header.slice(7), JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: 'Token inválido o expirado.' });
  }
}

router.use(verifyToken);

router.get('/consultas', async (_req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM consultas ORDER BY fecha DESC');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Error al consultar mensajes.' });
  }
});

router.delete('/consultas/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM consultas WHERE id = ?', [req.params.id]);
    res.json({ ok: true });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar consulta.' });
  }
});

router.post('/productos', async (req, res) => {
  try {
    const { nombre, precio, precio_anterior, estado, categoria, descripcion, imagen, stock, destacado } =
      req.body;
    const [result] = await pool.query(
      'INSERT INTO productos (nombre, precio, precio_anterior, estado, categoria, descripcion, imagen, stock, destacado) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [
        nombre,
        Number(precio),
        precio_anterior ? Number(precio_anterior) : null,
        estado === 'usado' ? 'usado' : 'nuevo',
        categoria,
        descripcion,
        imagen,
        Number(stock || 5),
        destacado ? 1 : 0,
      ]
    );
    const [rows] = await pool.query('SELECT * FROM productos WHERE id = ?', [result.insertId]);
    res.status(201).json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear producto.' });
  }
});

router.put('/productos/:id', async (req, res) => {
  try {
    const { nombre, precio, precio_anterior, estado, categoria, descripcion, imagen, stock, destacado } =
      req.body;
    await pool.query(
      'UPDATE productos SET nombre=?, precio=?, precio_anterior=?, estado=?, categoria=?, descripcion=?, imagen=?, stock=?, destacado=? WHERE id=?',
      [
        nombre,
        Number(precio),
        precio_anterior ? Number(precio_anterior) : null,
        estado === 'usado' ? 'usado' : 'nuevo',
        categoria,
        descripcion,
        imagen,
        Number(stock || 5),
        destacado ? 1 : 0,
        req.params.id,
      ]
    );
    const [rows] = await pool.query('SELECT * FROM productos WHERE id = ?', [req.params.id]);
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar producto.' });
  }
});

router.delete('/productos/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM productos WHERE id = ?', [req.params.id]);
    res.json({ ok: true });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar producto.' });
  }
});

module.exports = router;
