import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Mail, MapPin, Phone, Clock, Send, CheckCircle2, MessageCircle } from 'lucide-react';

export function ContactoPage() {
  const [searchParams] = useSearchParams();
  const initialAsunto = searchParams.get('asunto') || 'Consulta general';

  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [asunto, setAsunto] = useState(initialAsunto);
  const [mensaje, setMensaje] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    const paramAsunto = searchParams.get('asunto');
    if (paramAsunto) setAsunto(paramAsunto);
  }, [searchParams]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!nombre.trim() || !email.trim() || !mensaje.trim()) {
      setError('Completá tu nombre, correo electrónico y mensaje.');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/contacto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, email, telefono, asunto, mensaje }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'No se pudo enviar la consulta.');
      }

      setSuccess(data.message || 'Consulta registrada correctamente en nuestra base de datos.');
      setNombre('');
      setEmail('');
      setTelefono('');
      setMensaje('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error de conexión con el servidor.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-[75vh] bg-[#050505] py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="border-b border-white/10 pb-8">
          <span className="font-display text-xs font-semibold tracking-[0.2em] text-[#00FF55] uppercase">
            Atención Directa
          </span>
          <h1 className="font-display mt-2 text-3xl font-bold text-white sm:text-4xl">Contacto</h1>
          <p className="mt-2 max-w-2xl text-sm text-neutral-400">
            Consultanos por disponibilidad de equipos, envíos al interior o presupuestos de
            reparación en nuestro laboratorio técnico.
          </p>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-12">
          {/* Formulario conectado a POST /api/contacto */}
          <div className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl border border-[#00FF55]/20 bg-[#101010] p-6 sm:p-8"
            >
              <h2 className="font-display text-lg font-bold text-white">Envianos tu consulta</h2>

              {error && (
                <div
                  role="alert"
                  className="mt-4 rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-xs text-red-200"
                >
                  {error}
                </div>
              )}

              {success && (
                <div
                  role="status"
                  className="mt-4 flex items-start gap-2.5 rounded-lg border border-[#00FF55]/40 bg-[#00FF55]/10 px-4 py-3 text-xs text-[#00FF55]"
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>{success}</span>
                </div>
              )}

              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="nombre" className="block text-xs font-medium text-neutral-300">
                    Nombre completo *
                  </label>
                  <input
                    id="nombre"
                    type="text"
                    required
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    placeholder="Ej: Martín Gómez"
                    className="mt-1.5 w-full rounded-lg border border-white/15 bg-[#151515] px-4 py-2.5 text-sm text-white placeholder:text-neutral-500 focus:border-[#00FF55] focus:outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-medium text-neutral-300">
                    Correo electrónico *
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tu@correo.com"
                    className="mt-1.5 w-full rounded-lg border border-white/15 bg-[#151515] px-4 py-2.5 text-sm text-white placeholder:text-neutral-500 focus:border-[#00FF55] focus:outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="telefono" className="block text-xs font-medium text-neutral-300">
                    Teléfono / WhatsApp
                  </label>
                  <input
                    id="telefono"
                    type="tel"
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                    placeholder="+54 9 11 ..."
                    className="mt-1.5 w-full rounded-lg border border-white/15 bg-[#151515] px-4 py-2.5 text-sm text-white placeholder:text-neutral-500 focus:border-[#00FF55] focus:outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="asunto" className="block text-xs font-medium text-neutral-300">
                    Asunto
                  </label>
                  <select
                    id="asunto"
                    value={asunto}
                    onChange={(e) => setAsunto(e.target.value)}
                    className="mt-1.5 w-full rounded-lg border border-white/15 bg-[#151515] px-4 py-2.5 text-sm text-white focus:border-[#00FF55] focus:outline-none"
                  >
                    <option value="Consulta general">Consulta general</option>
                    <option value="Servicio Técnico">Servicio Técnico</option>
                    <option value="Stock y Envíos">Stock y Envíos</option>
                    <option value="Equipos Usados">Equipos Usados</option>
                  </select>
                </div>
              </div>

              <div className="mt-5">
                <label htmlFor="mensaje" className="block text-xs font-medium text-neutral-300">
                  Mensaje *
                </label>
                <textarea
                  id="mensaje"
                  required
                  rows={5}
                  value={mensaje}
                  onChange={(e) => setMensaje(e.target.value)}
                  placeholder="Contanos qué producto buscás o qué falla presenta tu equipo..."
                  className="mt-1.5 w-full rounded-lg border border-white/15 bg-[#151515] px-4 py-2.5 text-sm text-white placeholder:text-neutral-500 focus:border-[#00FF55] focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="neon-btn-primary mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm disabled:opacity-60 sm:w-auto"
              >
                <Send className="h-4 w-4" aria-hidden="true" />
                <span>{submitting ? 'Enviando consulta...' : 'Enviar consulta'}</span>
              </button>
            </form>
          </div>

          {/* Información de contacto */}
          <div className="space-y-6 lg:col-span-5">
            <div className="rounded-2xl border border-white/10 bg-[#101010] p-6 sm:p-8">
              <h2 className="font-display text-lg font-bold text-white">Canales de Atención</h2>
              <ul className="mt-6 space-y-5 text-sm text-neutral-300">
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[#00FF55]" aria-hidden="true" />
                  <div>
                    <p className="font-semibold text-white">Local y Laboratorio</p>
                    <p className="text-neutral-400">Av. Tecnológica 1450, CABA, Argentina</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Phone className="mt-0.5 h-5 w-5 shrink-0 text-[#00FF55]" aria-hidden="true" />
                  <div>
                    <p className="font-semibold text-white">Teléfono y WhatsApp</p>
                    <p className="text-neutral-400">+54 9 11 5542-8810</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Mail className="mt-0.5 h-5 w-5 shrink-0 text-[#00FF55]" aria-hidden="true" />
                  <div>
                    <p className="font-semibold text-white">Correo Electrónico</p>
                    <p className="text-neutral-400">contacto@electrotecno.com.ar</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Clock className="mt-0.5 h-5 w-5 shrink-0 text-[#00FF55]" aria-hidden="true" />
                  <div>
                    <p className="font-semibold text-white">Horarios</p>
                    <p className="text-neutral-400">Lunes a Viernes 9:30 a 19:00 · Sábados 10:00 a 14:00</p>
                  </div>
                </li>
              </ul>

              <a
                href="https://wa.me/5491155428810"
                target="_blank"
                rel="noreferrer"
                className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-[#00FF55]/40 bg-[#00FF55]/10 px-5 py-3 text-sm font-semibold text-[#00FF55] transition-colors hover:bg-[#00FF55] hover:text-[#050505]"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                <span>Escribir por WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
