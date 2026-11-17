const express = require('express');
const router = express.Router();

router.get('/health', (req, res) => {
  res.json({ ok: true, service: 'Electro Tecno API MySQL' });
});

module.exports = router;
