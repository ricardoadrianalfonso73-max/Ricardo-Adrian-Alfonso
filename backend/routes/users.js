const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || 'electro_tecno_secret_dev_key_2026';

router.get('/me', (req, res) => {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No autenticado' });
  }
  try {
    const decoded = jwt.verify(header.slice(7), JWT_SECRET);
    res.json(decoded);
  } catch {
    res.status(401).json({ error: 'Token inválido' });
  }
});

module.exports = router;
