import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import ProtectedRoute from './routes/ProtectedRoute';

// Lazy loading de páginas para mejor performance
const Home = React.lazy(() => import('./pages/Home'));
const Historia = React.lazy(() => import('./pages/Historia'));
const Simbolos = React.lazy(() => import('./pages/Simbolos'));
const Legado = React.lazy(() => import('./pages/Legado'));
const Fasor = React.lazy(() => import('./pages/Fasor'));
const Documentos = React.lazy(() => import('./pages/Documentos'));
const Contacto = React.lazy(() => import('./pages/Contacto'));
const Login = React.lazy(() => import('./pages/Login'));
const Miembros = React.lazy(() => import('./pages/Miembros'));
const SedeElectronica = React.lazy(() => import('./pages/SedeElectronica'));
const AdminPanel = React.lazy(() => import('./pages/AdminPanel'));
const Condecoraciones = React.lazy(() => import('./pages/Condecoraciones'));
const DiaDeLaCasa = React.lazy(() => import('./pages/DiaDeLaCasa'));

// Componente de carga para transiciones
const PageLoader = () => (
  <div className="min-h-[60vh] flex items-center justify-center">
    <div className="text-center space-y-4">
      <div className="w-8 h-8 border-2 border-alanizGold-600 border-t-transparent rounded-full animate-spin"></div>
      <p className="text-alanizGold-600 font-medium">Cargando página...</p>
    </div>
  </div>
);

// Loading bar mejorado para transiciones de página
const LoadingBar = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, [location]);

  if (!loading) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-alanizGreen-900">
      <div className="h-full bg-gradient-to-r from-alanizGold-600 to-alanizGold-400 
                      transition-all duration-300 ease-out animate-pulse"
           style={{ width: '100%' }}>
      </div>
    </div>
  );
};

// Hook para scroll al cambiar de página
const useScrollToTop = () => {
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
      '/login': 'Acceso Miembros - Casa Alaniz',
      '/miembros': 'Área Privada - Casa Alaniz',
      '/sede-electronica': 'Sede Electrónica - Casa Alaniz',
      '/admin': 'Panel de Administración - Casa Alaniz',
    };
    
    const title = routeTitles[location.pathname] || 'Casa Alaniz - Archivo Heráldico Familiar';
    document.title = title;
    
    // Actualizar meta description dinámicamente
    const descriptions: Record<string, string> = {
      '/': 'Archivo heráldico oficial de la Casa Alaniz. Custodios de la memoria y preservadores del legado familiar.',
      '/historia': 'Descubre la rica historia de la Casa Alaniz, desde 1117 d.C. hasta nuestros días.',
      '/simbolos': 'Explora los símbolos heráldicos de la Casa Alaniz: escudo, bandera y anillo familiar.',
      '/legado': 'El legado vivo de la Casa Alaniz y su impacto en las generaciones futuras.',
      '/fasor': 'FASOR - Fuerza de Auxilio, Soporte y Rescate de la Casa Alaniz. Siempre listos, siempre vigilantes, siempre al servicio.',
      '/documentos': 'Acceso al archivo documental con cartas, tratados y crónicas restauradas.',
      '/condecoraciones': 'Condecoraciones y distinciones otorgadas por la Casa Alaniz en reconocimiento al honor y mérito.',
      '/dia-casa': 'La celebración anual más solemne de la Casa Alaniz: ceremonia de condecoraciones y renovación de votos.',
      '/contacto': 'Contacta con la administración oficial de la Casa Alaniz.',
      '/login': 'Acceso exclusivo para miembros verificados de la Casa Alaniz.',
      '/miembros': 'Área privada para guardians y miembros de la Casa Alaniz.',
      '/sede-electronica': 'Sede electrónica oficial para miembros de la Casa Alaniz.',
      '/admin': 'Panel de administración del sistema Casa Alaniz.',
    };
    
    const description = descriptions[location.pathname] || descriptions['/'];
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    }
    
    // Analytics de navegación (si se implementa en el futuro)
    if (import.meta.env.PROD) {
      console.log(`Navegación: ${location.pathname}`);
    }
  }, [location]);
};

