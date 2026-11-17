import { NavLink } from 'react-router-dom';

interface NavProps {
  mobile?: boolean;
  onNavigate?: () => void;
}

const NAV_ITEMS = [
  { to: '/', label: 'Inicio', end: true },
  { to: '/productos', label: 'Productos' },
  { to: '/servicios', label: 'Servicio Técnico' },
  { to: '/contacto', label: 'Contacto' },
];

export function Nav({ mobile = false, onNavigate }: NavProps) {
  if (mobile) {
    return (
      <nav aria-label="Navegación móvil" className="flex flex-col gap-1">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            onClick={onNavigate}
            className={({ isActive }) =>
              `rounded-lg px-4 py-3 text-sm font-medium transition-colors whitespace-nowrap ${
                isActive
                  ? 'bg-[#00FF55]/12 text-[#00FF55]'
                  : 'text-neutral-300 hover:bg-white/5 hover:text-white'
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    );
  }

  return (
    <nav aria-label="Navegación principal" className="hidden lg:flex items-center gap-7">
      {NAV_ITEMS.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.end}
          className={({ isActive }) =>
            `relative py-2 text-sm font-medium whitespace-nowrap shrink-0 transition-colors after:absolute after:right-0 after:bottom-0 after:left-0 after:h-[2px] after:bg-[#00FF55] after:transition-transform after:duration-200 ${
              isActive
                ? 'text-[#00FF55] after:scale-x-100'
                : 'text-neutral-300 hover:text-white after:scale-x-0 hover:after:scale-x-100'
            }`
          }
        >
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
}
