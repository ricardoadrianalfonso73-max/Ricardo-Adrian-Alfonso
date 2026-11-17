# Electro Tecno — Tienda de Tecnología y Servicio Técnico

**Proyecto Final · Práctica Profesional II · 2026**

Aplicación web Full Stack para **Electro Tecno**, una tienda moderna de tecnología con estética **Tech Nocturno** (fondo `#050505`, secciones `#101010` / `#151515` y acentos en verde neón `#00FF55`), catálogo de celulares nuevos y usados, notebooks, monitores, periféricos y accesorios, ofertas con descuento porcentual, servicio técnico especializado, carrito de compras persistente, formulario de consultas y panel administrativo protegido con autenticación JWT.

---

## Tecnologías Utilizadas

- **Front-end:** React 19, TypeScript, React Router DOM, Tailwind CSS v4, Lucide Icons, tipografía `Orbitron` + `Plus Jakarta Sans` + `JetBrains Mono`.
- **Back-end:** Node.js, Express, CORS, JSON Web Tokens (`jsonwebtoken`), hash de contraseñas con `bcryptjs`.
- **Base de datos:** MySQL (`tienda_electro.sql`) con conexión mediante `mysql2/promise` (y persistencia local automática integrada cuando no hay una instancia MySQL activa).

---

## Estructura del Repositorio

```text
electro-tecno/
├── backend/                  # Servidor Node.js + Express + MySQL standalone
│   ├── bin/www
│   ├── routes/
│   │   ├── admin.js          # Rutas CRUD protegidas con JWT
│   │   ├── contacto.js       # POST /api/contacto
│   │   ├── index.js
│   │   ├── login.js          # POST /api/login (bcrypt + JWT)
│   │   ├── productos.js      # GET /api/productos (con filtros)
│   │   └── users.js
│   ├── app.js
│   ├── bd.js                 # Pool de conexión MySQL
│   ├── .env.example
│   └── package.json
├── database/
│   └── tienda_electro.sql    # Script SQL completo (usuarios, productos, consultas)
├── server/                   # Adaptador de base de datos unificado para entorno dev
│   └── db.ts
├── server.ts                 # Servidor unificado Express + Vite (puerto 3000)
├── src/
│   ├── assets/images/        # Fotografías de catálogo y servicio técnico
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Nav.tsx
│   │   │   └── Footer.tsx
│   │   ├── CartDrawer.tsx
│   │   ├── ProductCard.tsx
│   │   ├── ProductDetailModal.tsx
│   │   └── ProtectedRoute.tsx
│   ├── context/
│   │   ├── AuthContext.tsx
│   │   └── CartContext.tsx
│   ├── pages/
│   │   ├── HomePage.tsx
│   │   ├── ProductosPage.tsx
│   │   ├── ServiciosPage.tsx
│   │   ├── ContactoPage.tsx
│   │   ├── LoginPage.tsx
│   │   └── AdminPage.tsx
│   ├── styles/               # Hojas de estilo modulares por layout y página
│   ├── App.tsx
│   └── main.tsx
├── .env.example
├── package.json
└── README.md
```

---

## Cómo importar la Base de Datos MySQL

1. Iniciá tu servidor MySQL local (XAMPP, Laragon, Docker o MySQL Workbench).
2. Importá el archivo `database/tienda_electro.sql`:

```bash
mysql -u root -p < database/tienda_electro.sql
```

Esto creará la base de datos `tienda_electro` con las 3 tablas (`usuarios`, `productos`, `consultas`), el catálogo inicial de 50 productos únicos (con ofertas integradas) y el usuario administrador con contraseña encriptada con `bcrypt`.

---

## Instalación y Ejecución

### Opción A — Ejecución Unificada (Front + Back en puerto 3000)

```bash
npm install
cp .env.example .env
# (Opcional) Configurá DB_HOST, DB_USER, DB_PASSWORD y DB_NAME en .env para conectar a MySQL
npm run dev
```

Abrir en el navegador: `http://localhost:3000`

### Opción B — Ejecución Independiente del Backend MySQL

```bash
cd backend
npm install
cp .env.example .env
# Configurá tus credenciales MySQL en backend/.env
npm start
```

---

## Usuario de Prueba (Panel Administrador)

- **Usuario:** `admin`
- **Contraseña:** `admin123`

Desde `/login` podés iniciar sesión y acceder al panel protegido `/admin` para crear, editar o eliminar productos del catálogo y revisar las consultas enviadas desde la página de Contacto.
