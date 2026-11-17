import React, { createContext, useContext, useEffect, useState } from 'react';
import type { CartItem, Producto } from '../types';

interface CartContextValue {
  items: CartItem[];
  totalItems: number;
  subtotal: number;
  isCartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  addToCart: (producto: Producto, cantidad?: number) => void;
  updateQuantity: (productId: number, cantidad: number) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
  lastAddedMessage: string | null;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);
const CART_KEY = 'electro_tecno_cart_v1';

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const raw = localStorage.getItem(CART_KEY);
      return raw ? (JSON.parse(raw) as CartItem[]) : [];
    } catch {
      return [];
    }
  });
  const [isCartOpen, setCartOpen] = useState(false);
  const [lastAddedMessage, setLastAddedMessage] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    if (!lastAddedMessage) return;
    const t = setTimeout(() => setLastAddedMessage(null), 2600);
    return () => clearTimeout(t);
  }, [lastAddedMessage]);

  function addToCart(producto: Producto, cantidad = 1): void {
    setItems((prev) => {
      const existing = prev.find((item) => item.producto.id === producto.id);
      if (existing) {
        return prev.map((item) =>
          item.producto.id === producto.id
            ? { ...item, cantidad: Math.min(producto.stock || 99, item.cantidad + cantidad) }
            : item,
        );
      }
      return [...prev, { producto, cantidad }];
    });
    setLastAddedMessage(`${producto.nombre} agregado al carrito`);
  }

  function updateQuantity(productId: number, cantidad: number): void {
    if (cantidad <= 0) {
      removeFromCart(productId);
      return;
    }
    setItems((prev) =>
      prev.map((item) => (item.producto.id === productId ? { ...item, cantidad } : item)),
    );
  }

  function removeFromCart(productId: number): void {
    setItems((prev) => prev.filter((item) => item.producto.id !== productId));
  }

  function clearCart(): void {
    setItems([]);
  }

  const totalItems = items.reduce((acc, item) => acc + item.cantidad, 0);
  const subtotal = items.reduce((acc, item) => acc + item.producto.precio * item.cantidad, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        totalItems,
        subtotal,
        isCartOpen,
        setCartOpen,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        lastAddedMessage,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart debe utilizarse dentro de CartProvider');
  return ctx;
}
