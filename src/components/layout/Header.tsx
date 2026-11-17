import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, Menu, X, UserCheck, Lock } from 'lucide-react';
import { Nav } from './Nav';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

export function Header() {
  const { totalItems, setCartOpen } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  function handleSearchSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = searchQuery.trim();
    setSearchOpen(false);
    setMobileOpen(false);
    if (trimmed) {
      navigate(`/productos?q=${encodeURIComponent(trimmed)}`);
    } else {
      navigate('/productos');
    }
  }

  return (
    <header className="sticky top-0 z-40 border-b border-[#00FF55]/18 bg-[#050505]/92 backdrop-blur-md">
      <div className="mx-auto flex h-[68px] max-w-7xl items-center justify-between gap-8 px-4 sm:px-6 lg:px-8">
        {/* Zona 1: Brand mark */}
        <Link
          to="/"
          className="font-display flex items-center gap-2.5 text-lg font-bold tracking-wider text-white whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00FF55]"
        >
          <svg
            viewBox="0 0 32 32"
            fill="none"
            className="h-7 w-7 shrink-0"
            aria-hidden="true"
          >
            <rect
              x="2"
              y="2"
              width="28"
              height="28"
              rx="6"
              stroke="#00FF55"
              strokeWidth="2"
              fill="#101010"
            />
            <path
              d="M17.5 7L10 17.5H16L14.5 25L22 14.5H16L17.5 7Z"
              fill="#00FF55"
            />
          </svg>
          <span>
            ELECTRO <span className="text-[#00FF55]">TECNO</span>
          </span>
        </Link>

        {/* Zona 2: Navigation links */}
        <Nav />

        {/* Zona 3: Search, Cart, Account & Mobile trigger */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={() => setSearchOpen((prev) => !prev)}
            aria-label="Buscar productos"
            aria-expanded={searchOpen}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/12 bg-[#101010] text-neutral-300 transition-colors hover:border-[#00FF55]/50 hover:text-[#00FF55]"
          >
            <Search className="h-4 w-4" />
          </button>

          <button
            type="button"
            onClick={() => setCartOpen(true)}
            aria-label={`Abrir carrito (${totalItems} productos)`}
            className="relative flex h-10 items-center gap-2 rounded-lg border border-white/12 bg-[#101010] px-3 text-neutral-200 transition-colors hover:border-[#00FF55]/50 hover:text-[#00FF55] whitespace-nowrap shrink-0"
          >
            <ShoppingCart className="h-4 w-4" />
            <span className="font-mono-num text-xs font-bold">{totalItems}</span>
          </button>

          <Link
            to={user ? '/admin' : '/login'}
            className="hidden sm:inline-flex h-10 items-center gap-2 rounded-lg border border-[#00FF55]/35 bg-[#00FF55]/10 px-3.5 text-xs font-semibold text-[#00FF55] transition-colors hover:bg-[#00FF55] hover:text-[#050505] whitespace-nowrap shrink-0"
          >
            {user ? (
              <>
                <UserCheck className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Panel Admin</span>
              </>
            ) : (
              <>
                <Lock className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Ingresar</span>
              </>
            )}
          </Link>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={mobileOpen}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/12 bg-[#101010] text-neutral-200 lg:hidden"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Expandable Search Bar */}
      {searchOpen && (
        <div className="border-t border-white/10 bg-[#0d0d0d] px-4 py-3 sm:px-6 lg:px-8">
          <form onSubmit={handleSearchSubmit} className="mx-auto flex max-w-2xl gap-2">
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar celulares, notebooks, monitores, auriculares..."
              autoFocus
              className="flex-1 rounded-lg border border-white/15 bg-[#151515] px-4 py-2 text-sm text-white placeholder:text-neutral-500 focus:border-[#00FF55] focus:outline-none"
            />
            <button
              type="submit"
              className="neon-btn-primary rounded-lg px-5 py-2 text-xs whitespace-nowrap"
            >
              Buscar
            </button>
          </form>
        </div>
      )}

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="border-t border-white/10 bg-[#0c0c0c] px-4 py-4 lg:hidden">
          <Nav mobile onNavigate={() => setMobileOpen(false)} />
          <div className="mt-3 border-t border-white/10 pt-3">
            <Link
              to={user ? '/admin' : '/login'}
              onClick={() => setMobileOpen(false)}
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-[#00FF55]/40 bg-[#00FF55]/10 px-4 py-2.5 text-sm font-semibold text-[#00FF55]"
            >
              {user ? 'Panel Administrador' : 'Ingresar / Admin'}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
