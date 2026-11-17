import { Link } from 'react-router-dom';
import {
  Smartphone,
  BatteryCharging,
  Cpu,
  Laptop,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';

const REPAIR_IMG = '/src/assets/images/servicio_reparacion_1794884334798.jpg';

const SERVICES = [
  {
    icon: Smartphone,
    title: 'Cambio de Módulos y Cristales',
    description:
      'Reemplazo de pantallas OLED y LCD originales con calibración de brillo, Face ID y lector de huellas bajo display.',
    time: 'En el día',
  },
  {
    icon: BatteryCharging,
    title: 'Baterías y Pines de Carga',
    description:
      'Sustitución de celdas degradadas, limpieza ultrasónica de puertos USB-C / Lightning y recuperación de carga rápida.',
    time: '2 a 4 horas',
  },
  {
    icon: Cpu,
    title: 'Microsoldadura de Placa',
    description:
      'Diagnóstico térmico, reparación de circuitos de carga (IC Tristar / PMIC) y recuperación de equipos con humedad.',
    time: '24 a 72 horas',
  },
  {
    icon: Laptop,
    title: 'Notebooks y PC de Escritorio',
    description:
      'Mantenimiento térmico con pasta de alta conductividad, upgrades a SSD NVMe, ampliación de memoria RAM y BIOS.',
    time: '24 horas',
  },
];

const STEPS = [
  {
    step: '01. Diagnóstico técnico',
    detail: 'Revisamos tu equipo en nuestro laboratorio sin costo inicial para detectar la falla exacta.',
  },
  {
    step: '02. Presupuesto transparente',
    detail: 'Confirmamos costo final, calidad del repuesto y plazo estimado antes de intervenir.',
  },
  {
    step: '03. Reparación y garantía',
    detail: 'Realizamos pruebas de estrés y entregamos el dispositivo con garantía escrita de 90 días.',
  },
];

export function ServiciosPage() {
  return (
    <div className="bg-[#050505]">
      {/* Hero Servicio Técnico */}
      <section className="border-b border-[#00FF55]/15 bg-[#080808] py-14 md:py-20">
        <div className="mx-auto grid max-w-7xl items-stretch gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
          <div className="flex flex-col justify-center lg:col-span-6">
            <span className="font-display text-xs font-semibold tracking-[0.2em] text-[#00FF55] uppercase">
              Servicio Técnico Certificado
            </span>
            <h1 className="font-display mt-3 text-balance text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
              Le damos una segunda vida a tu celular
            </h1>
            <p className="mt-5 text-base leading-relaxed text-neutral-300">
              Realizamos diagnósticos y reparaciones para que tu dispositivo vuelva a funcionar
              correctamente. Contamos con instrumental de precisión y repuestos garantizados.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/contacto?asunto=Servicio%20T%C3%A9cnico"
                className="neon-btn-primary inline-flex items-center gap-2 rounded-lg px-6 py-3.5 text-xs tracking-wide whitespace-nowrap"
              >
                <span>CONSULTAR SERVICIO TÉCNICO</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                to="/productos?categoria=Celulares"
                className="inline-flex items-center rounded-lg border border-white/15 bg-[#101010] px-5 py-3.5 text-xs font-semibold text-neutral-200 transition-colors hover:border-[#00FF55]/50 hover:text-[#00FF55] whitespace-nowrap"
              >
                Ver equipos en stock
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="h-full min-h-[280px] overflow-hidden rounded-2xl border border-[#00FF55]/25 bg-[#101010]">
              <img
                src={REPAIR_IMG}
                alt="Laboratorio técnico de reparación Electro Tecno"
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Especialidades */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">
            Especialidades del Laboratorio
          </h2>
          <p className="mt-2 text-sm text-neutral-400">
            Cobertura completa para smartphones iOS/Android, tablets y notebooks.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {SERVICES.map((srv) => {
              const Icon = srv.icon;
              return (
                <div key={srv.title} className="neon-card rounded-xl p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-[#00FF55]/30 bg-[#00FF55]/10 text-[#00FF55]">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <span className="font-mono-num text-xs text-[#00FF55]">{srv.time}</span>
                  </div>
                  <h3 className="font-display mt-5 text-lg font-bold text-white">{srv.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-400">
                    {srv.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Flujo de trabajo */}
      <section className="border-t border-white/8 bg-[#101010] py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-bold text-white">Cómo trabajamos</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {STEPS.map((item) => (
              <div
                key={item.step}
                className="rounded-xl border border-white/10 bg-[#151515] p-6"
              >
                <div className="flex items-center gap-2 text-sm font-semibold text-[#00FF55]">
                  <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>{item.step}</span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-neutral-300">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
