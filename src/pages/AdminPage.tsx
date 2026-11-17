import React, { useCallback, useEffect, useState } from 'react';
import { Plus, Trash2, Pencil, LogOut, Package, MessageSquare, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import type { Consulta, Producto } from '../types';
import { formatARS } from '../utils/format';

const CATEGORIES = [
  'Celulares',
  'Notebooks y PC',
  'Monitores',
  'Periféricos',
  'Audio',
  'Accesorios',
];

const DEFAULT_IMAGES = [
  '/src/assets/images/prod_iphone_15_pro_1794884334261.jpg',
  '/src/assets/images/prod_samsung_s23_usado_1794884335066.jpg',
  '/src/assets/images/prod_notebook_gamer_1794884335814.jpg',
  '/src/assets/images/prod_monitor_curvo_1794884335895.jpg',
  '/src/assets/images/prod_teclado_mecanico_1794884336855.jpg',
  '/src/assets/images/prod_mouse_inalambrico_1794884336952.jpg',
  '/src/assets/images/prod_auriculares_anc_1794884337504.jpg',
  '/src/assets/images/prod_cargador_gan_1794884338193.jpg',
  '/src/assets/images/prod_funda_kevlar_1794884338585.jpg',
  '/src/assets/images/prod_powerbank_ssd_1794884339097.jpg',
  '/src/assets/images/prod_pc_desktop_gamer_1794885118149.jpg',
  '/src/assets/images/prod_netbook_usada_1794885117936.jpg',
  '/src/assets/images/prod_xiaomi_redmi_1794885118563.jpg',
  '/src/assets/images/prod_motorola_edge_1794885118131.jpg',
  '/src/assets/images/prod_webcam_4k_1794885118920.jpg',
  '/src/assets/images/prod_hub_soporte_1794885119751.jpg',
  '/src/assets/images/prod_parlante_bt_1794885119636.jpg',
  '/src/assets/images/prod_ssd_externo_1794885120225.jpg',
  '/src/assets/images/prod_monitor_ultrawide_1794885565076.jpg',
  '/src/assets/images/prod_earbuds_tws_1794885565310.jpg',
  '/src/assets/images/prod_microfono_usb_1794885566209.jpg',
  '/src/assets/images/prod_iphone_13_usado_1794885566134.jpg',
  '/src/assets/images/prod_cargador_magsafe_1794885567573.jpg',
  '/src/assets/images/prod_smartwatch_amoled_1794885567350.jpg',
  '/src/assets/images/prod_tablet_pro_1794886081745.jpg',
  '/src/assets/images/prod_router_wifi6e_1794886082541.jpg',
  '/src/assets/images/prod_mousepad_xxl_1794886083272.jpg',
  '/src/assets/images/prod_ram_ddr5_1794886083383.jpg',
  '/src/assets/images/prod_gpu_rtx4070_1794886083006.jpg',
  '/src/assets/images/prod_aro_led_estudio_1794886083975.jpg',
  '/src/assets/images/prod_pixel_8_pro_1794886493232.jpg',
  '/src/assets/images/prod_galaxy_a55_1794886493587.jpg',
  '/src/assets/images/prod_iphone_14_pro_1794886494812.jpg',
  '/src/assets/images/prod_galaxy_flip5_1794886493895.jpg',
  '/src/assets/images/prod_mini_pc_1794886494887.jpg',
  '/src/assets/images/prod_psu_850w_1794886495063.jpg',
  '/src/assets/images/prod_ssd_nvme_intern_1794886495107.jpg',
  '/src/assets/images/prod_motherboard_1794886495241.jpg',
  '/src/assets/images/prod_monitor_oled_1794886495995.jpg',
  '/src/assets/images/prod_monitor_4k_1794886496498.jpg',
  '/src/assets/images/prod_brazo_monitor_1794886496890.jpg',
  '/src/assets/images/prod_gamepad_pro_1794886496704.jpg',
  '/src/assets/images/prod_macropad_1794886497847.jpg',
  '/src/assets/images/prod_stream_deck_1794886497474.jpg',
  '/src/assets/images/prod_tableta_grafica_1794886499203.jpg',
  '/src/assets/images/prod_soundbar_pc_1794886498168.jpg',
  '/src/assets/images/prod_interfaz_audio_1794886498804.jpg',
  '/src/assets/images/prod_cargador_auto_1794886499074.jpg',
  '/src/assets/images/prod_base_cooler_1794886499807.jpg',
  '/src/assets/images/prod_camara_smart_1794886499991.jpg',
];

interface FormState {
  nombre: string;
  precio: string;
  precio_anterior: string;
  estado: 'nuevo' | 'usado';
  categoria: string;
  descripcion: string;
  imagen: string;
  stock: string;
  destacado: boolean;
}

const EMPTY_FORM: FormState = {
  nombre: '',
  precio: '',
  precio_anterior: '',
  estado: 'nuevo',
  categoria: 'Celulares',
  descripcion: '',
  imagen: DEFAULT_IMAGES[0],
  stock: '10',
  destacado: false,
};

export function AdminPage() {
  const { user, token, logout } = useAuth();
  const [tab, setTab] = useState<'productos' | 'consultas'>('productos');
  const [productos, setProductos] = useState<Producto[]>([]);
  const [consultas, setConsultas] = useState<Consulta[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [saving, setSaving] = useState(false);

  const fetchAll = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    setError(null);
    try {
      const [prodRes, consRes] = await Promise.all([
        fetch('/api/productos'),
        fetch('/api/admin/consultas', {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);
      if (prodRes.ok) {
        setProductos(await prodRes.json());
      }
      if (consRes.ok) {
        setConsultas(await consRes.json());
      }
    } catch {
      setError('Error al sincronizar datos con el servidor.');
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  function openCreateModal() {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setModalOpen(true);
  }

  function openEditModal(p: Producto) {
    setEditingId(p.id);
    setForm({
      nombre: p.nombre,
      precio: String(p.precio),
      precio_anterior: p.precio_anterior !== null ? String(p.precio_anterior) : '',
      estado: p.estado,
      categoria: p.categoria,
      descripcion: p.descripcion,
      imagen: p.imagen,
      stock: String(p.stock),
      destacado: Boolean(p.destacado),
    });
    setModalOpen(true);
  }

  async function handleSaveProduct(e: React.FormEvent) {
    e.preventDefault();
    if (!token) return;
    setSaving(true);
    setError(null);

    const payload = {
      nombre: form.nombre,
      precio: Number(form.precio),
      precio_anterior: form.precio_anterior ? Number(form.precio_anterior) : null,
      estado: form.estado,
      categoria: form.categoria,
      descripcion: form.descripcion,
      imagen: form.imagen,
      stock: Number(form.stock || 5),
      destacado: form.destacado,
    };

    try {
      const url = editingId ? `/api/admin/productos/${editingId}` : '/api/admin/productos';
      const method = editingId ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const d = await res.json();
        throw new Error(d.error || 'Error al guardar producto');
      }
      setModalOpen(false);
      await fetchAll();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudo guardar el producto.');
    } finally {
      setSaving(false);
    }
  }

  async function handleDeleteProduct(id: number) {
    if (!token) return;
    try {
      const res = await fetch(`/api/admin/productos/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setProductos((prev) => prev.filter((p) => p.id !== id));
      }
    } catch {
      setError('No se pudo eliminar el producto.');
    }
  }

  async function handleDeleteConsulta(id: number) {
    if (!token) return;
    try {
      const res = await fetch(`/api/admin/consultas/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setConsultas((prev) => prev.filter((c) => c.id !== id));
      }
    } catch {
      setError('No se pudo eliminar la consulta.');
    }
  }

  return (
    <div className="min-h-[75vh] bg-[#050505] py-10 md:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-4 border-b border-white/10 pb-6 sm:flex-row sm:items-center">
          <div>
            <span className="font-display text-xs font-semibold tracking-[0.2em] text-[#00FF55] uppercase">
              Administración
            </span>
            <h1 className="font-display mt-1 text-2xl font-bold text-white sm:text-3xl">
              Panel de Control
            </h1>
            <p className="mt-1 text-xs text-neutral-400">
              Sesión activa: {user?.nombre} ({user?.usuario})
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={openCreateModal}
              className="neon-btn-primary inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-xs whitespace-nowrap"
            >
              <Plus className="h-4 w-4" aria-hidden="true" />
              <span>Nuevo producto</span>
            </button>
            <button
              type="button"
              onClick={logout}
              className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-[#101010] px-4 py-2.5 text-xs font-semibold text-neutral-200 hover:border-red-400/50 hover:text-red-300 whitespace-nowrap"
            >
              <LogOut className="h-4 w-4" aria-hidden="true" />
              <span>Cerrar sesión</span>
            </button>
          </div>
        </div>

        {/* Pestañas */}
        <div className="mt-6 flex items-center gap-2">
          <button
            type="button"
            onClick={() => setTab('productos')}
            className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-semibold transition-colors ${
              tab === 'productos'
                ? 'bg-[#00FF55] text-[#050505]'
                : 'border border-white/12 bg-[#101010] text-neutral-300 hover:text-white'
            }`}
          >
            <Package className="h-4 w-4" aria-hidden="true" />
            <span>Productos ({productos.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setTab('consultas')}
            className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-semibold transition-colors ${
              tab === 'consultas'
                ? 'bg-[#00FF55] text-[#050505]'
                : 'border border-white/12 bg-[#101010] text-neutral-300 hover:text-white'
            }`}
          >
            <MessageSquare className="h-4 w-4" aria-hidden="true" />
            <span>Consultas ({consultas.length})</span>
          </button>
        </div>

        {error && (
          <div className="mt-5 rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-xs text-red-200">
            {error}
          </div>
        )}

        {loading ? (
          <div className="mt-8 h-64 animate-pulse rounded-xl border border-white/10 bg-[#101010]" />
        ) : tab === 'productos' ? (
          <div className="mt-6 overflow-x-auto rounded-xl border border-white/10 bg-[#101010]">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead className="border-b border-white/10 bg-[#151515] text-xs text-neutral-400">
                <tr>
                  <th className="px-5 py-3.5 font-semibold">Producto</th>
                  <th className="px-5 py-3.5 font-semibold">Categoría</th>
                  <th className="px-5 py-3.5 font-semibold">Estado</th>
                  <th className="px-5 py-3.5 font-semibold">Precio</th>
                  <th className="px-5 py-3.5 font-semibold">Stock</th>
                  <th className="px-5 py-3.5 text-right font-semibold">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/8">
                {productos.map((p) => (
                  <tr key={p.id} className="hover:bg-white/[0.02]">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={p.imagen}
                          alt={p.nombre}
                          referrerPolicy="no-referrer"
                          className="h-11 w-14 rounded-md object-cover bg-[#050505]"
                        />
                        <span className="font-medium text-white">{p.nombre}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-neutral-300">{p.categoria}</td>
                    <td className="px-5 py-4">
                      <span
                        className={
                          p.estado === 'nuevo' ? 'text-xs text-[#00FF55]' : 'text-xs text-amber-300'
                        }
                      >
                        {p.estado === 'nuevo' ? 'Nuevo' : 'Usado'}
                      </span>
                    </td>
                    <td className="font-mono-num px-5 py-4 font-semibold text-white">
                      {formatARS(p.precio)}
                    </td>
                    <td className="font-mono-num px-5 py-4 text-neutral-300">{p.stock} u.</td>
                    <td className="px-5 py-4 text-right">
                      <div className="inline-flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => openEditModal(p)}
                          aria-label={`Editar ${p.nombre}`}
                          className="rounded-lg border border-white/12 p-2 text-neutral-300 hover:border-[#00FF55]/50 hover:text-[#00FF55]"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteProduct(p.id)}
                          aria-label={`Eliminar ${p.nombre}`}
                          className="rounded-lg border border-white/12 p-2 text-neutral-300 hover:border-red-500/50 hover:text-red-400"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="mt-6 space-y-4">
            {consultas.length === 0 ? (
              <div className="rounded-xl border border-white/10 bg-[#101010] p-10 text-center text-sm text-neutral-400">
                Todavía no hay consultas registradas.
              </div>
            ) : (
              consultas.map((c) => (
                <div
                  key={c.id}
                  className="flex flex-col justify-between gap-4 rounded-xl border border-white/10 bg-[#101010] p-5 sm:flex-row sm:items-start"
                >
                  <div>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-400">
                      <span className="font-semibold text-[#00FF55]">{c.asunto}</span>
                      <span aria-hidden="true">·</span>
                      <span>{new Date(c.fecha).toLocaleDateString('es-AR')}</span>
                    </div>
                    <h3 className="mt-1 text-base font-semibold text-white">
                      {c.nombre}{' '}
                      <span className="text-xs font-normal text-neutral-400">({c.email})</span>
                    </h3>
                    {c.telefono && (
                      <p className="font-mono-num mt-0.5 text-xs text-neutral-400">
                        Tel: {c.telefono}
                      </p>
                    )}
                    <p className="mt-2.5 text-sm leading-relaxed text-neutral-300">{c.mensaje}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDeleteConsulta(c.id)}
                    aria-label={`Eliminar consulta de ${c.nombre}`}
                    className="self-start rounded-lg border border-white/12 p-2 text-neutral-400 hover:border-red-500/50 hover:text-red-400"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Modal Crear / Editar Producto */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="w-full max-w-lg rounded-2xl border border-[#00FF55]/25 bg-[#101010] p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h2 className="font-display text-lg font-bold text-white">
                {editingId ? 'Editar producto' : 'Nuevo producto'}
              </h2>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="rounded-lg p-1.5 text-neutral-400 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="mt-5 space-y-4">
              <div>
                <label className="block text-xs font-medium text-neutral-300">Nombre</label>
                <input
                  type="text"
                  required
                  value={form.nombre}
                  onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-white/15 bg-[#151515] px-3.5 py-2 text-sm text-white focus:border-[#00FF55] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-neutral-300">
                    Precio actual (ARS)
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={form.precio}
                    onChange={(e) => setForm({ ...form, precio: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-white/15 bg-[#151515] px-3.5 py-2 text-sm text-white focus:border-[#00FF55] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-neutral-300">
                    Precio anterior (opcional)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={form.precio_anterior}
                    onChange={(e) => setForm({ ...form, precio_anterior: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-white/15 bg-[#151515] px-3.5 py-2 text-sm text-white focus:border-[#00FF55] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-medium text-neutral-300">Categoría</label>
                  <select
                    value={form.categoria}
                    onChange={(e) => setForm({ ...form, categoria: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-white/15 bg-[#151515] px-3 py-2 text-sm text-white focus:border-[#00FF55] focus:outline-none"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-neutral-300">Estado</label>
                  <select
                    value={form.estado}
                    onChange={(e) =>
                      setForm({ ...form, estado: e.target.value === 'usado' ? 'usado' : 'nuevo' })
                    }
                    className="mt-1 w-full rounded-lg border border-white/15 bg-[#151515] px-3 py-2 text-sm text-white focus:border-[#00FF55] focus:outline-none"
                  >
                    <option value="nuevo">Nuevo</option>
                    <option value="usado">Usado</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-neutral-300">Stock</label>
                  <input
                    type="number"
                    min="0"
                    value={form.stock}
                    onChange={(e) => setForm({ ...form, stock: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-white/15 bg-[#151515] px-3.5 py-2 text-sm text-white focus:border-[#00FF55] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300">Imagen</label>
                <select
                  value={form.imagen}
                  onChange={(e) => setForm({ ...form, imagen: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-white/15 bg-[#151515] px-3 py-2 text-xs text-white focus:border-[#00FF55] focus:outline-none"
                >
                  {DEFAULT_IMAGES.map((img) => (
                    <option key={img} value={img}>
                      {img.split('/').pop()}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300">Descripción</label>
                <textarea
                  required
                  rows={3}
                  value={form.descripcion}
                  onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-white/15 bg-[#151515] px-3.5 py-2 text-sm text-white focus:border-[#00FF55] focus:outline-none"
                />
              </div>

              <label className="flex items-center gap-2 text-xs text-neutral-300">
                <input
                  type="checkbox"
                  checked={form.destacado}
                  onChange={(e) => setForm({ ...form, destacado: e.target.checked })}
                  className="accent-[#00FF55]"
                />
                <span>Mostrar como producto destacado en portada</span>
              </label>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="rounded-lg border border-white/15 px-4 py-2 text-xs text-neutral-300 hover:text-white"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="neon-btn-primary rounded-lg px-5 py-2 text-xs disabled:opacity-60"
                >
                  {saving ? 'Guardando...' : 'Guardar cambios'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
