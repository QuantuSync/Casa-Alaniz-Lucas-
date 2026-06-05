import React, { useEffect, useState } from 'react';
import {
  Library,
  FileText,
  Crown,
  Shield,
  User,
  LogOut,
  Calendar,
  Clock,
  type LucideIcon,
} from 'lucide-react';

export default function Miembros() {
  const [mounted, setMounted] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    setMounted(true);

    // Actualizar hora cada segundo
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleLogout = () => {
    // Confirmar logout con modal elegante
    if (window.confirm('¿Está seguro de que desea cerrar la sesión y salir del área privada?')) {
      localStorage.removeItem('alanizAuth');
      localStorage.removeItem('alanizAuthTimestamp');
      location.href = '/login';
    }
  };

  // Información de sesión
  const sessionInfo = {
    user: 'administracion@casaalaniz.es',
    loginTime: localStorage.getItem('alanizAuthTimestamp')
      ? new Date(parseInt(localStorage.getItem('alanizAuthTimestamp')!))
      : new Date(),
    role: 'Administrador Principal',
  };

  // Funcionalidades disponibles (futuras)
  const availableFeatures: {
    icon: LucideIcon;
    title: string;
    description: string;
    status: string;
    color: string;
  }[] = [
    {
      icon: Library,
      title: 'Archivo Documental',
      description: 'Acceso a documentos históricos digitalizados',
      status: 'En desarrollo',
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: FileText,
      title: 'Registro Genealógico',
      description: 'Gestión de árboles familiares y linajes',
      status: 'Próximamente',
      color: 'from-green-500 to-green-600',
    },
    {
      icon: Crown,
      title: 'Certificaciones',
      description: 'Emisión de certificados heráldicos oficiales',
      status: 'Planificado',
      color: 'from-purple-500 to-purple-600',
    },
  ];

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-alanizGreen-950">
        <div className="animate-spin rounded-full h-12 w-12 border-2 border-alanizGold-600 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-alanizGreen-950">
      {/* Background decorativo */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-alanizGold-600/5 rounded-full blur-3xl animate-float"></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-alanizGold-600/3 rounded-full blur-2xl animate-float"
          style={{ animationDelay: '2s' }}
        ></div>
      </div>

      <div className="relative z-10 py-16">
        <div className="content-container">
          {/* Header de bienvenida */}
          <div className="text-center mb-16 animate-fade-in-up">
            <div
              className="inline-flex items-center justify-center w-20 h-20 border-2 border-alanizGold-600 bg-transparent
                            rounded-full mb-8 animate-float"
            >
              <Shield className="w-10 h-10 text-alanizGold-600" aria-hidden="true" />
            </div>

            <h1 className="text-4xl md:text-5xl font-display font-bold text-alanizGold-600 mb-4">
              Bienvenido, Guardián
            </h1>

            <div className="divider-ornamental"></div>

            <p className="text-lg text-parchment-300 max-w-3xl mx-auto leading-relaxed">
              Has accedido al área privada de la Casa Alaniz. Desde aquí podrás gestionar los
              documentos sagrados y registros históricos de nuestra noble casa.
            </p>
          </div>

          {/* Panel principal */}
          <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-8">
            {/* Información de sesión */}
            <div className="lg:col-span-2 space-y-8">
              {/* Datos del usuario */}
              <div className="card-elegant animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                <div className="flex items-start space-x-6">
                  <div className="flex-shrink-0">
                    <div
                      className="inline-flex items-center justify-center w-14 h-14
                                    border-2 border-alanizGold-600 bg-transparent rounded-full"
                    >
                      <User className="w-7 h-7 text-alanizGold-600" aria-hidden="true" />
                    </div>
                  </div>
                  <div className="flex-1 space-y-4">
                    <div>
                      <h3 className="text-xl font-display font-semibold text-alanizGold-600 mb-2">
                        Información de Sesión
                      </h3>
                      <div className="space-y-2">
                        <p className="text-parchment-200">
                          <strong className="text-alanizGold-600">Usuario:</strong>{' '}
                          {sessionInfo.user}
                        </p>
                        <p className="text-parchment-200">
                          <strong className="text-alanizGold-600">Rol:</strong> {sessionInfo.role}
                        </p>
                        <p className="text-parchment-200">
                          <strong className="text-alanizGold-600">Acceso iniciado:</strong>{' '}
                          {sessionInfo.loginTime.toLocaleString('es-ES')}
                        </p>
                      </div>
                    </div>

                    {/* Estado de conexión */}
                    <div className="flex items-center space-x-2 text-sm">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-green-400 font-medium">Sesión activa</span>
                      <span className="text-parchment-400">•</span>
                      <span className="text-parchment-400">
                        {currentTime.toLocaleTimeString('es-ES')}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mensaje principal */}
              <div className="card-elegant animate-fade-in-up" style={{ animationDelay: '400ms' }}>
                <div className="text-center space-y-6">
                  <div
                    className="inline-flex items-center justify-center w-16 h-16
                                  border-2 border-alanizGold-600 bg-transparent rounded-full"
                  >
                    <Library className="w-8 h-8 text-alanizGold-600" aria-hidden="true" />
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-2xl font-display font-bold text-alanizGold-600">
                      Archivo Privado de la Casa Alaniz
                    </h3>
                    <p className="text-parchment-200 leading-relaxed max-w-2xl mx-auto">
                      Acceso confirmado como{' '}
                      <strong className="text-alanizGold-600">{sessionInfo.user}</strong>. Aquí se
                      custodiarán los documentos sagrados y registros históricos de la Casa Alaniz.
                    </p>
                  </div>

                  {/* Funcionalidades futuras */}
                  <div className="mt-8">
                    <h4 className="text-lg font-display font-semibold text-alanizGold-600 mb-4">
                      Funcionalidades en Desarrollo
                    </h4>
                    <div className="grid gap-4">
                      {availableFeatures.map((feature) => {
                        return (
                          <div
                            key={feature.title}
                            className="flex items-center space-x-4 p-4 
                                                              bg-alanizGreen-800/30 rounded-lg border border-alanizGold-600/20"
                          >
                            <div
                              className="inline-flex items-center justify-center w-10 h-10
                                             border-2 border-alanizGold-600 bg-transparent rounded-full"
                            >
                              {React.createElement(feature.icon, {
                                className: 'w-5 h-5 text-alanizGold-600',
                                'aria-hidden': 'true',
                              })}
                            </div>
                            <div className="flex-1 text-left">
                              <h5 className="font-semibold text-alanizGold-600 text-sm">
                                {feature.title}
                              </h5>
                              <p className="text-xs text-parchment-300">{feature.description}</p>
                            </div>
                            <span
                              className="text-xs text-alanizGold-600/70 bg-alanizGold-600/10 
                                           px-2 py-1 rounded-full font-medium"
                            >
                              {feature.status}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Panel lateral */}
            <div className="lg:col-span-1 space-y-6">
              {/* Botón de cierre de sesión */}
              <div className="card-elegant animate-fade-in-up" style={{ animationDelay: '600ms' }}>
                <h4 className="font-display font-semibold text-alanizGold-600 mb-4 text-center">
                  Gestión de Sesión
                </h4>

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center space-x-2 px-6 py-3 
                             bg-red-600 hover:bg-red-500 text-white font-semibold rounded-lg 
                             shadow-lg hover:shadow-xl transition-all duration-300 
                             hover:scale-105 active:scale-95 focus:outline-none 
                             focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                >
                  <LogOut className="w-5 h-5" aria-hidden="true" />
                  <span>Cerrar Sesión</span>
                </button>

                <p className="text-xs text-parchment-400 text-center mt-3">
                  Su sesión se cerrará automáticamente en 24 horas
                </p>
              </div>

              {/* Información adicional */}
              <div className="card-elegant animate-fade-in-up" style={{ animationDelay: '800ms' }}>
                <h4 className="font-display font-semibold text-alanizGold-600 mb-4">
                  Información del Sistema
                </h4>

                <div className="space-y-3 text-sm">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-alanizGold-600" aria-hidden="true" />
                    <span className="text-parchment-300">
                      Última actualización: {new Date().toLocaleDateString('es-ES')}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-alanizGold-600" aria-hidden="true" />
                    <span className="text-parchment-300">
                      Tiempo de sesión:{' '}
                      {Math.floor((Date.now() - sessionInfo.loginTime.getTime()) / 60000)} min
                    </span>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-alanizGreen-900/30 rounded-lg border border-alanizGold-600/20">
                  <p className="text-xs text-parchment-400 text-center italic">
                    "El conocimiento preservado es el tesoro más valioso de una casa noble"
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
