import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, CheckCircle2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatARS } from '../utils/format';

interface OrderReceipt {
  code: string;
  nombre: string;
  telefono: string;
  entrega: string;
  total: number;
}

export function CartDrawer() {
  const { items, subtotal, isCartOpen, setCartOpen, updateQuantity, removeFromCart, clearCart } =
    useCart();
  const [orderConfirmed, setOrderConfirmed] = useState<OrderReceipt | null>(null);
  const [checkoutMode, setCheckoutMode] = useState(false);
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [entrega, setEntrega] = useState('Envío a domicilio');
  const [direccion, setDireccion] = useState('');

  if (!isCartOpen) return null;

  function handleConfirmOrder(e: React.FormEvent) {
    e.preventDefault();
    const code = `ET-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderConfirmed({
      code,
      nombre: nombre.trim() || 'Cliente',
      telefono: telefono.trim() || '-',
      entrega: entrega === 'Envío a domicilio' && direccion.trim() ? `${entrega} (${direccion.trim()})` : entrega,
      total: subtotal,
    });
    setCheckoutMode(false);
    clearCart();
  }

  function handleClose() {
    setOrderConfirmed(null);
    setCheckoutMode(false);
    setCartOpen(false);
  }

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/75 backdrop-blur-sm"
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-label="Carrito y compra"
    >
      <aside
        className="flex h-full w-full max-w-md flex-col border-l border-[#00FF55]/25 bg-[#101010] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="h-5 w-5 text-[#00FF55]" aria-hidden="true" />
            <h2 className="font-display text-base font-bold text-white">
              {checkoutMode ? 'Finalizar Compra' : 'Tu Carrito'}
            </h2>
          </div>
          <button
            type="button"
            onClick={handleClose}
            aria-label="Cerrar carrito"
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-neutral-300 hover:border-[#00FF55]/50 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {orderConfirmed ? (
            <div className="flex flex-col items-center justify-center rounded-xl border border-[#00FF55]/35 bg-[#151515] p-7 text-center">
              <CheckCircle2 className="h-12 w-12 text-[#00FF55]" aria-hidden="true" />
              <h3 className="font-display mt-4 text-lg font-bold text-white">
                Compra confirmada
              </h3>
              <p className="font-mono-num mt-2 text-sm text-[#00FF55]">
                Orden #{orderConfirmed.code}
              </p>
              <div className="mt-4 w-full space-y-1.5 border-t border-white/10 pt-4 text-left text-xs text-neutral-300">
                <p>
                  <span className="text-neutral-500">Titular:</span> {orderConfirmed.nombre}
                </p>
                <p>
                  <span className="text-neutral-500">Contacto:</span> {orderConfirmed.telefono}
                </p>
                <p>
                  <span className="text-neutral-500">Modalidad:</span> {orderConfirmed.entrega}
                </p>
                <p className="font-mono-num pt-1 font-semibold text-white">
                  Total: {formatARS(orderConfirmed.total)}
                </p>
              </div>
              <p className="mt-4 text-xs leading-relaxed text-neutral-400">
                Nuestro equipo comercial se comunicará por WhatsApp para coordinar el pago y
                despacho inmediato.
              </p>
              <button
                type="button"
                onClick={handleClose}
                className="neon-btn-primary mt-6 rounded-lg px-5 py-2.5 text-xs"
              >
                Seguir explorando
              </button>
            </div>
          ) : items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <ShoppingBag className="h-12 w-12 text-neutral-600" aria-hidden="true" />
              <p className="mt-4 text-base font-medium text-neutral-300">Tu carrito está vacío</p>
              <p className="mt-1 text-sm text-neutral-500">
                Agregá o comprá celulares, notebooks o accesorios desde el catálogo.
              </p>
            </div>
          ) : checkoutMode ? (
            <form id="checkout-form" onSubmit={handleConfirmOrder} className="space-y-4">
              <div className="rounded-xl border border-white/10 bg-[#151515] p-4 text-xs text-neutral-300">
                <p className="font-semibold text-white">Resumen ({items.length} ítem/s)</p>
                <p className="font-mono-num mt-1 text-sm font-bold text-[#00FF55]">
                  Total a pagar: {formatARS(subtotal)}
                </p>
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300">
                  Nombre completo *
                </label>
                <input
                  type="text"
                  required
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  placeholder="Ej: Sofía Pereyra"
                  className="mt-1.5 w-full rounded-lg border border-white/15 bg-[#151515] px-3.5 py-2.5 text-sm text-white placeholder:text-neutral-500 focus:border-[#00FF55] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300">
                  WhatsApp / Teléfono *
                </label>
                <input
                  type="tel"
                  required
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                  placeholder="+54 9 11 ..."
                  className="mt-1.5 w-full rounded-lg border border-white/15 bg-[#151515] px-3.5 py-2.5 text-sm text-white placeholder:text-neutral-500 focus:border-[#00FF55] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300">
                  Forma de entrega
                </label>
                <select
                  value={entrega}
                  onChange={(e) => setEntrega(e.target.value)}
                  className="mt-1.5 w-full rounded-lg border border-white/15 bg-[#151515] px-3.5 py-2.5 text-sm text-white focus:border-[#00FF55] focus:outline-none"
                >
                  <option value="Envío a domicilio">Envío a domicilio (todo el país)</option>
                  <option value="Retiro en local">Retiro en local (Av. Tecnológica 1450)</option>
                </select>
              </div>

              {entrega === 'Envío a domicilio' && (
                <div>
                  <label className="block text-xs font-medium text-neutral-300">
                    Dirección y localidad *
                  </label>
                  <input
                    type="text"
                    required
                    value={direccion}
                    onChange={(e) => setDireccion(e.target.value)}
                    placeholder="Calle, número, ciudad y CP"
                    className="mt-1.5 w-full rounded-lg border border-white/15 bg-[#151515] px-3.5 py-2.5 text-sm text-white placeholder:text-neutral-500 focus:border-[#00FF55] focus:outline-none"
                  />
                </div>
              )}
            </form>
          ) : (
            <ul className="space-y-4">
              {items.map(({ producto, cantidad }) => (
                <li
                  key={producto.id}
                  className="flex gap-4 rounded-xl border border-white/10 bg-[#151515] p-3.5"
                >
                  <img
                    src={producto.imagen}
                    alt={producto.nombre}
                    referrerPolicy="no-referrer"
                    className="h-20 w-20 shrink-0 rounded-lg object-cover bg-[#050505]"
                  />
                  <div className="flex flex-1 flex-col justify-between">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="text-sm font-semibold text-white leading-snug">
                          {producto.nombre}
                        </h3>
                        <p className="font-mono-num mt-1 text-xs text-[#00FF55]">
                          {formatARS(producto.precio)}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFromCart(producto.id)}
                        aria-label={`Quitar ${producto.nombre}`}
                        className="text-neutral-500 hover:text-red-400"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center gap-2 rounded-md border border-white/10 bg-[#101010] px-1.5 py-0.5">
                        <button
                          type="button"
                          onClick={() => updateQuantity(producto.id, cantidad - 1)}
                          aria-label="Restar unidad"
                          className="flex h-7 w-7 items-center justify-center text-neutral-300 hover:text-white"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="font-mono-num min-w-[20px] text-center text-xs font-semibold text-white">
                          {cantidad}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(producto.id, cantidad + 1)}
                          aria-label="Sumar unidad"
                          className="flex h-7 w-7 items-center justify-center text-neutral-300 hover:text-white"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>

                      <span className="font-mono-num text-sm font-semibold text-white">
                        {formatARS(producto.precio * cantidad)}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && !orderConfirmed && (
          <div className="border-t border-white/10 bg-[#0d0d0d] p-6">
            {checkoutMode ? (
              <div className="flex gap-2.5">
                <button
                  type="button"
                  onClick={() => setCheckoutMode(false)}
                  className="rounded-lg border border-white/15 px-4 py-3 text-xs font-semibold text-neutral-300 hover:text-white"
                >
                  Volver
                </button>
                <button
                  type="submit"
                  form="checkout-form"
                  className="neon-btn-primary flex-1 rounded-lg py-3 text-sm"
                >
                  Confirmar compra
                </button>
              </div>
            ) : (
              <>
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-sm text-neutral-400">Subtotal estimado</span>
                  <span className="font-mono-num text-xl font-bold text-[#00FF55]">
                    {formatARS(subtotal)}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setCheckoutMode(true)}
                  className="neon-btn-primary w-full rounded-lg py-3 text-sm"
                >
                  Finalizar compra
                </button>
                <button
                  type="button"
                  onClick={clearCart}
                  className="mt-2.5 w-full rounded-lg border border-white/10 py-2 text-xs text-neutral-400 hover:border-white/25 hover:text-white"
                >
                  Vaciar carrito
                </button>
              </>
            )}
          </div>
        )}
      </aside>
    </div>
  );
}
