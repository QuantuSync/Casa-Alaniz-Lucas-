import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, AlertTriangle, Check, IdCard, Lock, EyeOff, Eye, Cloud, Save, ArrowLeft } from 'lucide-react';

// CONFIGURACIÓN SUPABASE
const SUPABASE_URL = 'https://rbicywnjsbrbezomrnss.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJiaWN5d25qc2JyYmV6b21ybnNzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ5MjE5MDgsImV4cCI6MjA3MDQ5NzkwOH0.eVW1XGZVFmQa49-Ai2rwqSXbMdthqHHRZsCpOU3k6bw';

interface Usuario {
  dni: string;
  nombre: string;
  password: string;
  tipo: 'admin' | 'user';
  created_at: string;
}

export default function Login() {
  const [dni, setDni] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [supabaseConnected, setSupabaseConnected] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setMounted(true);
    initializeAdmin();
    testSupabaseConnection();

    // Verificar si ya está autenticado
    const authStatus = localStorage.getItem('alanizAuth');
    if (authStatus === 'ok') {
      const userType = localStorage.getItem('alanizUserType');
      if (userType === 'admin') {
        navigate('/admin');
      } else {
        navigate('/sede-electronica');
      }
    }
  }, [navigate]);

  // Test de conexión a Supabase
  const testSupabaseConnection = async () => {
    try {
      const response = await fetch(`${SUPABASE_URL}/rest/v1/`, {
        headers: {
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
        }
      });
      setSupabaseConnected(response.ok);
    } catch (error) {
      console.error('Error conectando con Supabase:', error);
      setSupabaseConnected(false);
    }
  };

  // Inicializar admin local (fallback)
  const initializeAdmin = () => {
    const existingUsers = localStorage.getItem('alanizUsers');

    if (!existingUsers) {
      const adminUser = {
        '34323575P': {
          name: 'Administrador',
          password: '110788',
          type: 'admin',
          createdDate: new Date().toISOString(),
        },
      };

      localStorage.setItem('alanizUsers', JSON.stringify(adminUser));
      localStorage.setItem('alanizDocuments', JSON.stringify({}));
    }
  };

  // Función para autenticar usuario con Supabase
  const authenticateUserWithSupabase = async (dni: string, password: string): Promise<Usuario | null> => {
    try {
      const response = await fetch(`${SUPABASE_URL}/rest/v1/usuarios?dni=eq.${dni.toUpperCase()}&password=eq.${password}&select=*`, {
        headers: {
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Error al consultar la base de datos');
      }

      const data = await response.json();
      return data.length > 0 ? data[0] : null;
    } catch (error) {
      console.error('Error autenticando con Supabase:', error);
      return null;
    }
  };

  // Función fallback para autenticar con localStorage
  const authenticateUserWithLocalStorage = (dni: string, password: string): Usuario | null => {
    try {
      const users = JSON.parse(localStorage.getItem('alanizUsers') || '{}');
      const userData = users[dni.toUpperCase()];
      
      if (userData && userData.password === password) {
        return {
          dni: dni.toUpperCase(),
          nombre: userData.name,
          password: userData.password,
          tipo: userData.type,
          created_at: userData.createdDate || new Date().toISOString()
        };
      }
      return null;
    } catch (error) {
      console.error('Error autenticando con localStorage:', error);
      return null;
    }
  };

  const handle = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (!dni || !pass) {
      setError('Por favor, completa todos los campos');
      setIsLoading(false);
      return;
    }

    if (dni.length !== 9) {
      setError('El DNI debe tener 9 caracteres');
      setIsLoading(false);
      return;
    }

    // Simular delay para UX
    await new Promise(resolve => setTimeout(resolve, 1000));

    try {
      let user: Usuario | null = null;

      // Intentar autenticar con Supabase primero
      if (supabaseConnected) {
        user = await authenticateUserWithSupabase(dni, pass);
      }
      
      // Si falla Supabase o no está conectado, usar localStorage como fallback
      if (!user) {
        console.log('Supabase falló o no disponible, intentando con localStorage...');
        user = authenticateUserWithLocalStorage(dni, pass);
      }

      if (user) {
        // Autenticación exitosa
        localStorage.setItem('alanizAuth', 'ok');
        localStorage.setItem('alanizAuthTimestamp', Date.now().toString());
        localStorage.setItem('alanizUserId', user.dni);
        localStorage.setItem('alanizUserType', user.tipo);
        localStorage.setItem('alanizUserName', user.nombre);

        setError('success');
        setTimeout(() => {
          // Redirigir según tipo de usuario
          if (user.tipo === 'admin') {
            navigate('/admin');
          } else {
            navigate('/sede-electronica');
          }
        }, 1000);
      } else {
        setError('DNI o contraseña incorrectos.');
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Error durante el login:', error);
      setError('Error de conexión. Intenta de nuevo.');
      setIsLoading(false);
    }
  };

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-alanizGreen-950">
        <div className="animate-spin rounded-full h-12 w-12 border-2 border-alanizGold-600 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-alanizGreen-950 p-4">
      {/* Background decorativo */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-alanizGold-600/5 rounded-full blur-3xl animate-float"></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-alanizGold-600/3 rounded-full blur-2xl animate-float"
          style={{ animationDelay: '2s' }}
        ></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Contenedor principal del formulario */}
        <div className="card-elegant animate-fade-in-up shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 border-2 border-alanizGold-600 bg-transparent rounded-full mb-6">
              <Shield className="w-8 h-8 text-alanizGold-600" aria-hidden="true" />
            </div>

            <h1 className="text-2xl md:text-3xl font-display font-bold text-alanizGold-600 mb-2">
              Acceso Privado
            </h1>

            <p className="text-parchment-300 text-sm mb-3">
              Área reservada para miembros verificados de la Casa Alaniz
            </p>

            {/* Indicador de estado de conexión */}
            <div className="flex items-center justify-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${supabaseConnected ? 'bg-green-400' : 'bg-yellow-400'}`}></div>
              <span className={`text-xs ${supabaseConnected ? 'text-green-400' : 'text-yellow-400'}`}>
                {supabaseConnected ? 'Sistema global activo' : 'Modo local activo'}
              </span>
            </div>
          </div>

          {/* Mensajes de estado */}
          {error && error !== 'success' && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg animate-fade-in-down">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
                <p className="text-red-400 text-sm font-medium">{error}</p>
              </div>
            </div>
          )}

          {error === 'success' && (
            <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg animate-fade-in-down">
              <div className="flex items-center space-x-3">
                <Check className="w-5 h-5 text-green-400" aria-hidden="true" />
                <p className="text-green-400 text-sm font-medium">
                  Acceso autorizado. Redirigiendo...
                </p>
              </div>
            </div>
          )}

          {/* Formulario */}
          <form onSubmit={handle} className="form-elegant">
            {/* Campo de DNI */}
            <div>
              <label htmlFor="dni" className="block text-sm font-medium text-alanizGold-600 mb-2">
                DNI
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <IdCard className="h-5 w-5 text-alanizGold-600/50" aria-hidden="true" />
                </div>
                <input
                  id="dni"
                  type="text"
                  placeholder="DNI del usuario"
                  value={dni}
                  onChange={(e) => setDni(e.target.value.toUpperCase())}
                  required
                  disabled={isLoading}
                  maxLength={9}
                  className="pl-10 w-full px-4 py-3 bg-alanizGreen-800/50 
                             border border-alanizGold-600/30 rounded-lg
                             text-parchment-100 placeholder-parchment-400
                             focus:border-alanizGold-600 focus:bg-alanizGreen-800/70
                             disabled:opacity-50 disabled:cursor-not-allowed
                             transition-all duration-300 uppercase"
                />
              </div>
            </div>

            {/* Campo de contraseña */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-alanizGold-600 mb-2">
                Contraseña
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-alanizGold-600/50" aria-hidden="true" />
                </div>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Ingrese su contraseña"
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                  required
                  disabled={isLoading}
                  className="pl-10 pr-10 w-full px-4 py-3 bg-alanizGreen-800/50 
                             border border-alanizGold-600/30 rounded-lg
                             text-parchment-100 placeholder-parchment-400
                             focus:border-alanizGold-600 focus:bg-alanizGreen-800/70
                             disabled:opacity-50 disabled:cursor-not-allowed
                             transition-all duration-300"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center 
                             text-alanizGold-600/50 hover:text-alanizGold-600 
                             disabled:opacity-50 transition-colors duration-200"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" aria-hidden="true" />
                  ) : (
                    <Eye className="h-5 w-5" aria-hidden="true" />
                  )}
                </button>
              </div>
            </div>

            {/* Botón de envío */}
            <button
              type="submit"
              disabled={isLoading || !dni || !pass}
              className="w-full btn-alaniz disabled:opacity-50 disabled:cursor-not-allowed 
                         disabled:hover:scale-100 relative overflow-hidden"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-alanizGreen-950 border-t-transparent rounded-full animate-spin"></div>
                  <span>Verificando...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-2">
                  <Lock className="w-5 h-5" aria-hidden="true" />
                  <span>Acceder al Sistema</span>
                </div>
              )}
            </button>
          </form>

          {/* Información adicional */}
          <div className="mt-8 pt-6 border-t border-alanizGold-600/20">
            <div className="bg-alanizGreen-900/30 rounded-lg p-4">
              <h3 className="font-semibold text-alanizGold-600 text-sm mb-2">
                Solo para Miembros Verificados
              </h3>
              <p className="text-xs text-parchment-400 leading-relaxed mb-3">
                El acceso está restringido a miembros oficiales de la Casa Alaniz con credenciales válidas.
              </p>
              <div className="flex items-center justify-between text-xs text-parchment-500">
                <span>¿No tienes acceso?</span>
                <a
                  href="/contacto"
                  className="text-alanizGold-600 hover:text-alanizGold-500 
                             transition-colors duration-200 underline-offset-2 hover:underline"
                >
                  Contactar administración
                </a>
              </div>
            </div>

            {/* Información técnica */}
            <div className="mt-4 p-3 bg-alanizGreen-800/20 rounded-lg">
              <div className="flex items-center justify-between text-xs">
                <span className="text-parchment-500">Estado del sistema:</span>
                <div className="flex items-center space-x-2">
                  <span className={`inline-flex items-center gap-1 ${supabaseConnected ? 'text-green-400' : 'text-yellow-400'}`}>
                    {supabaseConnected ? (
                      <>
                        <Cloud className="w-4 h-4" aria-hidden="true" /> Global
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4" aria-hidden="true" /> Local
                      </>
                    )}
                  </span>
                  <button
                    onClick={testSupabaseConnection}
                    className="text-alanizGold-600 hover:text-alanizGold-500 text-xs underline"
                  >
                    Test
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Footer del formulario */}
          <div className="mt-6 text-center">
            <p className="text-xs text-parchment-500">
              Protegido por medidas de seguridad de la Casa Alaniz
            </p>
          </div>
        </div>

        {/* Enlace para volver */}
        <div className="text-center mt-6">
          <a
            href="/"
            className="text-sm text-alanizGold-600/70 hover:text-alanizGold-600 
                       transition-colors duration-200 underline-offset-2 hover:underline"
          >
            <ArrowLeft className="inline w-4 h-4 mr-1 align-text-bottom" aria-hidden="true" /> Volver al Archivo Principal
          </a>
        </div>
      </div>
    </div>
  );
}
