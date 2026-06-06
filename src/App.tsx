import React, { useEffect, useState } from 'react';
import { Outlet, Navigate, useLocation, useMatches } from 'react-router-dom';
import { Castle } from 'lucide-react';
import { Head, ClientOnly, type RouteRecord } from 'vite-react-ssg';
import Layout from './components/Layout';
import ErrorBoundary from './components/ErrorBoundary';

const DEFAULT_TITLE = 'Casa Alaniz - Archivo Heráldico Familiar';
const DEFAULT_DESCRIPTION =
  'Archivo heráldico oficial de la Casa Alaniz. Custodios de la memoria y preservadores del legado familiar.';

type RouteMeta = { title: string; description: string };

// Componente de carga para transiciones (fallback de Suspense)
const PageLoader = () => (
  <div className="min-h-[60vh] flex items-center justify-center">
    <div className="text-center space-y-4">
      <div className="w-8 h-8 border-2 border-alanizGold-600 border-t-transparent rounded-full animate-spin"></div>
      <p className="text-alanizGold-600 font-medium">Cargando página...</p>
    </div>
  </div>
);

// Splash de bienvenida "Memoria Ardet". Se renderiza SOLO en cliente (ClientOnly),
// como capa por encima del contenido (que ya está en el HTML pre-renderizado), y se
// desvanece tras hidratar. No entra en el HTML => no afecta al SEO.
function WelcomeSplash() {
  const [fading, setFading] = useState(false);
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFading(true), 900);
    const removeTimer = setTimeout(() => setRemoved(true), 1500);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (removed) return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[10000] flex items-center justify-center bg-alanizGreen-950 transition-opacity duration-500 ${
        fading ? 'pointer-events-none opacity-0' : 'opacity-100'
      }`}
    >
      <div className="text-center space-y-6">
        <div className="flex justify-center text-alanizGold-600 animate-float">
          <Castle className="w-24 h-24" aria-hidden="true" />
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-display text-alanizGold-600 font-bold">Casa Alaniz</h1>
          <p className="text-parchment-300 italic">Memoria Ardet</p>
        </div>
        <div className="flex justify-center space-x-1">
          <div className="w-2 h-2 bg-alanizGold-600 rounded-full animate-pulse"></div>
          <div
            className="w-2 h-2 bg-alanizGold-600 rounded-full animate-pulse"
            style={{ animationDelay: '0.2s' }}
          ></div>
          <div
            className="w-2 h-2 bg-alanizGold-600 rounded-full animate-pulse"
            style={{ animationDelay: '0.4s' }}
          ></div>
        </div>
      </div>
    </div>
  );
}

// Inyecta <title>/<meta> por ruta en el <head>, leyendo el `handle` de la ruta activa.
// Al renderizarse (no en useEffect), queda en el HTML pre-renderizado y react-helmet
// lo actualiza también al navegar en cliente.
function RouteHead() {
  const matches = useMatches();
  const meta = [...matches].reverse().find((m) => m.handle)?.handle as RouteMeta | undefined;
  const title = meta?.title ?? DEFAULT_TITLE;
  const description = meta?.description ?? DEFAULT_DESCRIPTION;

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
    </Head>
  );
}

// Scroll al inicio al cambiar de ruta (solo cliente; va en useEffect).
const useScrollToTop = () => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location]);
};

// Página 404
const NotFound = () => (
  <div className="flex min-h-[60vh] items-center justify-center px-4">
    <div className="stack-centered space-y-5">
      <Castle className="h-24 w-24 text-alanizGold-600" aria-hidden="true" />
      <h1 className="font-display text-3xl font-bold text-alanizGold-600">Página No Encontrada</h1>
      <p className="max-w-md text-parchment-300">
        La página que buscas no existe en los archivos de la Casa Alaniz. Los pergaminos han sido
        revisados, pero no se encontró rastro.
      </p>
      <div className="space-x-4">
        <button onClick={() => window.history.back()} className="btn-secondary">
          Volver Atrás
        </button>
        <button onClick={() => (window.location.href = '/')} className="btn-alaniz">
          Ir al Inicio
        </button>
      </div>
    </div>
  </div>
);

// Elemento raíz: head por ruta + ErrorBoundary + Layout + Suspense con el Outlet,
// y el splash de bienvenida como overlay solo-cliente.
function Root() {
  useScrollToTop();

  return (
    <ErrorBoundary>
      <RouteHead />
      <Layout>
        <React.Suspense fallback={<PageLoader />}>
          <div className="animate-fade-in">
            <Outlet />
          </div>
        </React.Suspense>
      </Layout>
      <ClientOnly>{() => <WelcomeSplash />}</ClientOnly>
    </ErrorBoundary>
  );
}

// Rutas en formato data-router para vite-react-ssg.
// Cada página se carga con `lazy`; el import directo permite al SSG detectar
// los estilos/recursos de cada ruta durante el build. El `handle` aporta el
// título/descripción que RouteHead inyecta en el <head> pre-renderizado.
export const routes: RouteRecord[] = [
  {
    path: '/',
    element: <Root />,
    children: [
      {
        index: true,
        lazy: () => import('./pages/Home').then((m) => ({ Component: m.default })),
        handle: { title: DEFAULT_TITLE, description: DEFAULT_DESCRIPTION } satisfies RouteMeta,
      },
      {
        path: 'historia',
        lazy: () => import('./pages/Historia').then((m) => ({ Component: m.default })),
        handle: {
          title: 'Historia - Casa Alaniz',
          description:
            'Descubre la rica historia de la Casa Alaniz, desde 1117 d.C. hasta nuestros días.',
        } satisfies RouteMeta,
      },
      {
        path: 'simbolos',
        lazy: () => import('./pages/Simbolos').then((m) => ({ Component: m.default })),
        handle: {
          title: 'Símbolos Heráldicos - Casa Alaniz',
          description:
            'Explora los símbolos heráldicos de la Casa Alaniz: escudo, bandera y anillo familiar.',
        } satisfies RouteMeta,
      },
      {
        path: 'legado',
        lazy: () => import('./pages/Legado').then((m) => ({ Component: m.default })),
        handle: {
          title: 'El Legado Vivo - Casa Alaniz',
          description: 'El legado vivo de la Casa Alaniz y su impacto en las generaciones futuras.',
        } satisfies RouteMeta,
      },
      {
        path: 'fasor',
        lazy: () => import('./pages/Fasor').then((m) => ({ Component: m.default })),
        handle: {
          title: 'FASOR - Fuerza de Auxilio, Soporte y Rescate - Casa Alaniz',
          description:
            'FASOR - Fuerza de Auxilio, Soporte y Rescate de la Casa Alaniz. Siempre listos, siempre vigilantes, siempre al servicio.',
        } satisfies RouteMeta,
      },
      {
        path: 'documentos',
        lazy: () => import('./pages/Documentos').then((m) => ({ Component: m.default })),
        handle: {
          title: 'Archivo Documental - Casa Alaniz',
          description: 'Acceso al archivo documental con cartas, tratados y crónicas restauradas.',
        } satisfies RouteMeta,
      },
      {
        path: 'condecoraciones',
        lazy: () => import('./pages/Condecoraciones').then((m) => ({ Component: m.default })),
        handle: {
          title: 'Condecoraciones - Casa Alaniz',
          description:
            'Condecoraciones y distinciones otorgadas por la Casa Alaniz en reconocimiento al honor y mérito.',
        } satisfies RouteMeta,
      },
      {
        path: 'dia-casa',
        lazy: () => import('./pages/DiaDeLaCasa').then((m) => ({ Component: m.default })),
        handle: {
          title: 'Día de la Casa - Casa Alaniz',
          description:
            'La celebración anual más solemne de la Casa Alaniz: ceremonia de condecoraciones y renovación de votos.',
        } satisfies RouteMeta,
      },
      {
        path: 'contacto',
        lazy: () => import('./pages/Contacto').then((m) => ({ Component: m.default })),
        handle: {
          title: 'Contacto - Casa Alaniz',
          description: 'Contacta con la administración oficial de la Casa Alaniz.',
        } satisfies RouteMeta,
      },
      { path: '404', element: <NotFound /> },
      { path: '*', element: <Navigate to="/404" replace /> },
    ],
  },
];
