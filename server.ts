import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import {
  getProductos,
  getProductoById,
  createProducto,
  updateProducto,
  deleteProducto,
  findUsuarioByUsername,
  createConsulta,
  getConsultas,
  deleteConsulta,
} from './server/db.ts';

dotenv.config();

const PORT = Number(process.env.PORT || 3000);
const JWT_SECRET = process.env.JWT_SECRET || 'electro_tecno_secret_dev_key_2026';

interface JwtPayload {
  id: number;
  usuario: string;
  nombre: string;
  rol: string;
}

interface AuthRequest extends Request {
  user?: JwtPayload;
}

function authMiddleware(req: AuthRequest, res: Response, next: NextFunction): void {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Token no proporcionado. Iniciá sesión como administrador.' });
    return;
  }

  const token = header.slice(7);
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ error: 'Sesión expirada o token inválido.' });
  }
}

async function startServer() {
  const app = express();

  app.use(cors());
  app.use(express.json());

  // Health / API index
  app.get('/api/health', (_req, res) => {
    res.json({ ok: true, service: 'Electro Tecno API' });
  });

  // GET /api/productos
  app.get('/api/productos', async (req, res) => {
    try {
      const { categoria, estado, q, ofertas } = req.query;
      const items = await getProductos({
        categoria: typeof categoria === 'string' ? categoria : undefined,
        estado: typeof estado === 'string' ? estado : undefined,
        q: typeof q === 'string' ? q : undefined,
        ofertas: ofertas === 'true' || ofertas === '1',
      });
      res.json(items);
    } catch (error) {
      console.error('Error en GET /api/productos:', error);
      res.status(500).json({ error: 'No se pudieron obtener los productos.' });
    }
  });

  // GET /api/productos/:id
  app.get('/api/productos/:id', async (req, res) => {
    try {
      const id = Number(req.params.id);
      if (Number.isNaN(id)) {
        res.status(400).json({ error: 'ID de producto inválido.' });
        return;
      }
      const item = await getProductoById(id);
      if (!item) {
        res.status(404).json({ error: 'Producto no encontrado.' });
        return;
      }
      res.json(item);
    } catch (error) {
      console.error('Error en GET /api/productos/:id:', error);
      res.status(500).json({ error: 'Error al consultar el producto.' });
    }
  });

  // POST /api/login
  app.post('/api/login', async (req, res) => {
    try {
      const { usuario, password } = req.body as { usuario?: string; password?: string };
      if (!usuario || !password) {
        res.status(400).json({ error: 'Completá usuario y contraseña.' });
        return;
      }

      const userRecord = await findUsuarioByUsername(usuario.trim());
      if (!userRecord) {
        res.status(401).json({ error: 'Usuario o contraseña incorrectos.' });
        return;
      }

      const validPassword = await bcrypt.compare(password, userRecord.password);
      if (!validPassword) {
        res.status(401).json({ error: 'Usuario o contraseña incorrectos.' });
        return;
      }

      const payload: JwtPayload = {
        id: userRecord.id,
        usuario: userRecord.usuario,
        nombre: userRecord.nombre,
        rol: userRecord.rol,
      };
      const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '8h' });

      res.json({
        token,
        user: payload,
      });
    } catch (error) {
      console.error('Error en POST /api/login:', error);
      res.status(500).json({ error: 'Error interno al autenticar usuario.' });
    }
  });

  // GET /api/login/verify
  app.get('/api/login/verify', authMiddleware, (req: AuthRequest, res) => {
    res.json({ valid: true, user: req.user });
  });

  // POST /api/contacto
  app.post('/api/contacto', async (req, res) => {
    try {
      const { nombre, email, telefono, asunto, mensaje } = req.body as {
        nombre?: string;
        email?: string;
        telefono?: string;
        asunto?: string;
        mensaje?: string;
      };

      if (!nombre?.trim() || !email?.trim() || !mensaje?.trim()) {
        res.status(400).json({ error: 'Nombre, correo electrónico y mensaje son obligatorios.' });
        return;
      }

      const created = await createConsulta({
        nombre: nombre.trim(),
        email: email.trim(),
        telefono: telefono?.trim() || null,
        asunto: asunto?.trim() || 'Consulta general',
        mensaje: mensaje.trim(),
      });

      res.status(201).json({
        message: 'Consulta recibida correctamente. Te responderemos a la brevedad.',
        consulta: created,
      });
    } catch (error) {
      console.error('Error en POST /api/contacto:', error);
      res.status(500).json({ error: 'No se pudo guardar tu consulta.' });
    }
  });

  // Rutas protegidas de Admin (/api/admin/*)
  app.get('/api/admin/consultas', authMiddleware, async (_req, res) => {
    try {
      const consultas = await getConsultas();
      res.json(consultas);
    } catch (error) {
      console.error('Error en GET /api/admin/consultas:', error);
      res.status(500).json({ error: 'No se pudieron obtener las consultas.' });
    }
  });

  app.delete('/api/admin/consultas/:id', authMiddleware, async (req, res) => {
    try {
      const id = Number(req.params.id);
      const deleted = await deleteConsulta(id);
      if (!deleted) {
        res.status(404).json({ error: 'Consulta no encontrada.' });
        return;
      }
      res.json({ ok: true });
    } catch (error) {
      console.error('Error en DELETE /api/admin/consultas/:id:', error);
      res.status(500).json({ error: 'Error al eliminar la consulta.' });
    }
  });

  app.post('/api/admin/productos', authMiddleware, async (req, res) => {
    try {
      const body = req.body as {
        nombre?: string;
        precio?: number | string;
        precio_anterior?: number | string | null;
        estado?: 'nuevo' | 'usado';
        categoria?: string;
        descripcion?: string;
        imagen?: string;
        stock?: number | string;
        destacado?: number | boolean;
      };

      if (!body.nombre?.trim() || !body.precio || !body.categoria?.trim() || !body.descripcion?.trim()) {
        res.status(400).json({ error: 'Nombre, precio, categoría y descripción son obligatorios.' });
        return;
      }

      const created = await createProducto({
        nombre: body.nombre.trim(),
        precio: Number(body.precio),
        precio_anterior:
          body.precio_anterior !== undefined && body.precio_anterior !== null && body.precio_anterior !== ''
            ? Number(body.precio_anterior)
            : null,
        estado: body.estado === 'usado' ? 'usado' : 'nuevo',
        categoria: body.categoria.trim(),
        descripcion: body.descripcion.trim(),
        imagen:
          body.imagen?.trim() ||
          '/src/assets/images/prod_iphone_15_pro_1794884334261.jpg',
        stock: Number(body.stock || 5),
        destacado: body.destacado ? 1 : 0,
      });

      res.status(201).json(created);
    } catch (error) {
      console.error('Error en POST /api/admin/productos:', error);
      res.status(500).json({ error: 'Error al crear el producto.' });
    }
  });

  app.put('/api/admin/productos/:id', authMiddleware, async (req, res) => {
    try {
      const id = Number(req.params.id);
      const body = req.body as Record<string, unknown>;
      const updated = await updateProducto(id, {
        ...(body.nombre !== undefined ? { nombre: String(body.nombre).trim() } : {}),
        ...(body.precio !== undefined ? { precio: Number(body.precio) } : {}),
        ...(body.precio_anterior !== undefined
          ? {
              precio_anterior:
                body.precio_anterior === null || body.precio_anterior === ''
                  ? null
                  : Number(body.precio_anterior),
            }
          : {}),
        ...(body.estado !== undefined
          ? { estado: body.estado === 'usado' ? 'usado' : 'nuevo' }
          : {}),
        ...(body.categoria !== undefined ? { categoria: String(body.categoria).trim() } : {}),
        ...(body.descripcion !== undefined ? { descripcion: String(body.descripcion).trim() } : {}),
        ...(body.imagen !== undefined ? { imagen: String(body.imagen).trim() } : {}),
        ...(body.stock !== undefined ? { stock: Number(body.stock) } : {}),
        ...(body.destacado !== undefined ? { destacado: body.destacado ? 1 : 0 } : {}),
      });

      if (!updated) {
        res.status(404).json({ error: 'Producto no encontrado.' });
        return;
      }
      res.json(updated);
    } catch (error) {
      console.error('Error en PUT /api/admin/productos/:id:', error);
      res.status(500).json({ error: 'Error al actualizar el producto.' });
    }
  });

  app.delete('/api/admin/productos/:id', authMiddleware, async (req, res) => {
    try {
      const id = Number(req.params.id);
      const deleted = await deleteProducto(id);
      if (!deleted) {
        res.status(404).json({ error: 'Producto no encontrado.' });
        return;
      }
      res.json({ ok: true });
    } catch (error) {
      console.error('Error en DELETE /api/admin/productos/:id:', error);
      res.status(500).json({ error: 'Error al eliminar el producto.' });
    }
  });

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Electro Tecno server listening on http://localhost:${PORT}`);
  });
}

startServer();
