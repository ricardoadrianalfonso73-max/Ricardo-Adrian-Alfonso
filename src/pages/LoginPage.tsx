import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Lock, LogIn, KeyRound } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export function LoginPage() {
  const { user, login } = useAuth();
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (user) {
    return <Navigate to="/admin" replace />;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await login(usuario, password);
      navigate('/admin', { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Credenciales inválidas.');
    } finally {
      setSubmitting(false);
    }
  }

  function fillDemoCredentials() {
    setUsuario('admin');
    setPassword('admin123');
    setError(null);
  }

  return (
    <div className="tech-grid-bg flex min-h-[75vh] items-center justify-center bg-[#050505] px-4 py-14">
      <div className="w-full max-w-md rounded-2xl border border-[#00FF55]/25 bg-[#101010] p-7 shadow-2xl sm:p-9">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#00FF55]/35 bg-[#00FF55]/10 text-[#00FF55]">
            <Lock className="h-5 w-5" aria-hidden="true" />
          </div>
          <div>
            <span className="font-display text-xs font-semibold tracking-[0.18em] text-[#00FF55] uppercase">
              Acceso Seguro
            </span>
            <h1 className="font-display text-xl font-bold text-white">Panel Electro Tecno</h1>
          </div>
        </div>

        <p className="mt-4 text-sm text-neutral-400">
          Iniciá sesión con tu usuario para administrar productos, precios de oferta y consultas de
          clientes.
        </p>

        {error && (
          <div
            role="alert"
            className="mt-4 rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-xs text-red-200"
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="usuario" className="block text-xs font-medium text-neutral-300">
              Usuario
            </label>
            <input
              id="usuario"
              type="text"
              required
              autoComplete="username"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              placeholder="admin"
              className="mt-1.5 w-full rounded-lg border border-white/15 bg-[#151515] px-4 py-2.5 text-sm text-white placeholder:text-neutral-500 focus:border-[#00FF55] focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-xs font-medium text-neutral-300">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="mt-1.5 w-full rounded-lg border border-white/15 bg-[#151515] px-4 py-2.5 text-sm text-white placeholder:text-neutral-500 focus:border-[#00FF55] focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="neon-btn-primary mt-2 inline-flex w-full items-center justify-center gap-2 rounded-lg py-3 text-sm disabled:opacity-60"
          >
            <LogIn className="h-4 w-4" aria-hidden="true" />
            <span>{submitting ? 'Verificando...' : 'Ingresar'}</span>
          </button>
        </form>

        <div className="mt-6 rounded-xl border border-white/10 bg-[#151515] p-4">
          <div className="flex items-center justify-between gap-2">
            <div>
              <p className="text-xs font-semibold text-neutral-200">Usuario de prueba (Evaluación)</p>
              <p className="font-mono-num mt-1 text-xs text-neutral-400">
                Usuario: <span className="text-[#00FF55]">admin</span> · Clave:{' '}
                <span className="text-[#00FF55]">admin123</span>
              </p>
            </div>
            <button
              type="button"
              onClick={fillDemoCredentials}
              className="inline-flex items-center gap-1.5 rounded-lg border border-[#00FF55]/35 bg-[#00FF55]/10 px-3 py-1.5 text-xs font-semibold text-[#00FF55] hover:bg-[#00FF55] hover:text-[#050505] whitespace-nowrap shrink-0"
            >
              <KeyRound className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Autocompletar</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
