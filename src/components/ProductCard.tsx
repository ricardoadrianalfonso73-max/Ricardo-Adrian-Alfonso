import { useState } from 'react';
import { Eye, ShoppingCart, Cpu, CreditCard } from 'lucide-react';
import type { Producto } from '../types';
import { calcDiscountPercent, formatARS } from '../utils/format';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  producto: Producto;
  onSelect: (producto: Producto) => void;
}

export function ProductCard({ producto, onSelect }: ProductCardProps) {
  const { addToCart, setCartOpen } = useCart();
  const [imgError, setImgError] = useState(false);
  const discount = calcDiscountPercent(producto.precio, producto.precio_anterior);

  function handleBuyNow() {
    addToCart(producto, 1);
    setCartOpen(true);
  }

  return (
    <article className="neon-card group flex flex-col overflow-hidden rounded-xl">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#151515]">
        {!imgError ? (
          <img
            src={producto.imagen}
            alt={producto.nombre}
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
            className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-[#101010] to-[#1a1a1a] p-4 text-center">
            <Cpu className="h-8 w-8 text-[#00FF55]" aria-hidden="true" />
            <span className="text-xs font-medium text-neutral-400">{producto.nombre}</span>
          </div>
        )}

        {discount !== null && (
          <span className="font-mono-num absolute top-3 right-3 rounded-md bg-[#00FF55] px-2.5 py-1 text-xs font-bold tracking-tight text-[#050505] shadow-[0_0_16px_rgba(0,255,85,0.45)]">
            -{discount}% OFF
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col justify-between p-5">
        <div>
          <div className="mb-2 flex items-center gap-2 text-xs text-neutral-400">
            <span>{producto.categoria}</span>
            <span aria-hidden="true">·</span>
            <span className={producto.estado === 'nuevo' ? 'text-[#00FF55]' : 'text-amber-300'}>
              {producto.estado === 'nuevo' ? 'Nuevo' : 'Usado certificado'}
            </span>
          </div>

          <h3 className="font-sans text-base font-semibold leading-snug text-white">
            {producto.nombre}
          </h3>

          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-neutral-400">
            {producto.descripcion}
          </p>
        </div>

        <div className="mt-5 border-t border-white/8 pt-4">
          <div className="mb-4 flex items-baseline gap-2.5">
            <span className="font-mono-num text-xl font-bold text-white">
              {formatARS(producto.precio)}
            </span>
            {producto.precio_anterior !== null && producto.precio_anterior > producto.precio && (
              <span className="font-mono-num text-xs text-neutral-500 line-through">
                {formatARS(producto.precio_anterior)}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <button
              type="button"
              onClick={handleBuyNow}
              className="neon-btn-primary inline-flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-xs whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00FF55]"
            >
              <CreditCard className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              <span>Comprar</span>
            </button>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => addToCart(producto, 1)}
                className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-[#00FF55]/35 bg-[#00FF55]/8 px-3 py-2 text-xs font-semibold text-[#00FF55] whitespace-nowrap transition-colors hover:bg-[#00FF55]/18 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00FF55]"
              >
                <ShoppingCart className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                <span>Agregar</span>
              </button>

              <button
                type="button"
                onClick={() => onSelect(producto)}
                className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-white/15 bg-[#151515] px-3 py-2 text-xs font-medium text-neutral-200 whitespace-nowrap transition-colors hover:border-[#00FF55]/50 hover:text-[#00FF55] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00FF55]"
              >
                <Eye className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                <span>Ver producto</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
