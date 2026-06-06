import React, { useEffect } from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { Castle } from 'lucide-react';
import type { RouteRecord } from 'vite-react-ssg';
import Layout from './components/Layout';
import ErrorBoundary from './components/ErrorBoundary';

// Componente de carga para transiciones (fallback de Suspense)
const PageLoader = () => (
  <div className="min-h-[60vh] flex items-center justify-center">
    <div className="text-center space-y-4">
      <div className="w-8 h-8 border-2 border-alanizGold-600 border-t-transparent rounded-full animate-spin"></div>
      <p className="text-alanizGold-600 font-medium">Cargando página...</p>
    </div>
  </div>
);

// Hook para scroll al cambiar de página y título/meta por ruta.
// Todo va dentro de useEffect: no se ejecuta en el pre-render (SSR), solo en cliente.
const useRouteEffects = () => {
  const location = useLocation();

  useEffect(() => {
    // Smooth scroll to top cuando cambia la ruta
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Actualizar título de la página según la ruta
    const routeTitles: Record<string, string> = {
      '/': 'Inicio - Casa Alaniz',
      '/historia': 'Historia - Casa Alaniz',
      '/simbolos': 'Símbolos Heráldicos - Casa Alaniz',
      '/legado': 'El Legado Vivo - Casa Alaniz',
      '/fasor': 'FASOR - Fuerza de Auxilio, Soporte y Rescate - Casa Alaniz',
      '/documentos': 'Archivo Documental - Casa Alaniz',
      '/condecoraciones': 'Condecoraciones - Casa Alaniz',
      '/dia-casa': 'Día de la Casa - Casa Alaniz',
      '/contacto': 'Contacto - Casa Alaniz',
    };

    const title = routeTitles[location.pathname] || 'Casa Alaniz - Archivo Heráldico Familiar';
    document.title = title;

    // Actualizar meta description dinámicamente
    const descriptions: Record<string, string> = {
      '/': 'Archivo heráldico oficial de la Casa Alaniz. Custodios de la memoria y preservadores del legado familiar.',
      '/historia':
        'Descubre la rica historia de la Casa Alaniz, desde 1117 d.C. hasta nuestros días.',
      '/simbolos':
        'Explora los símbolos heráldicos de la Casa Alaniz: escudo, bandera y anillo familiar.',
      '/legado': 'El legado vivo de la Casa Alaniz y su impacto en las generaciones futuras.',
      '/fasor':
        'FASOR - Fuerza de Auxilio, Soporte y Rescate de la Casa Alaniz. Siempre listos, siempre vigilantes, siempre al servicio.',
      '/documentos': 'Acceso al archivo documental con cartas, tratados y crónicas restauradas.',
      '/condecoraciones':
        'Condecoraciones y distinciones otorgadas por la Casa Alaniz en reconocimiento al honor y mérito.',
      '/dia-casa':
        'La celebración anual más solemne de la Casa Alaniz: ceremonia de condecoraciones y renovación de votos.',
      '/contacto': 'Contacta con la administración oficial de la Casa Alaniz.',
    };

    const description = descriptions[location.pathname] || descriptions['/'];
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    }
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

// Elemento raíz: ErrorBoundary + Layout + Suspense con el Outlet de la ruta activa.
function Root() {
  useRouteEffects();

  return (
    <ErrorBoundary>
      <Layout>
        <React.Suspense fallback={<PageLoader />}>
          <div className="animate-fade-in">
            <Outlet />
          </div>
        </React.Suspense>
      </Layout>
    </ErrorBoundary>
  );
}

// Rutas en formato data-router para vite-react-ssg.
// Cada página se carga con `lazy`; el import directo permite al SSG detectar
// los estilos/recursos de cada ruta durante el build.
export const routes: RouteRecord[] = [
  {
    path: '/',
    element: <Root />,
    children: [
      {
        index: true,
        lazy: () => import('./pages/Home').then((m) => ({ Component: m.default })),
      },
      {
        path: 'historia',
        lazy: () => import('./pages/Historia').then((m) => ({ Component: m.default })),
      },
      {
        path: 'simbolos',
        lazy: () => import('./pages/Simbolos').then((m) => ({ Component: m.default })),
      },
      {
        path: 'legado',
        lazy: () => import('./pages/Legado').then((m) => ({ Component: m.default })),
      },
      {
        path: 'fasor',
        lazy: () => import('./pages/Fasor').then((m) => ({ Component: m.default })),
      },
      {
        path: 'documentos',
        lazy: () => import('./pages/Documentos').then((m) => ({ Component: m.default })),
      },
      {
        path: 'condecoraciones',
        lazy: () => import('./pages/Condecoraciones').then((m) => ({ Component: m.default })),
      },
      {
        path: 'dia-casa',
        lazy: () => import('./pages/DiaDeLaCasa').then((m) => ({ Component: m.default })),
      },
      {
        path: 'contacto',
        lazy: () => import('./pages/Contacto').then((m) => ({ Component: m.default })),
      },
      { path: '404', element: <NotFound /> },
      { path: '*', element: <Navigate to="/404" replace /> },
    ],
  },
];
