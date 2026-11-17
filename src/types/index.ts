export interface Producto {
  id: number;
  nombre: string;
  precio: number;
  precio_anterior: number | null;
  estado: 'nuevo' | 'usado';
  categoria: string;
  descripcion: string;
  imagen: string;
  stock: number;
  destacado: number;
  fecha_creacion?: string;
}

export interface Consulta {
  id: number;
  nombre: string;
  email: string;
  telefono: string | null;
  asunto: string;
  mensaje: string;
  fecha: string;
}

export interface UserSession {
  id: number;
  usuario: string;
  nombre: string;
  rol: 'admin' | 'cliente';
}

export interface CartItem {
  producto: Producto;
  cantidad: number;
}
