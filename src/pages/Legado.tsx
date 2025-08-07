import React, { useEffect } from 'react';

export default function Legado() {
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

  return (
    <div className="min-h-screen py-16">
      <div className="content-container">
        
        {/* Hero Section */}
        <div className="text-center mb-16 observe-me opacity-0 translate-y-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-alanizGold-600 
                          rounded-full shadow-lg mb-6 animate-float">
            <span className="w-8 h-8 text-alanizGreen-950 text-2xl">👑</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-display font-bold text-alanizGold-600 mb-6">
            El Legado Vivo
          </h1>
          
          <div className="divider-ornamental"></div>
          
          <p className="text-lg text-parchment-300 max-w-3xl mx-auto leading-relaxed">
            Un legado que trasciende el tiempo, preservando valores eternos y 
            guiando a las futuras generaciones de la Casa Alaniz.
          </p>
        </div>

        {/* Contenido Principal */}
        <div className="max-w-4xl mx-auto space-y-12">
          
          {/* Primer párrafo con elementos visuales */}
          <div className="card-elegant observe-me opacity-0 translate-y-8" 
               style={{ animationDelay: '200ms' }}>
            <div className="flex items-start space-x-6">
              <div className="flex-shrink-0">
                <div className="inline-flex items-center justify-center w-14 h-14 
                                bg-gradient-to-r from-purple-500 to-purple-600 rounded-full shadow-lg">
                  <span className="w-7 h-7 text-white text-2xl">❤️</span>
                </div>
              </div>
              <div className="flex-1 space-y-4">
                <h3 className="text-xl font-display font-semibold text-alanizGold-600">
                  La Esencia del Legado
                </h3>
                <p className="text-parchment-200 leading-relaxed text-base md:text-lg">
                  El legado de la Casa Alaniz late en cada guardián que preserva su
                  historia, en cada manuscrito restaurado y en cada juramento renovado al
                  alba.
                </p>
              </div>
            </div>
          </div>

          {/* Elementos del legado */}
          <div className="grid md:grid-cols-3 gap-6 observe-me opacity-0 translate-y-8" 
               style={{ animationDelay: '400ms' }}>
            
            {/* Guardianes */}
            <div className="text-center space-y-4 p-6 bg-alanizGreen-800/30 rounded-lg 
                            border border-alanizGold-600/20 hover:border-alanizGold-600/40 
                            transition-all duration-300 hover:bg-alanizGreen-800/50">
              <div className="inline-flex items-center justify-center w-12 h-12 
                              bg-alanizGold-600 rounded-full shadow-lg mx-auto">
                <span className="w-6 h-6 text-alanizGreen-950 text-lg">👥</span>
              </div>
              <h4 className="font-display font-semibold text-alanizGold-600">
                Los Guardianes
              </h4>
              <p className="text-sm text-parchment-300">
                Custodios que preservan la memoria familiar con dedicación inquebrantable
              </p>
            </div>

            {/* Manuscritos */}
            <div className="text-center space-y-4 p-6 bg-alanizGreen-800/30 rounded-lg 
                            border border-alanizGold-600/20 hover:border-alanizGold-600/40 
                            transition-all duration-300 hover:bg-alanizGreen-800/50">
              <div className="inline-flex items-center justify-center w-12 h-12 
                              bg-alanizGold-600 rounded-full shadow-lg mx-auto">
                <span className="w-6 h-6 text-alanizGreen-950 text-lg">📚</span>
              </div>
              <h4 className="font-display font-semibold text-alanizGold-600">
                Los Manuscritos
              </h4>
              <p className="text-sm text-parchment-300">
                Documentos restaurados que narran siglos de historia y tradición
              </p>
            </div>

            {/* Juramentos */}
            <div className="text-center space-y-4 p-6 bg-alanizGreen-800/30 rounded-lg 
                            border border-alanizGold-600/20 hover:border-alanizGold-600/40 
                            transition-all duration-300 hover:bg-alanizGreen-800/50">
              <div className="inline-flex items-center justify-center w-12 h-12 
                              bg-alanizGold-600 rounded-full shadow-lg mx-auto">
                <span className="w-6 h-6 text-alanizGreen-950 text-lg">⭐</span>
              </div>
              <h4 className="font-display font-semibold text-alanizGold-600">
                Los Juramentos
              </h4>
              <p className="text-sm text-parchment-300">
                Promesas renovadas cada alba para mantener vivo el honor familiar
              </p>
            </div>
          </div>

          {/* Segundo párrafo con simbolismo */}
          <div className="card-elegant observe-me opacity-0 translate-y-8" 
               style={{ animationDelay: '600ms' }}>
            <div className="flex items-start space-x-6">
              <div className="flex-shrink-0">
                <div className="inline-flex items-center justify-center w-14 h-14 
                                bg-gradient-to-r from-red-500 to-red-600 rounded-full shadow-lg">
                  <span className="w-7 h-7 text-white text-2xl">🔥</span>
                </div>
              </div>
              <div className="flex-1 space-y-4">
                <h3 className="text-xl font-display font-semibold text-alanizGold-600">
                  La Sangre del Lobo
                </h3>
                <p className="text-parchment-200 leading-relaxed text-base md:text-lg">
                  Custodiar el pasado es iluminar el futuro. Así la sangre del lobo
                  permanece, fiera pero noble, guiando a los descendientes.
                </p>
              </div>
            </div>
          </div>

          {/* Elementos simbólicos del lobo */}
          <div className="bg-gradient-to-r from-alanizGreen-900/50 to-alanizGreen-800/50 
                          rounded-xl p-8 border border-alanizGold-600/20 backdrop-blur-sm 
                          shadow-elegant observe-me opacity-0 translate-y-8" 
               style={{ animationDelay: '800ms' }}>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <h4 className="text-2xl font-display font-bold text-alanizGold-600">
                  Características del Legado
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-alanizGold-600 rounded-full"></div>
                    <span className="text-parchment-200 font-medium">Fiereza Noble</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-alanizGold-600 rounded-full"></div>
                    <span className="text-parchment-200 font-medium">Guía Ancestral</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-alanizGold-600 rounded-full"></div>
                    <span className="text-parchment-200 font-medium">Honor Perpetuo</span>
                  </div>
                </div>
              </div>
              <div className="text-center flex flex-col items-center justify-center">
                <div className="inline-flex items-center justify-center w-24 h-24 
                                bg-alanizGold-600/10 rounded-full border-2 border-alanizGold-600/30 
                                shadow-inner mb-4">
                  <span className="text-4xl" role="img" aria-label="lobo">🐺</span>
                </div>
                <p className="text-sm text-alanizGold-600/70 italic text-center">
                  Símbolo del guardián eterno
                </p>
              </div>
            </div>
          </div>

          {/* Cita final inspiracional */}
          <div className="text-center observe-me opacity-0 translate-y-8" 
               style={{ animationDelay: '1000ms' }}>
            <div className="bg-alanizGreen-800/50 rounded-xl p-8 border border-alanizGold-600/20 
                            backdrop-blur-sm shadow-elegant">
              <blockquote className="text-xl md:text-2xl font-display italic text-alanizGold-600 mb-4">
                "El verdadero legado no reside en lo que heredamos, sino en lo que preservamos 
                para quienes vendrán después de nosotros."
              </blockquote>
              <cite className="text-parchment-400 text-sm">
                — Filosofía de la Casa Alaniz
              </cite>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}