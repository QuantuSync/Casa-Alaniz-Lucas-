import React, { useEffect } from 'react';

export default function Contacto() {
  useEffect(() => {
    // Intersection Observer para animaciones
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

    return () => observer.disconnect();
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
    <div className="min-h-screen py-16">
      <div className="content-container">
        
        {/* Hero Section */}
        <div className="text-center mb-16 observe-me opacity-0 translate-y-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-alanizGold-600 
                          rounded-full shadow-lg mb-6">
            <span className="w-8 h-8 text-alanizGreen-950 text-2xl">📤</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-display font-bold text-alanizGold-600 mb-6">
            Contacto Oficial
          </h1>
          
          <div className="divider-ornamental"></div>
          
          <p className="text-lg text-parchment-300 max-w-3xl mx-auto leading-relaxed">
            Establece comunicación con la administración oficial de la Casa Alaniz 
            para asuntos relacionados con genealogía, archivos y membresía.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          
          {/* Contenido principal - dos columnas */}
          <div className="grid lg:grid-cols-3 gap-12">
            
            {/* Columna principal - Información de contacto */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* Mensaje principal */}
              <div className="card-elegant observe-me opacity-0 translate-y-8" 
                   style={{ animationDelay: '200ms' }}>
                <div className="flex items-start space-x-6">
                  <div className="flex-shrink-0">
                    <div className="inline-flex items-center justify-center w-14 h-14 
                                    bg-gradient-to-r from-alanizGold-500 to-alanizGold-600 rounded-full shadow-lg">
                      <span className="w-7 h-7 text-white text-2xl">📧</span>
                    </div>
                  </div>
                  <div className="flex-1 space-y-4">
                    <h3 className="text-xl font-display font-semibold text-alanizGold-600">
                      Comunicación Directa
                    </h3>
                    <p className="text-parchment-200 leading-relaxed text-base md:text-lg mb-6">
                      Para asuntos administrativos, genealogía o solicitud de archivos, escriba a:
                    </p>
                    
                    {/* Email destacado */}
                    <div className="bg-alanizGreen-900/50 rounded-lg p-6 border-l-4 border-alanizGold-600">
                      <div className="text-center">
                        <a
                          href="mailto:administracion@casaalaniz.es"
                          className="text-xl md:text-2xl font-display font-semibold text-alanizGold-600 
                                     hover:text-alanizGold-500 transition-colors duration-300 
                                     underline-offset-4 hover:underline block break-words"
                        >
                          administracion@casaalaniz.es
                        </a>
                        <p className="text-sm text-parchment-400 mt-2 text-center">
                          Haga clic para abrir su cliente de correo
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Información de contacto detallada */}
              <div className="space-y-6 observe-me opacity-0 translate-y-8" 
                   style={{ animationDelay: '400ms' }}>
                <h3 className="text-2xl font-display font-semibold text-alanizGold-600 text-center mb-8">
                  Información de Contacto
                </h3>
                
                <div className="space-y-4">
                  {contactInfo.map((info, index) => {
                    return (
                      <div 
                        key={info.title}
                        className="bg-alanizGreen-800/30 rounded-lg p-6 border border-alanizGold-600/20 
                                   hover:border-alanizGold-600/40 transition-all duration-300 
                                   hover:bg-alanizGreen-800/50 group"
                      >
                        <div className="flex items-start space-x-4">
                          <div className={`inline-flex items-center justify-center w-12 h-12 
                                           bg-gradient-to-r ${info.color} rounded-full shadow-lg 
                                           group-hover:scale-110 transition-transform duration-300`}>
                            <span className="text-white text-xl">{info.icon}</span>
                          </div>
                          <div className="flex-1">
                            <h4 className="text-lg font-display font-semibold text-alanizGold-600 mb-1 
                                           group-hover:text-alanizGold-500 transition-colors duration-300">
                              {info.title}
                            </h4>
                            <p className="text-parchment-200 font-medium mb-2">
                              {info.content}
                            </p>
                            <p className="text-sm text-parchment-300 leading-relaxed">
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
                <h3 className="text-xl font-display font-semibold text-alanizGold-600 mb-6 text-center">
                  Servicios Disponibles
                </h3>
                
                <div className="space-y-4">
                  {serviceTypes.map((service, index) => {
                    return (
                      <div key={service.title} className="flex items-start space-x-3 p-4 
                                                          bg-alanizGreen-900/30 rounded-lg border border-alanizGold-600/10
                                                          hover:border-alanizGold-600/30 transition-all duration-300">
                        <div className="flex-shrink-0">
                          <span className="w-5 h-5 text-alanizGold-600 mt-0.5">{service.icon}</span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-alanizGold-600 text-sm mb-1">
                            {service.title}
                          </h4>
                          <p className="text-xs text-parchment-300 leading-relaxed">
                            {service.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Nota importante */}
                <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
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
          <div className="mt-16 text-center observe-me opacity-0 translate-y-8" 
               style={{ animationDelay: '800ms' }}>
            <div className="bg-gradient-to-r from-alanizGreen-900/50 to-alanizGreen-800/50 
                            rounded-xl p-8 border border-alanizGold-600/20 backdrop-blur-sm shadow-elegant">
              <div className="max-w-3xl mx-auto space-y-6">
                <div className="inline-flex items-center justify-center w-16 h-16 
                                bg-alanizGold-600 rounded-full shadow-lg mb-4">
                  <span className="w-8 h-8 text-alanizGreen-950 text-2xl">👥</span>
                </div>
                
                <h3 className="text-2xl font-display font-bold text-alanizGold-600">
                  ¿Formas parte de la Casa Alaniz?
                </h3>
                
                <p className="text-parchment-200 leading-relaxed">
                  Si crees que puedes tener vínculos con nuestra noble casa o necesitas 
                  información sobre documentos genealógicos, no dudes en contactarnos. 
                  Nuestro equipo de administración te ayudará en todo el proceso.
                </p>
                
                <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                  <a 
                    href="mailto:administracion@casaalaniz.es"
                    className="btn-alaniz"
                  >
                    <span className="w-5 h-5 mr-2">📧</span>
                    Enviar Consulta
                  </a>
                  <a 
                    href="/login"
                    className="btn-secondary"
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