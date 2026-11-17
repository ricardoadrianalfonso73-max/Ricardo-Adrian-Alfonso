import { Link } from 'react-router-dom';
import { ArrowRight, Truck, ShieldCheck, Wrench } from 'lucide-react';

const HERO_IMG = '/src/assets/images/hero_smartphones_1794884333244.jpg';
const REPAIR_IMG = '/src/assets/images/servicio_reparacion_1794884334798.jpg';

const BENEFITS = [
  {
    icon: Truck,
    title: 'Envíos a todo el país',
    description:
      'Despachos asegurados con seguimiento en tiempo real para que recibas tu equipo en 24 a 72 horas.',
  },
  {
    icon: ShieldCheck,
    title: 'Compra segura',
    description:
      'Equipos nuevos sellados y usados certificados con 30 puntos de control y garantía escrita.',
  },
  {
    icon: Wrench,
    title: 'Soporte técnico',
    description:
      'Laboratorio propio especializado en microsoldadura, módulos originales y diagnóstico sin cargo.',
  },
];

const CATEGORIES = [
  {
    title: 'CELULARES',
    subtitle: 'Nuevos y usados certificados',
    image: '/src/assets/images/prod_iphone_15_pro_1794884334261.jpg',
    to: '/productos?categoria=Celulares',
  },
  {
    title: 'SERVICIO TÉCNICO',
    subtitle: 'Diagnóstico y reparación profesional',
    image: REPAIR_IMG,
    to: '/servicios',
  },
  {
    title: 'ACCESORIOS',
    subtitle: 'Audio, periféricos, carga y protección',
    image: '/src/assets/images/prod_auriculares_anc_1794884337504.jpg',
    to: '/productos?categoria=Accesorios',
  },
];

export function HomePage() {
  return (
    <div>
      {/* 1. Portada Principal (Hero) */}
      <section className="tech-grid-bg relative overflow-hidden border-b border-[#00FF55]/15 bg-[#050505]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 right-1/4 h-96 w-96 rounded-full bg-[#00FF55]/10 blur-[120px]"
        />
        <div className="mx-auto grid max-w-7xl items-stretch gap-10 px-4 py-14 sm:px-6 md:py-20 lg:grid-cols-12 lg:gap-12 lg:px-8">
          <div className="flex flex-col justify-center lg:col-span-6">
            <span className="font-display text-xs font-semibold tracking-[0.22em] text-[#00FF55] uppercase">
              Electro Tecno
            </span>
            <h1 className="font-display mt-3 text-balance text-[clamp(2.25rem,4.2vw,3.65rem)] font-bold leading-[1.08] text-white">
              Tecnología a tu <span className="text-[#00FF55]">alcance</span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-neutral-300 sm:text-lg">
              Celulares nuevos y usados, reparación y accesorios. Encontrá todo lo que necesitás en
              un solo lugar.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                to="/productos"
                className="neon-btn-primary inline-flex items-center gap-2.5 rounded-lg px-6 py-3.5 text-sm tracking-wide whitespace-nowrap"
              >
                <span>VER PRODUCTOS</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                to="/servicios"
                className="inline-flex items-center gap-2 rounded-lg border border-white/18 bg-[#101010] px-6 py-3.5 text-sm font-semibold text-neutral-100 whitespace-nowrap transition-colors hover:border-[#00FF55]/50 hover:text-[#00FF55]"
              >
                Servicio Técnico
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative h-full min-h-[280px] overflow-hidden rounded-2xl border border-[#00FF55]/25 bg-[#101010] shadow-[0_0_50px_-15px_rgba(0,255,85,0.28)]">
              <img
                src={HERO_IMG}
                alt="Smartphones modernos con iluminación verde en Electro Tecno"
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050505]/70 via-transparent to-transparent"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Beneficios */}
      <section className="border-b border-white/8 bg-[#0b0b0b] py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-3">
            {BENEFITS.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="neon-card flex items-start gap-4 rounded-xl p-6"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-[#00FF55]/30 bg-[#00FF55]/10 text-[#00FF55]">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h2 className="font-display text-base font-bold text-white">{item.title}</h2>
                    <p className="mt-2 text-sm leading-relaxed text-neutral-400">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Nuestras Categorías */}
      <section className="bg-[#050505] py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">
                Nuestras Categorías
              </h2>
              <p className="mt-2 text-sm text-neutral-400">
                Hardware seleccionado y soporte especializado en un mismo ecosistema.
              </p>
            </div>
            <Link
              to="/productos"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#00FF55] hover:underline whitespace-nowrap"
            >
              <span>Explorar catálogo</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.title}
                to={cat.to}
                className="neon-card group relative aspect-[4/3] overflow-hidden rounded-xl"
              >
                <img
                  src={cat.image}
                  alt={cat.title}
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <p className="text-xs text-neutral-300">{cat.subtitle}</p>
                  <div className="mt-1 flex items-center justify-between">
                    <h3 className="font-display text-lg font-bold text-white group-hover:text-[#00FF55] transition-colors">
                      {cat.title}
                    </h3>
                    <ArrowRight
                      className="h-5 w-5 text-[#00FF55] transition-transform duration-200 group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
