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
            <span className="w-8 h-8 text-alanizGreen-950 text-2xl">⚜️</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-display font-bold text-alanizGold-600 mb-6">
            El Legado Inmutable
          </h1>
          
          <div className="divider-ornamental"></div>
          
          <p className="text-lg text-parchment-300 max-w-3xl mx-auto leading-relaxed">
            Ocho siglos de historia han forjado un legado que trasciende el tiempo: 
            territorio, honor, conocimiento y la responsabilidad sagrada hacia las futuras generaciones.
          </p>
        </div>

        {/* Contenido Principal */}
        <div className="max-w-5xl mx-auto space-y-12">
          
          {/* Legado Territorial */}
          <div className="card-elegant observe-me opacity-0 translate-y-8" 
               style={{ animationDelay: '200ms' }}>
            <div className="flex items-start space-x-6 mb-6">
              <div className="flex-shrink-0">
                <div className="inline-flex items-center justify-center w-14 h-14 
                                bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full shadow-lg">
                  <span className="text-white text-xl">🏔️</span>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-display font-semibold text-alanizGold-600 mb-4">
                  Legado Territorial: El Valle de Monterrey
                </h3>
              </div>
            </div>
            
            <div className="space-y-4 text-parchment-200 leading-relaxed">
              <p>
                El <strong className="text-alanizGold-500">Valle de Monterrey</strong> constituye mucho más que una posesión; 
                representa el corazón territorial de la Casa Alaniz, una responsabilidad señorial que ha pasado de 
                generación en generación desde el siglo XV. Este valle fronterizo con Portugal simboliza 
                la <em className="text-alanizGold-400">autoridad territorial, la justicia menor y la defensa del territorio</em>{' '}
                que define nuestra naturaleza señorial.
              </p>
              <p>
                La herencia territorial conlleva no solo derechos, sino deberes sagrados: la protección de 
                quienes habitan bajo nuestro amparo, la administración justa y la preservación de la paz 
                en nuestras tierras. El <strong className="text-alanizGold-500">Señor de la Casa Alaniz</strong> ostenta 
                actualmente esta responsabilidad ancestral que conecta el pasado medieval con el presente.
              </p>
            </div>
          </div>

          {/* Legado de Conocimiento */}
          <div className="card-elegant observe-me opacity-0 translate-y-8" 
               style={{ animationDelay: '400ms' }}>
            <div className="flex items-start space-x-6 mb-6">
              <div className="flex-shrink-0">
                <div className="inline-flex items-center justify-center w-14 h-14 
                                bg-gradient-to-r from-blue-500 to-blue-600 rounded-full shadow-lg">
                  <span className="text-white text-xl">⚙️</span>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-display font-semibold text-alanizGold-600 mb-4">
                  Legado del Conocimiento Estratégico
                </h3>
              </div>
            </div>
            
            <div className="space-y-4 text-parchment-200 leading-relaxed">
              <p>
                Desde las <strong className="text-alanizGold-500">rutas cruzadas del siglo XII</strong>, la Casa Alaniz 
                ha custodiado conocimientos especializados en <em className="text-alanizGold-400">ingeniería militar, 
                cartografía, mecánica y fortificaciones</em>. Este saber técnico, transmitido de padre a hijo 
                durante ocho siglos, constituye un patrimonio intelectual único que nos distingue como 
                casa de ingenieros y estrategas.
              </p>
              <p>
                La <strong className="text-alanizGold-500">tradición militar moderna</strong>, renovada desde 2011, 
                honra este legado ancestral adaptándolo a los tiempos presentes. Lejos de tratarse de nostalgia, 
                representa la aplicación práctica de principios eternos: disciplina, estrategia, honor y servicio.
              </p>
              
              <div className="bg-alanizGreen-900/50 rounded-lg p-6 border border-alanizGold-600/30 mt-6">
                <h4 className="text-lg font-display font-semibold text-alanizGold-500 mb-3">
                  Disciplinas Ancestrales
                </h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center space-x-3">
                    <span className="text-alanizGold-400">⚔️</span>
                    <span>Ingeniería militar y fortificaciones</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-alanizGold-400">🗺️</span>
                    <span>Cartografía y navegación terrestre</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-alanizGold-400">🔧</span>
                    <span>Mecánica aplicada y logística</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-alanizGold-400">🏰</span>
                    <span>Administración territorial</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Legado Heráldico */}
          <div className="card-elegant observe-me opacity-0 translate-y-8" 
               style={{ animationDelay: '600ms' }}>
            <div className="flex items-start space-x-6 mb-6">
              <div className="flex-shrink-0">
                <div className="inline-flex items-center justify-center w-14 h-14 
                                bg-gradient-to-r from-purple-500 to-purple-600 rounded-full shadow-lg">
                  <span className="text-white text-xl">🛡️</span>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-display font-semibold text-alanizGold-600 mb-4">
                  Legado Heráldico: Símbolos de Continuidad
                </h3>
              </div>
            </div>
            
            <div className="space-y-4 text-parchment-200 leading-relaxed">
              <p>
                El <strong className="text-alanizGold-500">escudo de armas reconstituido</strong> en 2025 trasciende una 
                creación caprichosa, constituyendo la recuperación formal de símbolos que han definido nuestra 
                identidad durante siglos. Cada elemento porta significado profundo y conecta el presente 
                con la memoria ancestral.
              </p>
              
              <div className="grid md:grid-cols-2 gap-8 mt-6">
                <div className="space-y-4">
                  <div className="bg-alanizGold-600/10 rounded-lg p-4 border-l-4 border-alanizGold-600">
                    <h5 className="font-display font-semibold text-alanizGold-500 mb-2">
                      El Lobo Guardian
                    </h5>
                    <p className="text-sm text-parchment-300">
                      Símbolo central que representa la <em>inteligencia antes que la fuerza</em>, 
                      la vigilancia perpetua, la valentía y la fidelidad inquebrantable al linaje.
                    </p>
                  </div>
                  
                  <div className="bg-alanizGold-600/10 rounded-lg p-4 border-l-4 border-alanizGold-600">
                    <h5 className="font-display font-semibold text-alanizGold-500 mb-2">
                      Las Tres Estrellas
                    </h5>
                    <p className="text-sm text-parchment-300">
                      <strong>Abril</strong> la heredera, <strong>Diana</strong> la valiente, y{' '}
                      <strong>Martina</strong> la protectora. Las luminarias del linaje vivo 
                      que aseguran la continuidad de la Casa.
                    </p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-alanizGold-600/10 rounded-lg p-4 border-l-4 border-alanizGold-600">
                    <h5 className="font-display font-semibold text-alanizGold-500 mb-2">
                      El Orbe de Ámbar
                    </h5>
                    <p className="text-sm text-parchment-300">
                      Representa la llama interior que nunca se extingue, la pasión por preservar 
                      la memoria y el fuego sagrado del lema <em>"Memoria Ardet"</em>.
                    </p>
                  </div>
                  
                  <div className="bg-alanizGold-600/10 rounded-lg p-4 border-l-4 border-alanizGold-600">
                    <h5 className="font-display font-semibold text-alanizGold-500 mb-2">
                      Las Raíces Profundas
                    </h5>
                    <p className="text-sm text-parchment-300">
                      Simbolizan la profundidad de la memoria ancestral y la conexión 
                      inquebrantable con nuestros orígenes orientales y nuestro pasado señorial.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Legado de Valores */}
          <div className="card-elegant observe-me opacity-0 translate-y-8" 
               style={{ animationDelay: '800ms' }}>
            <div className="flex items-start space-x-6 mb-6">
              <div className="flex-shrink-0">
                <div className="inline-flex items-center justify-center w-14 h-14 
                                bg-gradient-to-r from-red-500 to-red-600 rounded-full shadow-lg">
                  <span className="text-white text-xl">🔥</span>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-display font-semibold text-alanizGold-600 mb-4">
                  Legado de Valores: "Memoria Ardet"
                </h3>
              </div>
            </div>
            
            <div className="space-y-4 text-parchment-200 leading-relaxed">
              <p>
                <em className="text-alanizGold-400 text-xl">"Memoria Ardet"</em> — "La memoria arde" — 
                trasciende un simple lema, constituyendo la filosofía fundamental que guía cada acción de la Casa Alaniz. 
                Esta llama interior impulsa la preservación consciente de nuestro legado y la transmisión 
                responsable a las generaciones futuras.
              </p>
              <p>
                El <strong className="text-alanizGold-500">compromiso con la formación de los jóvenes</strong> constituye 
                la expresión práctica de este legado. Entendemos que la verdadera nobleza reside 
                en la capacidad de forjar caracteres íntegros basados en{' '}
                <em className="text-alanizGold-400">la disciplina, el honor, la integridad, el liderazgo responsable 
                y la excelencia personal</em>, jamás en títulos vacíos.
              </p>
              
              <div className="bg-alanizGreen-900/50 rounded-lg p-6 border border-alanizGold-600/30 mt-6">
                <blockquote className="text-lg italic text-alanizGold-400 mb-4">
                  "El verdadero valor no reside en la espada, sino en el corazón que la empuña 
                  al servicio de la justicia y la formación de las generaciones venideras."
                </blockquote>
                <cite className="text-sm text-parchment-400">— Principio rector de la Casa Alaniz</cite>
              </div>
            </div>
          </div>

          {/* Legado de Continuidad */}
          <div className="card-elegant bg-gradient-to-r from-alanizGreen-800/80 to-alanizGreen-900/80 
                          border-2 border-alanizGold-600/40 observe-me opacity-0 translate-y-8" 
               style={{ animationDelay: '1000ms' }}>
            <div className="flex items-start space-x-6 mb-6">
              <div className="flex-shrink-0">
                <div className="inline-flex items-center justify-center w-14 h-14 
                                bg-gradient-to-r from-alanizGold-500 to-alanizGold-600 rounded-full shadow-lg">
                  <span className="text-alanizGreen-950 text-xl">👑</span>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-display font-semibold text-alanizGold-500 mb-4">
                  Legado de Continuidad: La Sucesión Sagrada
                </h3>
              </div>
            </div>
            
            <div className="space-y-4 text-parchment-100 leading-relaxed">
              <p>
                La <strong className="text-alanizGold-400">sucesión del señorío</strong> trasciende un acto meramente simbólico, 
                constituyendo la culminación natural de ocho siglos de transmisión directa del linaje. 
                Bajo la actual jefatura del <strong className="text-alanizGold-400">Señor de la Casa Alaniz</strong>, 
                se garantiza que el legado perdurará y se proyectará con renovada fuerza hacia el futuro.
              </p>
              <p>
                Esta continuidad trasciende lo genealógico para convertirse en <em className="text-alanizGold-400">responsabilidad 
                generacional</em>: custodiar el honor familiar, preservar los conocimientos ancestrales, 
                mantener viva la tradición militar y, sobre todo, formar a las próximas generaciones 
                en los valores que han definido nuestra casa durante casi un milenio.
              </p>
              
              <div className="bg-alanizGold-600/10 rounded-lg p-6 border-l-4 border-alanizGold-600 mt-6">
                <p className="text-alanizGold-400 font-medium text-center italic">
                  "No heredamos la tierra de nuestros ancestros; la tomamos prestada de nuestros hijos. 
                  La Casa Alaniz es el custodio eterno de un legado que trasciende el tiempo."
                </p>
              </div>
            </div>
          </div>

          {/* Cita final inspiracional */}
          <div className="text-center mt-16 observe-me opacity-0 translate-y-8" 
               style={{ animationDelay: '1200ms' }}>
            <div className="bg-alanizGreen-800/50 rounded-xl p-8 border border-alanizGold-600/20 
                            backdrop-blur-sm shadow-elegant">
              <blockquote className="text-xl md:text-2xl font-display italic text-alanizGold-600 mb-4">
                "Ocho siglos han forjado nuestro carácter. La eternidad será nuestro horizonte. 
                Mientras arda la memoria, perdurará el linaje."
              </blockquote>
              <cite className="text-parchment-400 text-sm">
                — Credo perpetuo de la Casa Alaniz
              </cite>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
