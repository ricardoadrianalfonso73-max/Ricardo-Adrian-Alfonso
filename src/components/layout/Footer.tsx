import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone, Instagram, MessageCircle } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-[#00FF55]/18 bg-[#080808] text-neutral-400">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Marca */}
          <div>
            <Link
              to="/"
              className="font-display inline-flex items-center gap-2.5 text-lg font-bold tracking-wider text-white"
            >
              <svg viewBox="0 0 32 32" fill="none" className="h-6 w-6 shrink-0" aria-hidden="true">
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
                <path d="M17.5 7L10 17.5H16L14.5 25L22 14.5H16L17.5 7Z" fill="#00FF55" />
              </svg>
              <span>
                ELECTRO <span className="text-[#00FF55]">TECNO</span>
              </span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-neutral-400">
              Tienda especializada en smartphones nuevos y usados certificados, hardware de alto
              rendimiento, periféricos y servicio técnico profesional.
            </p>
            <div className="mt-5 flex items-center gap-3">
              <a
                href="https://wa.me/5491155428810"
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp Electro Tecno"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/12 bg-[#101010] text-neutral-300 transition-colors hover:border-[#00FF55]/50 hover:text-[#00FF55]"
              >
                <MessageCircle className="h-4 w-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram Electro Tecno"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/12 bg-[#101010] text-neutral-300 transition-colors hover:border-[#00FF55]/50 hover:text-[#00FF55]"
              >
                <Instagram className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Navegación */}
          <div>
            <h3 className="font-display text-xs font-bold tracking-wider text-white uppercase">
              Navegación
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link to="/" className="hover:text-[#00FF55] transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link to="/productos" className="hover:text-[#00FF55] transition-colors">
                  Productos
                </Link>
              </li>
              <li>
                <Link
                  to="/productos?ofertas=true"
                  className="hover:text-[#00FF55] transition-colors"
                >
                  Ofertas
                </Link>
              </li>
              <li>
                <Link to="/servicios" className="hover:text-[#00FF55] transition-colors">
                  Servicio Técnico
                </Link>
              </li>
              <li>
                <Link to="/contacto" className="hover:text-[#00FF55] transition-colors">
                  Contacto
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-[#00FF55] transition-colors">
                  Acceso Administrador
                </Link>
              </li>
            </ul>
          </div>

          {/* Categorías */}
          <div>
            <h3 className="font-display text-xs font-bold tracking-wider text-white uppercase">
              Categorías
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link
                  to="/productos?categoria=Celulares"
                  className="hover:text-[#00FF55] transition-colors"
                >
                  Celulares Nuevos y Usados
                </Link>
              </li>
              <li>
                <Link
                  to="/productos?categoria=Notebooks%20y%20PC"
                  className="hover:text-[#00FF55] transition-colors"
                >
                  Notebooks y PC
                </Link>
              </li>
              <li>
                <Link
                  to="/productos?categoria=Monitores"
                  className="hover:text-[#00FF55] transition-colors"
                >
                  Monitores
                </Link>
              </li>
              <li>
                <Link
                  to="/productos?categoria=Perif%C3%A9ricos"
                  className="hover:text-[#00FF55] transition-colors"
                >
                  Teclados y Mouse
                </Link>
              </li>
              <li>
                <Link
                  to="/productos?categoria=Accesorios"
                  className="hover:text-[#00FF55] transition-colors"
                >
                  Cargadores y Fundas
                </Link>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="font-display text-xs font-bold tracking-wider text-white uppercase">
              Contacto
            </h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#00FF55]" aria-hidden="true" />
                <span>Av. Tecnológica 1450, Buenos Aires</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 shrink-0 text-[#00FF55]" aria-hidden="true" />
                <span>+54 9 11 5542-8810</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 shrink-0 text-[#00FF55]" aria-hidden="true" />
                <span>contacto@electrotecno.com.ar</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/8 pt-7 text-xs text-neutral-500 sm:flex-row">
          <p>© 2026 Electro Tecno. Todos los derechos reservados.</p>
          <p>Proyecto Final · Práctica Profesional II</p>
        </div>
      </div>
    </footer>
  );
}
