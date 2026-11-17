import { useEffect, useState } from 'react';
import { X, ShoppingCart, ShieldCheck, Truck, Cpu, Minus, Plus } from 'lucide-react';
import type { Producto } from '../types';
import { calcDiscountPercent, formatARS } from '../utils/format';
import { useCart } from '../context/CartContext';

interface ProductDetailModalProps {
  producto: Producto | null;
  onClose: () => void;
}

export function ProductDetailModal({ producto, onClose }: ProductDetailModalProps) {
  const { addToCart, setCartOpen } = useCart();
  const [qty, setQty] = useState(1);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    setQty(1);
    setImgError(false);
  }, [producto]);

  useEffect(() => {
    if (!producto) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [producto, onClose]);

  if (!producto) return null;
  const discount = calcDiscountPercent(producto.precio, producto.precio_anterior);

  function handleAddAndOpen() {
    if (!producto) return;
    addToCart(producto, qty);
    onClose();
    setCartOpen(true);
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="pdp-title"
    >
      <div
        className="relative grid w-full max-w-4xl overflow-hidden rounded-2xl border border-[#00FF55]/25 bg-[#101010] shadow-2xl md:grid-cols-2"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar detalle de producto"
          className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-lg border border-white/15 bg-[#050505]/85 text-neutral-300 transition-colors hover:border-[#00FF55]/50 hover:text-[#00FF55]"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="relative flex aspect-[4/3] items-center justify-center bg-[#151515] md:aspect-auto md:min-h-[380px]">
          {!imgError ? (
            <img
              src={producto.imagen}
              alt={producto.nombre}
              referrerPolicy="no-referrer"
              onError={() => setImgError(true)}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex flex-col items-center gap-2 text-neutral-400">
              <Cpu className="h-10 w-10 text-[#00FF55]" />
              <span className="text-sm">{producto.nombre}</span>
            </div>
          )}
          {discount !== null && (
            <span className="font-mono-num absolute top-4 left-4 rounded-md bg-[#00FF55] px-3 py-1 text-xs font-bold text-[#050505]">
              -{discount}% OFF
            </span>
          )}
        </div>

        <div className="flex flex-col justify-between p-6 md:p-8">
          <div>
            <div className="mb-2 flex items-center gap-2 text-xs text-neutral-400">
              <span>{producto.categoria}</span>
              <span aria-hidden="true">·</span>
              <span className={producto.estado === 'nuevo' ? 'text-[#00FF55]' : 'text-amber-300'}>
                {producto.estado === 'nuevo' ? 'Producto Nuevo' : 'Usado Certificado'}
              </span>
              <span aria-hidden="true">·</span>
              <span>Stock: {producto.stock} u.</span>
            </div>

            <h2 id="pdp-title" className="font-display text-xl font-bold text-white md:text-2xl">
              {producto.nombre}
            </h2>

            <div className="mt-4 flex items-baseline gap-3">
              <span className="font-mono-num text-2xl font-bold text-[#00FF55]">
                {formatARS(producto.precio)}
              </span>
              {producto.precio_anterior !== null && producto.precio_anterior > producto.precio && (
                <span className="font-mono-num text-sm text-neutral-500 line-through">
                  {formatARS(producto.precio_anterior)}
                </span>
              )}
            </div>

            <p className="mt-4 text-sm leading-relaxed text-neutral-300">{producto.descripcion}</p>

            <div className="mt-6 space-y-2.5 border-t border-white/10 pt-5 text-xs text-neutral-300">
              <div className="flex items-center gap-2.5">
                <Truck className="h-4 w-4 text-[#00FF55]" aria-hidden="true" />
                <span>Envíos asegurados a todo el país en 24–72 h hábiles</span>
              </div>
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="h-4 w-4 text-[#00FF55]" aria-hidden="true" />
                <span>Garantía escrita y soporte técnico oficial Electro Tecno</span>
              </div>
            </div>
          </div>

          <div className="mt-7 flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-between rounded-lg border border-white/15 bg-[#151515] px-2 py-1.5 w-32 shrink-0">
                <button
                  type="button"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  aria-label="Disminuir cantidad"
                  className="flex h-8 w-8 items-center justify-center rounded text-neutral-300 hover:bg-white/5 hover:text-white"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="font-mono-num text-sm font-semibold text-white">{qty}</span>
                <button
                  type="button"
                  onClick={() => setQty((q) => Math.min(producto.stock || 20, q + 1))}
                  aria-label="Aumentar cantidad"
                  className="flex h-8 w-8 items-center justify-center rounded text-neutral-300 hover:bg-white/5 hover:text-white"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>

              <button
                type="button"
                onClick={handleAddAndOpen}
                className="neon-btn-primary inline-flex flex-1 items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm whitespace-nowrap"
              >
                <span>Comprar ahora</span>
              </button>
            </div>

            <button
              type="button"
              onClick={() => {
                addToCart(producto, qty);
                onClose();
              }}
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-[#00FF55]/35 bg-[#00FF55]/10 px-5 py-2.5 text-xs font-semibold text-[#00FF55] transition-colors hover:bg-[#00FF55]/20 whitespace-nowrap"
            >
              <ShoppingCart className="h-4 w-4" aria-hidden="true" />
              <span>Agregar al carrito</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
