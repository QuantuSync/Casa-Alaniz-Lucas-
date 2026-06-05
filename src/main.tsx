import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Swords, Castle } from 'lucide-react';
import App from './App';

// Error boundary para capturar errores de React
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error?: Error }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error en Casa Alaniz:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-alanizGreen-950 px-4">
          <div className="stack-centered max-w-md space-y-5">
            <Swords className="h-16 w-16 text-alanizGold-600" aria-hidden="true" />
            <h1 className="font-display text-2xl font-bold text-alanizGold-600">
              Error en el Archivo
            </h1>
            <p className="text-parchment-200">
              Ha ocurrido un error inesperado en el archivo heráldico. Los custodios han sido
              notificados.
            </p>
            <button onClick={() => window.location.reload()} className="btn-alaniz">
              Restaurar Archivo
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Componente de carga inicial
const LoadingScreen = () => (
  <div className="min-h-screen flex items-center justify-center bg-alanizGreen-950">
    <div className="text-center space-y-4">
      <div className="flex justify-center text-alanizGold-600 animate-pulse">
        <Castle className="w-16 h-16" aria-hidden="true" />
      </div>
      <h2 className="text-xl font-display text-alanizGold-600 font-semibold">
        Cargando Casa Alaniz<span className="loading-dots"></span>
      </h2>
      <div className="w-64 h-1 bg-alanizGreen-800 rounded-full overflow-hidden">
        <div className="h-full bg-alanizGold-600 rounded-full animate-pulse"></div>
      </div>
    </div>
  </div>
);

// Configuración de renderizado con mejoras de performance
const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Elemento root no encontrado. Casa Alaniz requiere un elemento #root en el DOM.');
}

const root = ReactDOM.createRoot(rootElement);

// Renderizado con Suspense para carga lazy
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <React.Suspense fallback={<LoadingScreen />}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </React.Suspense>
    </ErrorBoundary>
  </React.StrictMode>
);

// Registro del Service Worker para PWA (opcional)
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .then((registration) => {
        console.log('SW registrado: ', registration);
      })
      .catch((registrationError) => {
        console.log('SW registro falló: ', registrationError);
      });
  });
}

// Optimización de rendimiento - preload de rutas críticas
if (import.meta.env.PROD) {
  // Preload de componentes críticos
  import('./pages/Home');
  import('./pages/Historia');
  import('./components/Navbar');
}

// Configuración de analytics o tracking (si es necesario)
if (import.meta.env.PROD) {
  // Aquí se pueden añadir scripts de analytics
  console.log('Casa Alaniz - Archivo Heráldico iniciado correctamente');
}
