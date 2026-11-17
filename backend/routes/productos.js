const express = require('express');
const router = express.Router();
const pool = require('../bd');

router.get('/', async (req, res) => {
  try {
    const { categoria, estado, q, ofertas } = req.query;
    const clauses = [];
    const params = [];

    if (categoria && categoria !== 'Todas') {
      clauses.push('categoria = ?');
      params.push(categoria);
    }
    if (estado === 'nuevo' || estado === 'usado') {
      clauses.push('estado = ?');
      params.push(estado);
    }
    if (ofertas === 'true' || ofertas === '1') {
      clauses.push('precio_anterior IS NOT NULL AND precio_anterior > precio');
    }
    if (q) {
      clauses.push('(nombre LIKE ? OR descripcion LIKE ? OR categoria LIKE ?)');
      const term = `%${q}%`;
      params.push(term, term, term);
    }

    const where = clauses.length > 0 ? `WHERE ${clauses.join(' AND ')}` : '';
    const [rows] = await pool.query(
      `SELECT * FROM productos ${where} ORDER BY destacado DESC, id ASC`,
      params
    );
    res.json(rows);
  } catch (error) {
    console.error('Error en GET /api/productos:', error);
    res.status(500).json({ error: 'Error al consultar productos en MySQL' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM productos WHERE id = ? LIMIT 1', [
      req.params.id,
    ]);
    if (!rows.length) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error al consultar producto' });
  }
});

module.exports = router;
