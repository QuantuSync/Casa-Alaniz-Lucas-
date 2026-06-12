import React, { useEffect } from 'react';
import { ScrollText, Landmark, Map, Swords, Crown, Castle, Star, Flame, Leaf } from 'lucide-react';

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
    elementsToObserve.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen py-16 md:py-24">
      <div className="content-container">
        {/* Hero Section */}
        <div className="stack-centered mb-16 observe-me opacity-0 translate-y-8">
          <div
            className="inline-flex items-center justify-center w-16 h-16 border-2 border-alanizGold-600 bg-transparent
                          rounded-full mb-6"
          >
            <ScrollText className="w-8 h-8 text-alanizGold-600" aria-hidden="true" />
          </div>

          <h1 className="text-4xl md:text-5xl font-display font-bold text-alanizGold-600 mb-6">
            Crónica Fundacional de la Casa Alaniz
          </h1>

          <div className="rule-gold mx-auto my-6" aria-hidden="true"></div>

          <p className="text-lg text-parchment-300 max-w-3xl mx-auto leading-relaxed">
            El recorrido que la tradición familiar atribuye a la Casa Alaniz, desde el siglo XII
            hasta su refundación en el siglo XXI.
          </p>
        </div>

        {/* Contenido Principal */}
        <article className="max-w-5xl mx-auto space-y-12">
          {/* Origen Oriental - Siglo XII */}
          <div
            className="card-elegant observe-me opacity-0 translate-y-8"
            style={{ animationDelay: '200ms' }}
          >
            <div className="flex items-start space-x-6 mb-6">
              <div className="flex-shrink-0">
                <div
                  className="inline-flex items-center justify-center w-14 h-14
                                border-2 border-alanizGold-600 bg-transparent rounded-full"
                >
                  <Landmark className="w-5 h-5 text-alanizGold-600" aria-hidden="true" />
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-3">
                  <span
                    className="inline-flex items-center px-4 py-2 rounded-full text-sm font-bold 
                                   bg-alanizGold-600 text-alanizGreen-950"
                  >
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
                La tradición familiar sitúa los orígenes de la Casa Alaniz en el siglo XII, en una
                región entre la actual{' '}
                <strong className="text-alanizGold-500">Siria y Mesopotamia</strong>. Se les recuerda
                como una familia de ingenieros y artesanos militares que daban apoyo logístico y
                constructivo a los ejércitos de la época, sin atarse a un bando concreto.
              </p>
              <p>
                Su conocimiento en{' '}
                <em className="text-alanizGold-400">mecánica, cartografía y fortificaciones</em> los
                hizo valiosos tanto para ejércitos como para caravanas comerciales.
              </p>
            </div>
          </div>

          {/* Migración hacia Europa - Siglo XIII-XIV */}
          <div
            className="card-elegant observe-me opacity-0 translate-y-8"
            style={{ animationDelay: '400ms' }}
          >
            <div className="flex items-start space-x-6 mb-6">
              <div className="flex-shrink-0">
                <div
                  className="inline-flex items-center justify-center w-14 h-14
                                border-2 border-alanizGold-600 bg-transparent rounded-full"
                >
                  <Map className="w-5 h-5 text-alanizGold-600" aria-hidden="true" />
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-3">
                  <span
                    className="inline-flex items-center px-4 py-2 rounded-full text-sm font-bold 
                                   bg-alanizGold-600 text-alanizGreen-950"
                  >
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
                parte de la familia se trasladó al oeste, pasando por{' '}
                <strong className="text-alanizGold-500">Constantinopla</strong> y asentándose
                durante un tiempo en la región de{' '}
                <strong className="text-alanizGold-500">Provenza</strong>, en el sur de Francia.
              </p>
              <p>
                Allí, los Alaniz se integraron como expertos{' '}
                <em className="text-alanizGold-400">herreros y cartógrafos</em> en cortes locales.
                Es en este periodo donde el apellido empieza a consolidarse como identidad familiar.
                No ostentan títulos de alta nobleza, pero adquieren reconocimiento como linaje al
                servicio de casas influyentes.
              </p>
            </div>
          </div>

          {/* Establecimiento en la Península Ibérica - Siglo XV */}
          <div
            className="card-elegant observe-me opacity-0 translate-y-8"
            style={{ animationDelay: '600ms' }}
          >
            <div className="flex items-start space-x-6 mb-6">
              <div className="flex-shrink-0">
                <div
                  className="inline-flex items-center justify-center w-14 h-14
                                border-2 border-alanizGold-600 bg-transparent rounded-full"
                >
                  <Swords className="w-5 h-5 text-alanizGold-600" aria-hidden="true" />
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-3">
                  <span
                    className="inline-flex items-center px-4 py-2 rounded-full text-sm font-bold 
                                   bg-alanizGold-600 text-alanizGreen-950"
                  >
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
                primero en <strong className="text-alanizGold-500">Navarra</strong> y posteriormente
                en <strong className="text-alanizGold-500">Castilla</strong>. Durante la Reconquista
                tardía, colaboran en la fortificación de plazas recientemente recuperadas y en la
                mejora de rutas comerciales interiores.
              </p>
              <p>
                Es en este contexto donde se les otorga una{' '}
                <strong className="text-alanizGold-500">
                  posesión señorial en el territorio del{' '}
                  <strong className="text-alanizGold-400 text-lg">Valle de Monterrey</strong>
                </strong>
                , una tierra de importancia estratégica y simbólica en Galicia, junto a la frontera
                portuguesa. Desde este enclave ejercen{' '}
                <em className="text-alanizGold-400">
                  autoridad territorial, justicia menor y responsabilidad sobre la defensa del
                  territorio
                </em>
                .
              </p>
            </div>
          </div>

          {/* Consolidación del linaje - Siglos XVI-XVIII */}
          <div
            className="card-elegant observe-me opacity-0 translate-y-8"
            style={{ animationDelay: '800ms' }}
          >
            <div className="flex items-start space-x-6 mb-6">
              <div className="flex-shrink-0">
                <div
                  className="inline-flex items-center justify-center w-14 h-14
                                border-2 border-alanizGold-600 bg-transparent rounded-full"
                >
                  <Crown className="w-5 h-5 text-alanizGold-600" aria-hidden="true" />
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-3">
                  <span
                    className="inline-flex items-center px-4 py-2 rounded-full text-sm font-bold 
                                   bg-alanizGold-600 text-alanizGreen-950"
                  >
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
                <strong className="text-alanizGold-400">familia noble menor</strong> con posesión
                señorial propia, participando en la administración local, la protección del valle y
                el sostenimiento de su identidad territorial.
              </p>
              <p>
                Aunque no forma parte de la alta nobleza cortesana, sí goza de{' '}
                <strong className="text-alanizGold-400">
                  pleno reconocimiento como casa señorial
                </strong>
                . Su escudo original, hoy reconstruido, habría sido usado en sellos, banderas y
                armamento, y su linaje fue transmitido por vía directa.
              </p>
            </div>
          </div>

          {/* Renacimiento - Siglo XXI */}
          <div
            className="card-elegant bg-gradient-to-r from-alanizGreen-800/80 to-alanizGreen-900/80 
                          border-2 border-alanizGold-600/40 observe-me opacity-0 translate-y-8"
            style={{ animationDelay: '1000ms' }}
          >
            <div className="flex items-start space-x-6 mb-6">
              <div className="flex-shrink-0">
                <div
                  className="inline-flex items-center justify-center w-14 h-14
                                border-2 border-alanizGold-600 bg-transparent rounded-full"
                >
                  <Castle className="w-5 h-5 text-alanizGold-600" aria-hidden="true" />
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-3">
                  <span
                    className="inline-flex items-center px-4 py-2 rounded-full text-sm font-bold 
                                   bg-alanizGold-600 text-alanizGreen-950 animate-pulse"
                  >
                    Siglo XXI
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
                Desde <strong className="text-alanizGold-400">2011</strong>, la Casa Alaniz retoma
                una <strong className="text-alanizGold-400">tradición de inspiración militar</strong>{' '}
                que recoge el oficio de sus antepasados ingenieros. Más que un asunto castrense, se
                entiende como una forma de trabajar basada en la{' '}
                <em className="text-alanizGold-400">disciplina, el honor y el servicio</em>.
              </p>
              <p>
                En paralelo, la Casa asume un{' '}
                <strong className="text-alanizGold-400">
                  compromiso con la formación de los jóvenes
                </strong>
                , en la idea de que lo que de verdad cuenta es lo que se aporta a los demás. Sobre
                principios como la{' '}
                <em className="text-alanizGold-400">
                  integridad, la responsabilidad y el esfuerzo
                </em>{' '}
                se prepara la refundación del linaje.
              </p>

              <p>
                En <strong className="text-alanizGold-400">2025</strong> el linaje se reorganiza
                formalmente como <strong className="text-alanizGold-400">Casa Alaniz</strong>:
                recupera sus símbolos, redacta su acta fundacional y adopta un escudo de armas
                propio.
              </p>
              <p>
                Se establece el lema{' '}
                <em className="text-alanizGold-400 text-lg">"Memoria Ardet"</em> ("La memoria arde"),
                por la voluntad de mantener viva la historia familiar. El{' '}
                <strong className="text-alanizGold-400">lobo</strong> se adopta como figura central:
                no como animal salvaje, sino como símbolo de{' '}
                <em>inteligencia, vigilancia y lealtad</em>.
              </p>

              {/* Detalles del escudo */}
              <div className="bg-alanizGreen-900/50 rounded-lg p-6 border border-alanizGold-600/30 mt-6">
                <h4 className="text-lg font-display font-semibold text-alanizGold-500 mb-3">
                  Elementos Heráldicos
                </h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start space-x-3">
                    <Star className="w-5 h-5 text-alanizGold-400 mt-1" aria-hidden="true" />
                    <span>
                      <strong>Tres estrellas</strong> por las hijas de la familia: Abril, Diana y
                      Martina
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <Flame className="w-5 h-5 text-alanizGold-400 mt-1" aria-hidden="true" />
                    <span>
                      <strong>Orbe de ámbar</strong>, la llama del lema "Memoria Ardet"
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <Leaf className="w-5 h-5 text-alanizGold-400 mt-1" aria-hidden="true" />
                    <span>
                      <strong>Raíces</strong>, el peso de la memoria y los orígenes
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-alanizGold-600/10 rounded-lg p-6 border-l-4 border-alanizGold-600 mt-6">
                <p className="text-alanizGold-400 font-medium mb-4">
                  Con sede en <strong>Castilla y León</strong>, la Casa Alaniz mira a su historia sin
                  nostalgia: la entiende como un punto de partida para hacer cosas útiles en el
                  presente, más que como un título del pasado.
                </p>
                <p className="text-alanizGold-500 text-sm italic">
                  La continuidad de la Casa se confía a <strong>Abril</strong>, la hija mayor, junto
                  a sus hermanas <strong>Diana</strong> y <strong>Martina</strong>.
                </p>
              </div>
            </div>
          </div>

          {/* Cita final inspiracional */}
          <div
            className="text-center mt-16 observe-me opacity-0 translate-y-8"
            style={{ animationDelay: '1200ms' }}
          >
            <div
              className="bg-alanizGreen-800/50 rounded-xl p-8 border border-alanizGold-600/20 
                            backdrop-blur-sm shadow-elegant"
            >
              <blockquote className="text-xl md:text-2xl font-display italic text-alanizGold-600 mb-4">
                "Del siglo XII a hoy, la memoria de la Casa Alaniz sigue viva."
              </blockquote>
              <cite className="text-parchment-400 text-sm">
                — Crónica Fundacional de la Casa Alaniz
              </cite>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
