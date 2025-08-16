import React, { useEffect } from 'react';

export default function Contacto() {
  useEffect(() => {
    // Añadir estilos CSS necesarios
    const style = document.createElement('style');
    style.textContent = `
      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(30px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      .animate-fade-in-up {
        animation: fadeInUp 0.8s ease-out forwards;
      }

      .observe-me {
        transition: all 0.6s ease-out;
      }

      .divider-ornamental {
        width: 80px;
        height: 2px;
        background: linear-gradient(90deg, transparent, #d4af37, transparent);
        margin: 1.5rem auto;
        position: relative;
      }

      .divider-ornamental::before {
        content: '❋';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: #1a2e1a;
        padding: 0 0.5rem;
        color: #d4af37;
        font-size: 0.875rem;
      }

      .shadow-elegant {
        box-shadow: 
          0 4px 6px -1px rgba(0, 0, 0, 0.1),
          0 2px 4px -1px rgba(0, 0, 0, 0.06),
          0 0 0 1px rgba(212, 175, 55, 0.1);
      }

      @media (max-width: 768px) {
        .card-elegant {
          padding: 1.5rem;
        }
        
        .content-container {
          padding-left: 1rem;
          padding-right: 1rem;
        }
        
        .observe-me {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .animate-fade-in-up,
        .observe-me {
          animation: none !important;
          transition: none !important;
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
      }
    `;
    document.head.appendChild(style);

    // Intersection Observer para animaciones (solo en desktop)
    const isMobile = window.innerWidth < 768;
    
    if (!isMobile) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('animate-fade-in-up');
            }
          });
        },
        { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
      );

      const elementsToObserve = document.querySelectorAll('.observe-me');
      elementsToObserve.forEach(el => observer.observe(el));

      return () => {
        observer.disconnect();
        if (document.head.contains(style)) {
          document.head.removeChild(style);
        }
      };
    }

    return () => {
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    };
  }, []);

  // Información de contacto y servicios
  const contactInfo = [
    {
      icon: '📧',
      title: 'Correo Oficial',
      content: 'administracion@casaalaniz.es',
      description: 'Canal principal para asuntos administrativos y consultas oficiales',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: '📍',
      title: 'Ubicación',
      content: 'Castilla y León, España',
      description: 'Sede del archivo heráldico y administración familiar',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: '⏰',
      title: 'Tiempo de Respuesta',
      content: '48-72 horas',
      description: 'Tiempo estimado para respuestas a consultas administrativas',
      color: 'from-purple-500 to-purple-600'
    }
  ];

  const serviceTypes = [
    {
      icon: '👥',
      title: 'Consultas Genealógicas',
      description: 'Investigación de linajes y conexiones familiares con la Casa Alaniz'
    },
    {
      icon: '📄',
      title: 'Solicitud de Archivos',
      description: 'Acceso a documentos históricos y certificaciones oficiales'
    },
    {
      icon: '❓',
      title: 'Asuntos Administrativos',
      description: 'Gestiones relacionadas con el archivo heráldico y membresía'
    }
  ];

  return (
    <div className="min-h-screen bg-alanizGreen-950 py-8 md:py-16">
      <div className="content-container px-4 md:px-8">
        
        {/* Hero Section */}
        <div className="text-center mb-8 md:mb-16 observe-me opacity-0 translate-y-8">
          <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 
                          bg-alanizGold-600 rounded-full shadow-lg mb-4 md:mb-6">
            <span className="text-alanizGreen-950 text-xl md:text-2xl">📤</span>
          </div>
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-alanizGold-600 mb-4 md:mb-6 px-4">
            Contacto Oficial
          </h1>
          
          <div className="divider-ornamental"></div>
          
          <p className="text-base md:text-lg text-parchment-300 max-w-3xl mx-auto leading-relaxed px-4">
            Establece comunicación con la administración oficial de la Casa Alaniz 
            para asuntos relacionados con genealogía, archivos y membresía.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          
          {/* Contenido principal - responsive */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-12">
            
            {/* Columna principal - Información de contacto */}
            <div className="lg:col-span-2 space-y-6 md:space-y-8">
              
              {/* Mensaje principal */}
              <div className="card-elegant observe-me opacity-0 translate-y-8" 
                   style={{ animationDelay: '200ms' }}>
                <div className="flex flex-col md:flex-row md:items-start space-y-4 md:space-y-0 md:space-x-6">
                  <div className="flex-shrink-0 self-center md:self-start">
                    <div className="inline-flex items-center justify-center w-12 h-12 md:w-14 md:h-14 
                                    bg-gradient-to-r from-alanizGold-500 to-alanizGold-600 rounded-full shadow-lg">
                      <span className="text-white text-xl md:text-2xl">📧</span>
                    </div>
                  </div>
                  <div className="flex-1 space-y-4 text-center md:text-left">
                    <h3 className="text-lg md:text-xl font-display font-semibold text-alanizGold-600">
                      Comunicación Directa
                    </h3>
                    <p className="text-parchment-200 leading-relaxed text-sm md:text-base lg:text-lg mb-4 md:mb-6">
                      Para asuntos administrativos, genealogía o solicitud de archivos, escriba a:
                    </p>
                    
                    {/* Email destacado */}
                    <div className="bg-alanizGreen-900/50 rounded-lg p-4 md:p-6 border-l-4 border-alanizGold-600">
                      <div className="text-center">
                        <a
                          href="mailto:administracion@casaalaniz.es"
                          className="text-lg md:text-xl lg:text-2xl font-display font-semibold text-alanizGold-600 
                                     hover:text-alanizGold-500 transition-colors duration-300 
                                     underline-offset-4 hover:underline block break-all md:break-words"
                        >
                          administracion@casaalaniz.es
                        </a>
                        <p className="text-xs md:text-sm text-parchment-400 mt-2">
                          Haga clic para abrir su cliente de correo
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Información de contacto detallada */}
              <div className="space-y-4 md:space-y-6 observe-me opacity-0 translate-y-8" 
                   style={{ animationDelay: '400ms' }}>
                <h3 className="text-xl md:text-2xl font-display font-semibold text-alanizGold-600 text-center mb-6 md:mb-8">
                  Información de Contacto
                </h3>
                
                <div className="space-y-4">
                  {contactInfo.map((info, index) => {
                    return (
                      <div 
                        key={info.title}
                        className="bg-alanizGreen-800/30 rounded-lg p-4 md:p-6 border border-alanizGold-600/20 
                                   hover:border-alanizGold-600/40 transition-all duration-300 
                                   hover:bg-alanizGreen-800/50 group"
                      >
                        <div className="flex flex-col md:flex-row md:items-start space-y-3 md:space-y-0 md:space-x-4">
                          <div className={`inline-flex items-center justify-center w-10 h-10 md:w-12 md:h-12 
                                           bg-gradient-to-r ${info.color} rounded-full shadow-lg 
                                           group-hover:scale-110 transition-transform duration-300 self-center md:self-start`}>
                            <span className="text-white text-lg md:text-xl">{info.icon}</span>
                          </div>
                          <div className="flex-1 text-center md:text-left">
                            <h4 className="text-base md:text-lg font-display font-semibold text-alanizGold-600 mb-1 
                                           group-hover:text-alanizGold-500 transition-colors duration-300">
                              {info.title}
                            </h4>
                            <p className="text-parchment-200 font-medium mb-2 text-sm md:text-base">
                              {info.content}
                            </p>
                            <p className="text-xs md:text-sm text-parchment-300 leading-relaxed">
                              {info.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Columna lateral - Servicios */}
            <div className="lg:col-span-1">
              <div className="card-elegant observe-me opacity-0 translate-y-8" 
                   style={{ animationDelay: '600ms' }}>
                <h3 className="text-lg md:text-xl font-display font-semibold text-alanizGold-600 mb-4 md:mb-6 text-center">
                  Servicios Disponibles
                </h3>
                
                <div className="space-y-3 md:space-y-4">
                  {serviceTypes.map((service, index) => {
                    return (
                      <div key={service.title} className="flex items-start space-x-3 p-3 md:p-4 
                                                          bg-alanizGreen-900/30 rounded-lg border border-alanizGold-600/10
                                                          hover:border-alanizGold-600/30 transition-all duration-300">
                        <div className="flex-shrink-0">
                          <span className="text-alanizGold-600 mt-0.5 text-sm md:text-base">{service.icon}</span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-alanizGold-600 text-sm md:text-base mb-1">
                            {service.title}
                          </h4>
                          <p className="text-xs md:text-sm text-parchment-300 leading-relaxed">
                            {service.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Nota importante */}
                <div className="mt-4 md:mt-6 p-3 md:p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                  <h4 className="font-semibold text-blue-400 text-sm mb-2">
                    Nota Importante
                  </h4>
                  <p className="text-xs text-parchment-300 leading-relaxed">
                    Todas las consultas son tratadas con la máxima confidencialidad 
                    y respeto por la privacidad familiar.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sección final con llamada a la acción */}
          <div className="mt-12 md:mt-16 text-center observe-me opacity-0 translate-y-8" 
               style={{ animationDelay: '800ms' }}>
            <div className="bg-gradient-to-r from-alanizGreen-900/50 to-alanizGreen-800/50 
                            rounded-xl p-6 md:p-8 border border-alanizGold-600/20 backdrop-blur-sm shadow-elegant">
              <div className="max-w-3xl mx-auto space-y-4 md:space-y-6">
                <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 
                                bg-alanizGold-600 rounded-full shadow-lg mb-4">
                  <span className="text-alanizGreen-950 text-xl md:text-2xl">👥</span>
                </div>
                
                <h3 className="text-xl md:text-2xl font-display font-bold text-alanizGold-600">
                  ¿Formas parte de la Casa Alaniz?
                </h3>
                
                <p className="text-parchment-200 leading-relaxed text-sm md:text-base">
                  Si crees que puedes tener vínculos con nuestra noble casa o necesitas 
                  información sobre documentos genealógicos, no dudes en contactarnos. 
                  Nuestro equipo de administración te ayudará en todo el proceso.
                </p>
                
                <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                  <a 
                    href="mailto:administracion@casaalaniz.es"
                    className="btn-alaniz w-full sm:w-auto"
                  >
                    <span className="mr-2">📧</span>
                    Enviar Consulta
                  </a>
                  <a 
                    href="/login"
                    className="btn-secondary w-full sm:w-auto"
                  >
                    Acceso Miembros
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
