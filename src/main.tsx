import './index.css';
import { ViteReactSSG } from 'vite-react-ssg';
import { routes } from './App';

// Entry de vite-react-ssg: genera HTML estático por ruta en build e hidrata en cliente.
export const createRoot = ViteReactSSG({ routes });

// El siguiente código solo debe ejecutarse en el navegador, nunca durante el pre-render.
if (typeof window !== 'undefined' && import.meta.env.PROD) {
  // Registro del Service Worker para PWA (opcional)
  if ('serviceWorker' in navigator) {
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

  // Preload de rutas críticas para mejorar la navegación posterior
  import('./pages/Home');
  import('./pages/Historia');
}
