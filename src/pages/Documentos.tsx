import React, { useEffect } from 'react';

export default function Documentos() {
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

  // Datos de los tipos de documentos que estarán disponibles
  const documentTypes = [
    {
      icon: '📜',
      title: 'Cartas Históricas',
      description: 'Correspondencia familiar y oficial preservada a través de los siglos',
      color: 'from-amber-500 to-amber-600'
    },
    {
      icon: '📄',
      title: 'Tratados y Acuerdos',
      description: 'Documentos legales y alianzas establecidas por la Casa Alaniz',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: '🗺️',
      title: 'Cartografía Ancestral',
      description: 'Mapas y planos de territorios y propiedades familiares',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: '📚',
      title: 'Crónicas Restauradas',
      description: 'Relatos históricos y testimonios de eventos significativos',
      color: 'from-purple-500 to-purple-600'
    }
  ];

  return (
    <div className="min-h-screen py-16">
      <div className="content-container">
        
        {/* Hero Section */}
        <div className="text-center mb-16 observe-me opacity-0 translate-y-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-alanizGold-600 
                          rounded-full shadow-lg mb-6">
            <span className="w-8 h-8 text-alanizGreen-950 text-2xl">📚</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-display font-bold text-alanizGold-600 mb-6">
            Archivo Documental
          </h1>
          
          <div className="divider-ornamental"></div>
          
          <p className="text-lg text-parchment-300 max-w-3xl mx-auto leading-relaxed">
            El tesoro más preciado de la Casa Alaniz: documentos históricos que 
            narran siglos de historia, honor y tradición familiar.
          </p>
        </div>

        {/* Estado actual del archivo */}
        <div className="max-w-4xl mx-auto mb-16">
          
          {/* Anuncio principal */}
          <div className="card-elegant observe-me opacity-0 translate-y-8" 
               style={{ animationDelay: '200ms' }}>
            <div className="flex items-start space-x-6">
              <div className="flex-shrink-0">
                <div className="inline-flex items-center justify-center w-14 h-14 
                                bg-gradient-to-r from-orange-500 to-orange-600 rounded-full shadow-lg">
                  <span className="w-7 h-7 text-white text-2xl">⏰</span>
                </div>
              </div>
              <div className="flex-1 space-y-4">
                <div className="flex items-center space-x-3 mb-4">
                  <h3 className="text-xl font-display font-semibold text-alanizGold-600">
                    Repositorio en Desarrollo
                  </h3>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold 
                                   bg-orange-500 text-white animate-pulse">
                    Próximamente
                  </span>
                </div>
                <p className="text-parchment-200 leading-relaxed text-base md:text-lg">
                  Próximamente se habilitará un repositorio digital con cartas, tratados,
                  cartografía y crónicas restauradas. El acceso estará reservado a los
                  miembros verificados de la Casa.
                </p>
              </div>
            </div>
          </div>

          {/* Tipos de documentos disponibles */}
          <div className="mt-12 observe-me opacity-0 translate-y-8" 
               style={{ animationDelay: '400ms' }}>
            <h3 className="text-2xl font-display font-semibold text-alanizGold-600 text-center mb-8">
              Colecciones del Archivo
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              {documentTypes.map((type, index) => {
                return (
                  <div 
                    key={type.title}
                    className="bg-alanizGreen-800/30 rounded-lg p-6 border border-alanizGold-600/20 
                               hover:border-alanizGold-600/40 transition-all duration-300 
                               hover:bg-alanizGreen-800/50 group"
                  >
                    <div className="flex items-start space-x-4">
                      <div className={`inline-flex items-center justify-center w-12 h-12 
                                       bg-gradient-to-r ${type.color} rounded-full shadow-lg 
                                       group-hover:scale-110 transition-transform duration-300`}>
                        <span className="text-white text-xl">{type.icon}</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-display font-semibold text-alanizGold-600 mb-2 
                                       group-hover:text-alanizGold-500 transition-colors duration-300">
                          {type.title}
                        </h4>
                        <p className="text-sm text-parchment-300 leading-relaxed">
                          {type.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Información sobre acceso */}
          <div className="mt-12 observe-me opacity-0 translate-y-8" 
               style={{ animationDelay: '600ms' }}>
            <div className="bg-gradient-to-r from-alanizGreen-900/50 to-alanizGreen-800/50 
                            rounded-xl p-8 border border-alanizGold-600/20 backdrop-blur-sm shadow-elegant">
              <div className="flex items-start space-x-6">
                <div className="flex-shrink-0">
                  <div className="inline-flex items-center justify-center w-14 h-14 
                                  bg-alanizGold-600 rounded-full shadow-lg">
                    <span className="w-7 h-7 text-alanizGreen-950 text-2xl">🔒</span>
                  </div>
                </div>
                <div className="flex-1 space-y-4">
                  <h3 className="text-xl font-display font-semibold text-alanizGold-600">
                    Acceso Restringido
                  </h3>
                  <p className="text-parchment-200 leading-relaxed">
                    El archivo documental estará disponible únicamente para miembros verificados 
                    de la Casa Alaniz. Esta medida garantiza la preservación y el uso adecuado 
                    de documentos de valor histórico incalculable.
                  </p>
                  <div className="grid md:grid-cols-2 gap-6 mt-6">
                    <div className="space-y-3">
                      <h4 className="font-semibold text-alanizGold-600 text-sm uppercase tracking-wider">
                        Requisitos de Acceso
                      </h4>
                      <ul className="space-y-2 text-sm text-parchment-300">
                        <li className="flex items-center space-x-2">
                          <div className="w-1.5 h-1.5 bg-alanizGold-600 rounded-full"></div>
                          <span>Verificación de linaje</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <div className="w-1.5 h-1.5 bg-alanizGold-600 rounded-full"></div>
                          <span>Autenticación digital</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <div className="w-1.5 h-1.5 bg-alanizGold-600 rounded-full"></div>
                          <span>Compromiso de preservación</span>
                        </li>
                      </ul>
                    </div>
                    <div className="space-y-3">
                      <h4 className="font-semibold text-alanizGold-600 text-sm uppercase tracking-wider">
                        Características
                      </h4>
                      <ul className="space-y-2 text-sm text-parchment-300">
                        <li className="flex items-center space-x-2">
                          <div className="w-1.5 h-1.5 bg-alanizGold-600 rounded-full"></div>
                          <span>Alta resolución digital</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <div className="w-1.5 h-1.5 bg-alanizGold-600 rounded-full"></div>
                          <span>Metadata detallada</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <div className="w-1.5 h-1.5 bg-alanizGold-600 rounded-full"></div>
                          <span>Búsqueda avanzada</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Aviso para miembros */}
          <div className="mt-12 observe-me opacity-0 translate-y-8" 
               style={{ animationDelay: '800ms' }}>
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-6">
              <div className="flex items-start space-x-4">
                <span className="w-6 h-6 text-blue-400 flex-shrink-0 mt-0.5">⚠️</span>
                <div className="flex-1">
                  <h4 className="font-semibold text-blue-400 mb-2">
                    Para Miembros de la Casa Alaniz
                  </h4>
                  <p className="text-sm text-parchment-300 leading-relaxed mb-4">
                    Si eres descendiente de nuestra noble casa y deseas acceso al archivo 
                    documental cuando esté disponible, contacta con la administración para 
                    iniciar el proceso de verificación.
                  </p>
                  <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                    <a 
                      href="/contacto"
                      className="btn-secondary text-center"
                    >
                      Contactar Administración
                    </a>
                    <a 
                      href="/login"
                      className="btn-alaniz text-center"
                    >
                      <span className="w-4 h-4 mr-2">🔒</span>
                      Acceso Miembros
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}