// Componente principal de la aplicación
export default function App() {
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  
  // Hook personalizado para scroll
  useScrollToTop();
  
  // Manejar carga inicial
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialLoad(false);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Efecto para mejorar la experiencia de usuario
  useEffect(() => {
    // Precargar imágenes críticas
    const criticalImages = [
      '/src/assets/Escudo.jpg',
      '/src/assets/Bandera.jpg',
      '/src/assets/Anillo.png'
    ];
    
    criticalImages.forEach(src => {
      const img = new Image();
      img.src = src;
    });
    
    // Configurar tema oscuro/claro según preferencias del sistema
    const mediaQuery = window.matchMedia('(prefers-color-scheme: light)');
    const handleColorSchemeChange = (e: MediaQueryListEvent) => {
      // La Casa Alaniz mantiene su tema oscuro, pero podemos registrar la preferencia
      console.log(`Preferencia de color del sistema: ${e.matches ? 'claro' : 'oscuro'}`);
    };
    
    mediaQuery.addEventListener('change', handleColorSchemeChange);
    return () => mediaQuery.removeEventListener('change', handleColorSchemeChange);
  }, []);
  
  // Mostrar carga inicial si es necesario
  if (isInitialLoad) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-alanizGreen-950">
        <div className="text-center space-y-6">
          <div className="text-8xl text-alanizGold-600 animate-float">🏰</div>
          <div className="space-y-2">
            <h1 className="text-3xl font-display text-alanizGold-600 font-bold">
              Casa Alaniz
            </h1>
            <p className="text-parchment-300 italic">Memoria Ardet</p>
          </div>
          <div className="flex justify-center space-x-1">
            <div className="w-2 h-2 bg-alanizGold-600 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-alanizGold-600 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-2 h-2 bg-alanizGold-600 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <Layout>
      <LoadingBar />
      <React.Suspense fallback={<PageLoader />}>
        <div className="animate-fade-in">
          <Routes>
            {/* Ruta principal */}
            <Route path="/" element={<Home />} />
            
            {/* Rutas públicas */}
            <Route path="/historia" element={<Historia />} />
            <Route path="/simbolos" element={<Simbolos />} />
            <Route path="/legado" element={<Legado />} />
            <Route path="/fasor" element={<Fasor />} />
            <Route path="/documentos" element={<Documentos />} />
            <Route path="/condecoraciones" element={<Condecoraciones />} />
            <Route path="/dia-casa" element={<DiaDeLaCasa />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/login" element={<Login />} />
            
            {/* Rutas protegidas */}
            <Route
              path="/miembros"
              element={
                <ProtectedRoute>
                  <Miembros />
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/sede-electronica"
              element={
                <ProtectedRoute>
                  <SedeElectronica />
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/admin"
              element={
                <ProtectedRoute adminOnly={true}>
                  <AdminPanel />
                </ProtectedRoute>
              }
            />
            
            {/* Redirección para rutas no encontradas */}
            <Route path="/404" element={
              <div className="min-h-[60vh] flex items-center justify-center px-4">
                <div className="text-center space-y-4">
                  <div className="text-8xl text-alanizGold-600">🏰</div>
                  <h1 className="text-3xl font-display text-alanizGold-600 font-bold">
                    Página No Encontrada
                  </h1>
                  <p className="text-parchment-300 max-w-md">
                    La página que buscas no existe en los archivos de la Casa Alaniz.
                    Los pergaminos han sido revisados, pero no se encontró rastro.
                  </p>
                  <div className="space-x-4">
                    <button 
                      onClick={() => window.history.back()}
                      className="btn-secondary"
                    >
                      Volver Atrás
                    </button>
                    <button 
                      onClick={() => window.location.href = '/'}
                      className="btn-alaniz"
                    >
                      Ir al Inicio
                    </button>
                  </div>
                </div>
              </div>
            } />
            
            {/* Catch-all route */}
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Routes>
        </div>
      </React.Suspense>
    </Layout>
  );
}
