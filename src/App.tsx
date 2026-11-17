import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import { AuthProvider } from './context/AuthContext';
import { CartProvider, useCart } from './context/CartContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { CartDrawer } from './components/CartDrawer';
import { ProtectedRoute } from './components/ProtectedRoute';
import { HomePage } from './pages/HomePage';
import { ProductosPage } from './pages/ProductosPage';
import { ServiciosPage } from './pages/ServiciosPage';
import { ContactoPage } from './pages/ContactoPage';
import { LoginPage } from './pages/LoginPage';
import { AdminPage } from './pages/AdminPage';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function CartToast() {
  const { lastAddedMessage, setCartOpen } = useCart();
  if (!lastAddedMessage) return null;

  return (
    <div
      role="status"
      className="fixed right-4 bottom-4 z-50 flex items-center gap-3 rounded-xl border border-[#00FF55]/45 bg-[#101010] px-4 py-3 text-xs text-white shadow-[0_12px_32px_rgba(0,0,0,0.65)]"
    >
      <CheckCircle2 className="h-4 w-4 shrink-0 text-[#00FF55]" aria-hidden="true" />
      <span>{lastAddedMessage}</span>
      <button
        type="button"
        onClick={() => setCartOpen(true)}
        className="font-semibold text-[#00FF55] hover:underline whitespace-nowrap"
      >
        Ver carrito
      </button>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <ScrollToTop />
          <div className="flex min-h-screen flex-col bg-[#050505] text-neutral-100">
            <Header />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/productos" element={<ProductosPage />} />
                <Route path="/servicios" element={<ServiciosPage />} />
                <Route path="/contacto" element={<ContactoPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route
                  path="/admin"
                  element={
                    <ProtectedRoute>
                      <AdminPage />
                    </ProtectedRoute>
                  }
                />
                <Route path="*" element={<HomePage />} />
              </Routes>
            </main>
            <Footer />
            <CartDrawer />
            <CartToast />
          </div>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
