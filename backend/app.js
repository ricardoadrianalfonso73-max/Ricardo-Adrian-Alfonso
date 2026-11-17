const express = require('express');
const cors = require('cors');
require('dotenv').config();

const indexRouter = require('./routes/index');
const productosRouter = require('./routes/productos');
const loginRouter = require('./routes/login');
const contactoRouter = require('./routes/contacto');
const adminRouter = require('./routes/admin');
const usersRouter = require('./routes/users');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', indexRouter);
app.use('/api/productos', productosRouter);
app.use('/api/login', loginRouter);
app.use('/api/contacto', contactoRouter);
app.use('/api/admin', adminRouter);
app.use('/api/users', usersRouter);

app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

module.exports = app;
