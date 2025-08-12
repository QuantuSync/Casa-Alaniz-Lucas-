import React, { useEffect } from 'react';

export default function Historia() {
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
                          rounded-full shadow-lg mb-6">
            <span className="w-8 h-8 text-alanizGreen-950 text-2xl">📜</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-display font-bold text-alanizGold-600 mb-6">
            Crónica Fundacional de la Casa Alaniz
          </h1>
          
          <div className="divider-ornamental"></div>
          
          <p className="text-lg text-parchment-300 max-w-3xl mx-auto leading-relaxed">
            Una historia milenaria que abarca desde el siglo XII hasta la refundación 
            de nuestra Casa en el siglo XXI, atravesando continentes y épocas.
          </p>
        </div>

        {/* Contenido Principal */}
        <article className="max-w-5xl mx-auto space-y-12">
          
          {/* Origen Oriental - Siglo XII */}
          <div className="card-elegant observe-me opacity-0 translate-y-8" 
               style={{ animationDelay: '200ms' }}>
            <div className="flex items-start space-x-6 mb-6">
              <div className="flex-shrink-0">
                <div className="inline-flex items-center justify-center w-14 h-14 
                                bg-gradient-to-r from-amber-500 to-amber-600 rounded-full shadow-lg">
                  <span className="text-white text-xl">🏛️</span>
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-3">
                  <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-bold 
                                   bg-alanizGold-600 text-alanizGreen-950">
                    Siglo XII
                  </span>
                  <div className="h-px flex-1 bg-alanizGold-600/30"></div>
                </div>
                <h3 className="text-2xl font-display font-semibold text-alanizGold-600 mb-4">
                  Origen Oriental
                </h3>
              </div>
            </div>
            
            <div className="space-y-4 text-parchment-200 leading-relaxed">
              <p>
                Los orígenes remotos de la Casa Alaniz se remontan al siglo XII, en una región 
                situada entre la actual <strong className="text-alanizGold-500">Siria y Mesopotamia</strong>. 
                Los primeros registros hacen referencia a una familia de ingenieros y artesanos 
                militares que servían como apoyo logístico y constructivo a las huestes cruzadas, 
                sin estar necesariamente vinculados a un bando religioso.
              </p>
              <p>
                Su conocimiento en <em className="text-alanizGold-400">mecánica, cartografía y fortificaciones</em> los 
                hizo valiosos tanto para ejércitos como para caravanas comerciales.
              </p>
            </div>
          </div>

          {/* Migración hacia Europa - Siglo XIII-XIV */}
          <div className="card-elegant observe-me opacity-0 translate-y-8" 
               style={{ animationDelay: '400ms' }}>
            <div className="flex items-start space-x-6 mb-6">
              <div className="flex-shrink-0">
                <div className="inline-flex items-center justify-center w-14 h-14 
                                bg-gradient-to-r from-blue-500 to-blue-600 rounded-full shadow-lg">
                  <span className="text-white text-xl">🗺️</span>
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-3">
                  <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-bold 
                                   bg-alanizGold-600 text-alanizGreen-950">
                    Siglos XIII - XIV
                  </span>
                  <div className="h-px flex-1 bg-alanizGold-600/30"></div>
                </div>
                <h3 className="text-2xl font-display font-semibold text-alanizGold-600 mb-4">
                  Migración hacia Europa
                </h3>
              </div>
            </div>
            
            <div className="space-y-4 text-parchment-200 leading-relaxed">
              <p>
                Con la decadencia de las rutas cruzadas y el aumento de las tensiones en la región, 
                parte de la familia se trasladó al oeste, pasando por <strong className="text-alanizGold-500">Constantinopla</strong> y 
                asentándose durante un tiempo en la región de <strong className="text-alanizGold-500">Provenza</strong>, 
                en el sur de Francia.
              </p>
              <p>
                Allí, los Alaniz se integraron como expertos <em className="text-alanizGold-400">herreros y cartógrafos</em> en 
                cortes locales. Es en este periodo donde el apellido empieza a consolidarse como identidad 
                familiar. No ostentan títulos de alta nobleza, pero adquieren reconocimiento como linaje 
                al servicio de casas influyentes.
              </p>
            </div>
          </div>

          {/* Establecimiento en la Península Ibérica - Siglo XV */}
          <div className="card-elegant observe-me opacity-0 translate-y-8" 
               style={{ animationDelay: '600ms' }}>
            <div className="flex items-start space-x-6 mb-6">
              <div className="flex-shrink-0">
                <div className="inline-flex items-center justify-center w-14 h-14 
                                bg-gradient-to-r from-red-500 to-red-600 rounded-full shadow-lg">
                  <span className="text-white text-xl">⚔️</span>
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-3">
                  <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-bold 
                                   bg-alanizGold-600 text-alanizGreen-950">
                    Siglo XV
                  </span>
                  <div className="h-px flex-1 bg-alanizGold-600/30"></div>
                </div>
                <h3 className="text-2xl font-display font-semibold text-alanizGold-600 mb-4">
                  Establecimiento en la Península Ibérica
                </h3>
              </div>
            </div>
            
            <div className="space-y-4 text-parchment-200 leading-relaxed">
              <p>
                A comienzos del siglo XV, una rama de la familia cruza los Pirineos y se establece 
                primero en <strong className="text-alanizGold-500">Navarra</strong> y posteriormente en <strong className="text-alanizGold-500">Castilla</strong>. 
                Durante la Reconquista tardía, colaboran en la fortificación de plazas recientemente 
                recuperadas y en la mejora de rutas comerciales interiores.
              </p>
              <p>
                Es en este contexto donde se les otorga un señorío en el{' '}
                <strong className="text-alanizGold-400 text-lg">Valle de Monterrey</strong>, una tierra de importancia 
                estratégica y simbólica en Galicia, junto a la frontera portuguesa. Desde este enclave 
                ejercen <em className="text-alanizGold-400">autoridad territorial, justicia menor y responsabilidad 
                sobre la defensa del territorio</em>.
              </p>
            </div>
          </div>

          {/* Consolidación del linaje - Siglos XVI-XVIII */}
          <div className="card-elegant observe-me opacity-0 translate-y-8" 
               style={{ animationDelay: '800ms' }}>
            <div className="flex items-start space-x-6 mb-6">
              <div className="flex-shrink-0">
                <div className="inline-flex items-center justify-center w-14 h-14 
                                bg-gradient-to-r from-purple-500 to-purple-600 rounded-full shadow-lg">
                  <span className="text-white text-xl">👑</span>
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-3">
                  <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-bold 
                                   bg-alanizGold-600 text-alanizGreen-950">
                    Siglos XVI - XVIII
                  </span>
                  <div className="h-px flex-1 bg-alanizGold-600/30"></div>
                </div>
                <h3 className="text-2xl font-display font-semibold text-alanizGold-600 mb-4">
                  Consolidación del Linaje
                </h3>
              </div>
            </div>
            
            <div className="space-y-4 text-parchment-200 leading-relaxed">
              <p>
                Durante los siglos posteriores, la Casa Alaniz mantiene su posición como{' '}
                <strong className="text-alanizGold-400">familia noble menor</strong> con señorío propio, 
                participando en la administración local, la protección del valle y el sostenimiento 
                de su identidad territorial.
              </p>
              <p>
                Aunque no forma parte de la alta nobleza cortesana, sí goza de{' '}
                <strong className="text-alanizGold-400">pleno reconocimiento como casa señorial</strong>. 
                Su escudo original, hoy reconstruido, habría sido usado en sellos, banderas y armamento, 
                y su linaje fue transmitido por vía directa.
              </p>
            </div>
          </div>

          {/* Renacimiento - Siglo XXI */}
          <div className="card-elegant bg-gradient-to-r from-alanizGreen-800/80 to-alanizGreen-900/80 
                          border-2 border-alanizGold-600/40 observe-me opacity-0 translate-y-8" 
               style={{ animationDelay: '1000ms' }}>
            <div className="flex items-start space-x-6 mb-6">
              <div className="flex-shrink-0">
                <div className="inline-flex items-center justify-center w-14 h-14 
                                bg-gradient-to-r from-alanizGold-500 to-alanizGold-600 rounded-full shadow-lg">
                  <span className="text-alanizGreen-950 text-xl">🏰</span>
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-3">
                  <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-bold 
                                   bg-alanizGold-600 text-alanizGreen-950 animate-pulse">
                    2025 - Siglo XXI
                  </span>
                  <div className="h-px flex-1 bg-alanizGold-600/50"></div>
                </div>
                <h3 className="text-2xl font-display font-semibold text-alanizGold-500 mb-4">
                  Renacimiento de la Casa Alaniz
                </h3>
              </div>
            </div>
            
            <div className="space-y-4 text-parchment-100 leading-relaxed">
              <p>
                En el año <strong className="text-alanizGold-400">2025</strong>, el linaje es formalmente reorganizado y 
                fundado como <strong className="text-alanizGold-400">Casa Alaniz</strong>, recuperando sus símbolos, 
                redactando su acta fundacional, diseñando un escudo de armas propio y consolidando 
                su identidad heráldica.
              </p>
              <p>
                Se establece el lema <em className="text-alanizGold-400 text-lg">"Memoria Ardet"</em> ("La memoria arde"), 
                en referencia al fuego interior que preserva la historia familiar. El <strong className="text-alanizGold-400">lobo</strong> se 
                adopta como emblema central, no como figura salvaje, sino como representación de la <em>inteligencia antes que la fuerza</em>, 
                la vigilancia, la valentía y la fidelidad por encima de todo.
              </p>
              
              {/* Detalles del escudo */}
              <div className="bg-alanizGreen-900/50 rounded-lg p-6 border border-alanizGold-600/30 mt-6">
                <h4 className="text-lg font-display font-semibold text-alanizGold-500 mb-3">
                  Elementos Heráldicos
                </h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start space-x-3">
                    <span className="text-alanizGold-400 mt-1">⭐</span>
                    <span><strong>Tres estrellas</strong> con los nombres de las hijas del linaje vivo: 
                    Abril la heredera del señorío, Diana la valiente, y Martina la protectora</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-alanizGold-400 mt-1">🔥</span>
                    <span><strong>Orbe de ámbar</strong> que representa la llama latente</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-alanizGold-400 mt-1">🌿</span>
                    <span><strong>Raíces</strong> que simbolizan la profundidad de la memoria</span>
                  </li>
                </ul>
              </div>

                            
              <div className="bg-alanizGold-600/10 rounded-lg p-6 border-l-4 border-alanizGold-600 mt-6">
                <p className="text-alanizGold-400 font-medium mb-4">
                  Desde su sede en <strong>Castilla y León</strong>, la Casa Alaniz se proyecta con plena conciencia 
                  de su historia, y con la voluntad de ejercer una <em>autoridad moral, legítima y simbólica</em>, 
                  como casa señorial viva. No es la nostalgia quien la impulsa, sino la fidelidad a un linaje 
                  que, lejos de extinguirse, arde con renovada fuerza.
                </p>
                <p className="text-alanizGold-500 text-sm italic">
                  La sucesión del señorío del Valle de Monterrey recae en <strong>Abril</strong>, 
                  la hija mayor y heredera legítima, quien junto a sus hermanas <strong>Diana</strong> y{' '}
                  <strong>Martina</strong>, representa la continuidad del linaje y la proyección futura 
                  de la Casa Alaniz.
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
                "De Oriente al Valle de Monterrey, de los siglos a la eternidad, 
                la memoria arde y el linaje perdura."
              </blockquote>
              <cite className="text-parchment-400 text-sm">— Crónica Fundacional de la Casa Alaniz</cite>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
