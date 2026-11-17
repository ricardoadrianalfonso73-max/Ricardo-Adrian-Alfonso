import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, RotateCcw, Tag } from 'lucide-react';
import type { Producto } from '../types';
import { ProductCard } from '../components/ProductCard';
import { ProductDetailModal } from '../components/ProductDetailModal';

const CATEGORIES = [
  'Todas',
  'Celulares',
  'Notebooks y PC',
  'Monitores',
  'Periféricos',
  'Audio',
  'Accesorios',
];

const CONDITIONS: { value: string; label: string }[] = [
  { value: 'todos', label: 'Todos' },
  { value: 'nuevo', label: 'Nuevos' },
  { value: 'usado', label: 'Usados' },
];

export function ProductosPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCat = searchParams.get('categoria') || 'Todas';
  const initialQ = searchParams.get('q') || '';
  const initialEstado = searchParams.get('estado') || 'todos';
  const initialOfertas = searchParams.get('ofertas') === 'true';

  const [categoria, setCategoria] = useState(initialCat);
  const [estado, setEstado] = useState(initialEstado);
  const [soloOfertas, setSoloOfertas] = useState(initialOfertas);
  const [query, setQuery] = useState(initialQ);
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Producto | null>(null);

  useEffect(() => {
    setCategoria(searchParams.get('categoria') || 'Todas');
    setQuery(searchParams.get('q') || '');
    setEstado(searchParams.get('estado') || 'todos');
    setSoloOfertas(searchParams.get('ofertas') === 'true');
  }, [searchParams]);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(null);

    const params = new URLSearchParams();
    if (categoria && categoria !== 'Todas') params.set('categoria', categoria);
    if (estado === 'nuevo' || estado === 'usado') params.set('estado', estado);
    if (soloOfertas) params.set('ofertas', 'true');
    if (query.trim()) params.set('q', query.trim());

    fetch(`/api/productos?${params.toString()}`)
      .then((res) => {
        if (!res.ok) throw new Error('Error al consultar catálogo');
        return res.json();
      })
      .then((data: Producto[]) => {
        if (active) setProductos(data);
      })
      .catch(() => {
        if (active) setError('No se pudo conectar con la base de datos de productos.');
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [categoria, estado, soloOfertas, query]);

  function updateFilter(nextCat: string, nextEstado: string, nextOfertas: boolean, nextQ: string) {
    const params = new URLSearchParams();
    if (nextCat !== 'Todas') params.set('categoria', nextCat);
    if (nextEstado !== 'todos') params.set('estado', nextEstado);
    if (nextOfertas) params.set('ofertas', 'true');
    if (nextQ.trim()) params.set('q', nextQ.trim());
    setSearchParams(params);
  }

  function handleReset() {
    setCategoria('Todas');
    setEstado('todos');
    setSoloOfertas(false);
    setQuery('');
    setSearchParams({});
  }

  return (
    <div className="min-h-[75vh] bg-[#050505] py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="border-b border-white/10 pb-8">
          <span className="font-display text-xs font-semibold tracking-[0.2em] text-[#00FF55] uppercase">
            Catálogo Oficial
          </span>
          <h1 className="font-display mt-2 text-3xl font-bold text-white sm:text-4xl">
            Productos y Ofertas
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-neutral-400">
            Explorá nuestro catálogo completo sincronizado desde la base de datos: celulares
            nuevos y usados certificados, notebooks, PC gamer, monitores, periféricos, audio y
            accesorios con precios promocionales destacados.
          </p>

          {/* Barra de filtros */}
          <div className="mt-7 flex flex-col gap-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-1.5 rounded-xl border border-white/10 bg-[#101010] p-1.5">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => updateFilter(cat, estado, soloOfertas, query)}
                    className={`rounded-lg px-3.5 py-2 text-xs font-semibold transition-colors whitespace-nowrap ${
                      categoria === cat
                        ? 'bg-[#00FF55] text-[#050505]'
                        : 'text-neutral-300 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="relative w-full sm:w-64">
                <Search
                  className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-neutral-500"
                  aria-hidden="true"
                />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => {
                    const val = e.target.value;
                    setQuery(val);
                    updateFilter(categoria, estado, soloOfertas, val);
                  }}
                  placeholder="Filtrar por nombre..."
                  className="w-full rounded-xl border border-white/12 bg-[#101010] py-2.5 pr-3 pl-9 text-xs text-white placeholder:text-neutral-500 focus:border-[#00FF55] focus:outline-none"
                />
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-1 rounded-xl border border-white/10 bg-[#101010] p-1.5">
                {CONDITIONS.map((cond) => (
                  <button
                    key={cond.value}
                    type="button"
                    onClick={() => updateFilter(categoria, cond.value, soloOfertas, query)}
                    className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap ${
                      estado === cond.value
                        ? 'bg-white/15 text-[#00FF55]'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    {cond.label}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={() => updateFilter(categoria, estado, !soloOfertas, query)}
                className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-xs font-semibold transition-colors whitespace-nowrap ${
                  soloOfertas
                    ? 'border-[#00FF55] bg-[#00FF55]/15 text-[#00FF55]'
                    : 'border-white/12 bg-[#101010] text-neutral-300 hover:border-[#00FF55]/50 hover:text-white'
                }`}
              >
                <Tag className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Solo ofertas</span>
              </button>
            </div>
          </div>
        </div>

        {/* Grilla de resultados */}
        <div className="mt-10">
          {loading ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <div
                  key={n}
                  className="h-[410px] animate-pulse rounded-xl border border-white/10 bg-[#101010]"
                />
              ))}
            </div>
          ) : error ? (
            <div className="rounded-xl border border-red-500/30 bg-[#151515] p-8 text-center">
              <p className="text-sm text-red-300">{error}</p>
              <button
                type="button"
                onClick={handleReset}
                className="mt-4 inline-flex items-center gap-2 rounded-lg border border-white/15 px-4 py-2 text-xs text-white hover:border-[#00FF55]"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Reintentar</span>
              </button>
            </div>
          ) : productos.length === 0 ? (
            <div className="rounded-xl border border-white/10 bg-[#101010] p-12 text-center">
              <p className="font-display text-lg font-semibold text-white">
                Sin coincidencias en el catálogo
              </p>
              <p className="mt-2 text-sm text-neutral-400">
                No encontramos productos para los filtros seleccionados.
              </p>
              <button
                type="button"
                onClick={handleReset}
                className="neon-btn-primary mt-6 inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-xs"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Restablecer filtros</span>
              </button>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {productos.map((prod) => (
                <ProductCard
                  key={prod.id}
                  producto={prod}
                  onSelect={(item) => setSelectedProduct(item)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <ProductDetailModal
        producto={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
}
