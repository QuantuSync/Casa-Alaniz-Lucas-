import React, { useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

// Hook para verificar autenticación
const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simular verificación de autenticación
    const checkAuth = async () => {
      try {
        // Verificar localStorage
        const authStatus = localStorage.getItem('alanizAuth');
        const authTimestamp = localStorage.getItem('alanizAuthTimestamp');
        
        if (authStatus === 'ok' && authTimestamp) {
          const timestamp = parseInt(authTimestamp);
          const currentTime = Date.now();
          const twentyFourHours = 24 * 60 * 60 * 1000; // 24 horas en milisegundos
          
          // Verificar si la sesión ha expirado (24 horas)
          if (currentTime - timestamp < twentyFourHours) {
            setIsAuthenticated(true);
          } else {
            // Sesión expirada
            localStorage.removeItem('alanizAuth');
            localStorage.removeItem('alanizAuthTimestamp');
            setIsAuthenticated(false);
          }
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Error verificando autenticación:', error);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  return { isAuthenticated, isLoading };
};

// Componente de loading para la verificación
const AuthLoadingScreen = () => (
  <div className="min-h-screen flex items-center justify-center bg-alanizGreen-950">
    <div className="text-center space-y-6">
      <div className="relative">
        <span className="w-16 h-16 text-alanizGold-600 mx-auto animate-pulse block text-center text-4xl">🛡️</span>
        <div className="absolute inset-0 bg-alanizGold-600/20 rounded-full animate-ping"></div>
      </div>
      
      <div className="space-y-2">
        <h2 className="text-xl font-display text-alanizGold-600 font-semibold">
          Verificando Credenciales
        </h2>
        <p className="text-parchment-300 text-sm">
          Consultando los registros de la Casa...
        </p>
      </div>
      
      <div className="flex justify-center space-x-1">
        <div className="w-2 h-2 bg-alanizGold-600 rounded-full animate-bounce" 
             style={{ animationDelay: '0ms' }}></div>
        <div className="w-2 h-2 bg-alanizGold-600 rounded-full animate-bounce" 
             style={{ animationDelay: '150ms' }}></div>
        <div className="w-2 h-2 bg-alanizGold-600 rounded-full animate-bounce" 
             style={{ animationDelay: '300ms' }}></div>
      </div>
    </div>
  </div>
);

// Componente de acceso denegado
const AccessDeniedScreen = () => {
  const location = useLocation();
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-alanizGreen-950 px-4">
      <div className="max-w-md w-full text-center space-y-6">
        
        {/* Icono de acceso denegado */}
        <div className="relative">
          <div className="w-24 h-24 mx-auto bg-alanizGreen-800 rounded-full 
                          flex items-center justify-center border-2 border-alanizGold-600/30">
            <Lock className="w-12 h-12 text-alanizGold-600" />
          </div>
          <div className="absolute -top-1 -right-1 w-8 h-8 bg-red-500 rounded-full 
                          flex items-center justify-center">
            <span className="text-white text-xl font-bold">!</span>
          </div>
        </div>
        
        {/* Título */}
        <div className="space-y-2">
          <h1 className="text-2xl font-display text-alanizGold-600 font-bold">
            Acceso Restringido
          </h1>
          <p className="text-parchment-300">
            Esta sección está reservada exclusivamente para miembros verificados de la Casa Alaniz.
          </p>
        </div>
        
        {/* Mensaje explicativo */}
        <div className="bg-alanizGreen-800/50 rounded-lg p-4 border border-alanizGold-600/20">
          <div className="flex items-start space-x-3">
            <span className="w-5 h-5 text-alanizGold-600 flex-shrink-0 mt-0.5">👁️</span>
            <div className="text-sm text-parchment-300">
              <p className="font-medium mb-1">¿Eres miembro de la Casa?</p>
              <p>
                Para acceder a los documentos sagrados y registros históricos, 
                debes autenticarte con las credenciales oficiales de la Casa Alaniz.
              </p>
            </div>
          </div>
        </div>
        
        {/* Botones de acción */}
        <div className="space-y-3">
          <button
            onClick={() => window.location.href = '/login'}
            className="w-full btn-alaniz"
          >
            <span className="w-4 h-4 mr-2">🔒</span>
            Iniciar Sesión
          </button>
          
          <button
            onClick={() => window.history.back()}
            className="w-full btn-secondary"
          >
            Volver Atrás
          </button>
        </div>
        
        {/* Información de contacto */}
        <div className="pt-4 border-t border-alanizGold-600/20">
          <p className="text-xs text-parchment-400">
            ¿Necesitas acceso? Contacta con la administración:
          </p>
          <a 
            href="mailto:administracion@casaalaniz.es"
            className="text-sm text-alanizGold-600 hover:text-alanizGold-500 
                       transition-colors duration-200 underline-offset-2 hover:underline"
          >
            administracion@casaalaniz.es
          </a>
        </div>
        
        {/* Debug info (solo en desarrollo) */}
        {import.meta.env.DEV && (
          <div className="mt-6 p-3 bg-alanizGreen-900/50 rounded border border-alanizGold-600/10">
            <p className="text-xs text-parchment-500 font-mono">
              Debug: Ruta protegida = {location.pathname}
            </p>
            <p className="text-xs text-parchment-500 font-mono">
              Auth status = No autenticado
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

// Componente principal de ruta protegida
export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  // Mostrar loading mientras se verifica la autenticación
  if (isLoading) {
    return <AuthLoadingScreen />;
  }

  // Si no está autenticado, mostrar pantalla de acceso denegado
  if (!isAuthenticated) {
    return <AccessDeniedScreen />;
  }

  // Si está autenticado, renderizar el contenido protegido
  return (
    <div className="animate-fade-in">
      {children}
    </div>
  );
}

// Hook adicional para usar en componentes que necesiten verificar auth
export const useAuthStatus = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const authStatus = localStorage.getItem('alanizAuth');
      const authTimestamp = localStorage.getItem('alanizAuthTimestamp');
      
      if (authStatus === 'ok' && authTimestamp) {
        const timestamp = parseInt(authTimestamp);
        const currentTime = Date.now();
        const twentyFourHours = 24 * 60 * 60 * 1000;
        
        setIsAuthenticated(currentTime - timestamp < twentyFourHours);
      } else {
        setIsAuthenticated(false);
      }
    };

    checkAuth();
    
    // Verificar cada minuto si la sesión sigue válida
    const interval = setInterval(checkAuth, 60000);
    
    return () => clearInterval(interval);
  }, []);

  return isAuthenticated;
};

// Función utilitaria para logout
export const logout = () => {
  localStorage.removeItem('alanizAuth');
  localStorage.removeItem('alanizAuthTimestamp');
  window.location.href = '/login';
};