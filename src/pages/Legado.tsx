import { useEffect } from 'react';
import {
  Sparkles,
  Mountain,
  Settings,
  Shield,
  Swords,
  Map,
  Wrench,
  Castle,
  Flame,
  Crown,
} from 'lucide-react';

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
                          rounded-full mb-6 animate-float"
          >
            <Sparkles className="w-8 h-8 text-alanizGold-600" aria-hidden="true" />
          </div>

          <h1 className="text-4xl md:text-5xl font-display font-bold text-alanizGold-600 mb-6">
            El Legado de la Casa
          </h1>

          <div className="rule-gold mx-auto my-6" aria-hidden="true"></div>

          <p className="text-lg text-parchment-300 max-w-3xl mx-auto leading-relaxed">
            Lo que la Casa Alaniz quiere conservar y transmitir: su territorio, su oficio, sus
            valores y su compromiso con las próximas generaciones.
          </p>
        </div>

        {/* Contenido Principal */}
        <div className="max-w-5xl mx-auto space-y-12">
          {/* Legado Territorial */}
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
                  <Mountain className="w-5 h-5 text-alanizGold-600" aria-hidden="true" />
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
                El <strong className="text-alanizGold-500">Valle de Monterrey</strong>, en Galicia y
                junto a la frontera portuguesa, es el territorio que la tradición vincula a la Casa
                Alaniz desde el siglo XV. Más que una posesión, es el lugar al que la familia liga su
                memoria.
              </p>
              <p>
                Ese vínculo se entiende hoy sobre todo como una idea de{' '}
                <em className="text-alanizGold-400">responsabilidad</em>: cuidar lo recibido y
                administrarlo con criterio. Es la lectura que el{' '}
                <strong className="text-alanizGold-500">Señor de la Casa Alaniz</strong> hace de ese
                pasado en el presente.
              </p>
            </div>
          </div>

          {/* Legado de Conocimiento */}
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
                  <Settings className="w-5 h-5 text-alanizGold-600" aria-hidden="true" />
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
                Según la tradición familiar, ya desde el{' '}
                <strong className="text-alanizGold-500">siglo XII</strong> los Alaniz se dedicaron a
                la{' '}
                <em className="text-alanizGold-400">
                  ingeniería militar, la cartografía, la mecánica y las fortificaciones
                </em>
                . Ese oficio técnico es la seña que la Casa reivindica: la de una familia de
                constructores.
              </p>
              <p>
                La <strong className="text-alanizGold-500">tradición de inspiración militar</strong>,
                retomada desde 2011, recoge ese oficio y lo lleva al presente. No es nostalgia, sino
                una forma de trabajar: disciplina, método, honor y servicio.
              </p>

              <div className="bg-alanizGreen-900/50 rounded-lg p-6 border border-alanizGold-600/30 mt-6">
                <h4 className="text-lg font-display font-semibold text-alanizGold-500 mb-3">
                  Disciplinas Ancestrales
                </h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center space-x-3">
                    <Swords className="w-5 h-5 text-alanizGold-400" aria-hidden="true" />
                    <span>Ingeniería militar y fortificaciones</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Map className="w-5 h-5 text-alanizGold-400" aria-hidden="true" />
                    <span>Cartografía y navegación terrestre</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Wrench className="w-5 h-5 text-alanizGold-400" aria-hidden="true" />
                    <span>Mecánica aplicada y logística</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Castle className="w-5 h-5 text-alanizGold-400" aria-hidden="true" />
                    <span>Administración territorial</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Legado Heráldico */}
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
                  <Shield className="w-5 h-5 text-alanizGold-600" aria-hidden="true" />
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
                El <strong className="text-alanizGold-500">escudo de armas</strong>, recuperado en
                2025, no es un capricho: fija en una forma estable los símbolos de la familia. Cada
                elemento tiene un significado.
              </p>

              <div className="grid md:grid-cols-2 gap-8 mt-6">
                <div className="space-y-4">
                  <div className="bg-alanizGold-600/10 rounded-lg p-4 border-l-4 border-alanizGold-600">
                    <h5 className="font-display font-semibold text-alanizGold-500 mb-2">
                      El Lobo Guardian
                    </h5>
                    <p className="text-sm text-parchment-300">
                      Figura central: inteligencia, vigilancia y lealtad a la familia.
                    </p>
                  </div>

                  <div className="bg-alanizGold-600/10 rounded-lg p-4 border-l-4 border-alanizGold-600">
                    <h5 className="font-display font-semibold text-alanizGold-500 mb-2">
                      Las Tres Estrellas
                    </h5>
                    <p className="text-sm text-parchment-300">
                      <strong>Abril</strong>, <strong>Diana</strong> y <strong>Martina</strong>, las
                      tres hijas de la familia y la continuidad de la Casa.
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-alanizGold-600/10 rounded-lg p-4 border-l-4 border-alanizGold-600">
                    <h5 className="font-display font-semibold text-alanizGold-500 mb-2">
                      El Orbe de Ámbar
                    </h5>
                    <p className="text-sm text-parchment-300">
                      La llama del lema <em>"Memoria Ardet"</em>: mantener viva la memoria.
                    </p>
                  </div>

                  <div className="bg-alanizGold-600/10 rounded-lg p-4 border-l-4 border-alanizGold-600">
                    <h5 className="font-display font-semibold text-alanizGold-500 mb-2">
                      Las Raíces Profundas
                    </h5>
                    <p className="text-sm text-parchment-300">
                      Los orígenes de la familia y el arraigo de su memoria.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Legado de Valores */}
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
                  <Flame className="w-5 h-5 text-alanizGold-600" aria-hidden="true" />
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
                <em className="text-alanizGold-400 text-xl">"Memoria Ardet"</em> — "La memoria arde"
                — es la idea que ordena el resto: conservar la memoria de la familia y transmitirla
                con cuidado a quienes vienen detrás.
              </p>
              <p>
                Su forma concreta es el{' '}
                <strong className="text-alanizGold-500">
                  compromiso con la formación de los jóvenes
                </strong>
                . Para la Casa, lo que cuenta no son los títulos, sino ayudar a formar personas
                íntegras a partir de{' '}
                <em className="text-alanizGold-400">
                  la disciplina, el honor, la responsabilidad y el esfuerzo
                </em>
                .
              </p>

              <div className="bg-alanizGreen-900/50 rounded-lg p-6 border border-alanizGold-600/30 mt-6">
                <blockquote className="text-lg italic text-alanizGold-400 mb-4">
                  "El verdadero valor no reside en la espada, sino en el corazón que la empuña al
                  servicio de la justicia y la formación de las generaciones venideras."
                </blockquote>
                <cite className="text-sm text-parchment-400">
                  — Principio rector de la Casa Alaniz
                </cite>
              </div>
            </div>
          </div>

          {/* Legado de Continuidad */}
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
                  <Crown className="w-5 h-5 text-alanizGold-600" aria-hidden="true" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-display font-semibold text-alanizGold-500 mb-4">
                  Legado de Continuidad: La Sucesión
                </h3>
              </div>
            </div>

            <div className="space-y-4 text-parchment-100 leading-relaxed">
              <p>
                La <strong className="text-alanizGold-400">sucesión</strong> de la Casa es algo más
                que un gesto simbólico: es la forma de asegurar que lo construido siga adelante. Hoy
                corresponde al <strong className="text-alanizGold-400">Señor de la Casa Alaniz</strong>{' '}
                y, después, a sus hijas.
              </p>
              <p>
                Más que una cuestión genealógica, es una{' '}
                <em className="text-alanizGold-400">responsabilidad entre generaciones</em>: cuidar la
                memoria, conservar el oficio, mantener viva la tradición y, sobre todo, formar a
                quienes vienen detrás.
              </p>

              <div className="bg-alanizGold-600/10 rounded-lg p-6 border-l-4 border-alanizGold-600 mt-6">
                <p className="text-alanizGold-400 font-medium text-center italic">
                  "No heredamos la tierra de nuestros padres; la tomamos prestada de nuestros hijos."
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
                "Mientras se cuide la memoria, la Casa sigue en pie."
              </blockquote>
              <cite className="text-parchment-400 text-sm">— Casa Alaniz</cite>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
