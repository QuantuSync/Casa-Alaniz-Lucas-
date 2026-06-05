import React, { useEffect } from 'react';
import {
  BarChart3,
  Brain,
  ChevronUp,
  Construction,
  Dumbbell,
  Flame,
  Footprints,
  Handshake,
  HardHat,
  Heart,
  Hospital,
  Map,
  Maximize,
  Medal,
  Mountain,
  RadioTower,
  RefreshCw,
  Scale,
  Shield,
  Siren,
  Star,
  Swords,
  Target,
  Timer,
  Tornado,
  Truck,
  Waves,
  Wrench,
  Zap,
} from 'lucide-react';
import fasorLogo from '../assets/fasor.jpg';
import equipoImg from '../assets/Equipo.jpg';
import buceadoresLogo from '../assets/buceadores-logo.jpg';
import dronesLogo from '../assets/drones-logo.jpg';
import forestalLogo from '../assets/forestal-logo.jpg';
import terrestresLogo from '../assets/terrestres-logo.jpg';
import sanitarioLogo from '../assets/sanitario-logo.jpg';

// Distintivos de rango (en oro): estrellas de 5 puntas para mando, galones para tropa.
const RankStars = ({ count }: { count: number }) => (
  <span className="inline-flex items-center gap-1 text-alanizGold-600" aria-hidden="true">
    {Array.from({ length: count }, (_, i) => (
      <Star key={i} className="h-5 w-5 fill-current" />
    ))}
  </span>
);

const RankChevrons = ({ count }: { count: number }) => (
  <span
    className="inline-flex flex-col items-center -space-y-1.5 text-alanizGold-600"
    aria-hidden="true"
  >
    {Array.from({ length: count }, (_, i) => (
      <ChevronUp key={i} className="h-5 w-5" strokeWidth={3} />
    ))}
  </span>
);

export default function Fasor() {
  useEffect(() => {
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

  const units = [
    {
      id: 'buceadores',
      name: 'Buceadores de Rescate',
      logo: buceadoresLogo,
      description:
        'Especialistas en rescate acuático, operaciones subacuáticas y salvamento en entornos fluviales, lacustres y costeros.',
    },
    {
      id: 'drones',
      name: 'Intervención Aérea',
      logo: dronesLogo,
      description:
        'Operaciones con drones para reconocimiento aéreo, búsqueda de personas, evaluación de daños y coordinación táctica desde el aire.',
    },
    {
      id: 'forestal',
      name: 'Intervención Forestal',
      logo: forestalLogo,
      description:
        'Combate y prevención de incendios forestales, rescate en montaña y operaciones en entornos naturales hostiles.',
    },
    {
      id: 'terrestres',
      name: 'Operaciones Terrestres',
      logo: terrestresLogo,
      description:
        'Rescate urbano, apertura de rutas de acceso, búsqueda de personas desaparecidas y operaciones en terreno difícil.',
    },
    {
      id: 'sanitario',
      name: 'Sanitario',
      logo: sanitarioLogo,
      description:
        'Asistencia médica de emergencia, estabilización de heridos, evacuaciones sanitarias y apoyo médico en catástrofes.',
    },
  ];

  return (
    <div className="min-h-screen py-16 md:py-24">
      <div className="content-container">
        <div className="stack-centered mb-16 observe-me opacity-0 translate-y-8">
          <div className="inline-flex items-center justify-center w-60 h-60 border-4 border-alanizGold-600/40 bg-transparent rounded-full mb-8 overflow-hidden">
            <img
              src={fasorLogo}
              alt="Logo FASOR - Fuerza de Auxilio, Soporte y Rescate"
              className="w-full h-full object-cover"
              loading="eager"
            />
          </div>

          <h1
            className="text-5xl md:text-7xl font-bold text-alanizGold-600 mb-4 tracking-wider drop-shadow-lg"
            style={{ fontFamily: 'Impact, "Arial Black", sans-serif' }}
          >
            FASOR
          </h1>

          <h2 className="text-2xl md:text-3xl font-display font-semibold text-alanizGold-600 mb-6">
            Fuerza de Auxilio, Soporte y Rescate
          </h2>

          <div className="rule-gold mx-auto my-6" aria-hidden="true"></div>

          <div className="text-lg text-parchment-300 max-w-4xl mx-auto leading-relaxed mb-6 space-y-4">
            <p>
              La Fuerza de Auxilio, Soporte y Rescate (FASOR) es una{' '}
              <strong className="text-alanizGold-500">ONG</strong> que nace bajo el amparo de la{' '}
              <strong className="text-alanizGold-500">Casa Alaniz</strong> como reflejo de un deber
              ancestral: servir y proteger en los momentos en que la comunidad más lo necesita. No
              es una idea abstracta, es una respuesta concreta a la realidad que vivimos hoy.
            </p>
            <p>
              Incendios que devoran bosques enteros, inundaciones que arrasan hogares, terremotos y
              tormentas que ponen a prueba nuestra resistencia como sociedad. Ante un mundo cada vez
              más vulnerable a la fuerza de la naturaleza, surge la necesidad de contar con una
              organización civil preparada, disciplinada y entregada.
            </p>
            <p>
              FASOR representa esa voluntad: estar listos, con la mente clara y el corazón firme,
              para llevar auxilio donde la esperanza parece desvanecerse. Capaz de actuar con
              decisión en medio del caos.
            </p>
            <p>
              Más que una fuerza organizada, FASOR es un compromiso vivo con la comunidad, un
              recordatorio de que el verdadero poder de un linaje se mide en su capacidad para
              proteger a los suyos y tender la mano cuando la adversidad golpea.
            </p>
          </div>

          <div className="inline-flex items-center px-6 py-3 border border-alanizGold-600/40 bg-alanizGreen-900/60 text-alanizGold-500 rounded-full font-bold text-lg shadow-lg">
            <span className="w-3 h-3 bg-alanizGold-500 rounded-full mr-3 animate-ping"></span>
            OPERATIVO - EN SERVICIO
          </div>
        </div>

        <div className="max-w-5xl mx-auto space-y-12">
          <div
            className="card-elegant bg-gradient-to-r from-alanizGreen-800/80 to-alanizGreen-900/80 border-2 border-alanizGold-600/40 observe-me opacity-0 translate-y-8"
            style={{ animationDelay: '200ms' }}
          >
            <div className="stack-centered mb-8">
              <h3 className="text-3xl font-display font-bold text-alanizGold-600 mb-6">
                Misión Principal
              </h3>
              <p className="text-xl text-parchment-100 leading-relaxed text-center">
                <strong className="text-alanizGold-400">
                  Estar presentes allí donde la adversidad golpea
                </strong>
                , ya sea en incendios, inundaciones, catástrofes naturales o emergencias que
                requieran manos firmes y corazones preparados.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
              <div className="flex flex-col items-center">
                <div className="inline-flex items-center justify-center w-16 h-16 border-2 border-alanizGold-600 bg-transparent rounded-full mb-4">
                  <Scale className="w-6 h-6 text-alanizGold-600" aria-hidden="true" />
                </div>
                <h4 className="font-display font-semibold text-alanizGold-400 mb-2">Disciplina</h4>
                <p className="text-sm text-parchment-300 text-center">
                  Orden y método en cada actuación
                </p>
              </div>

              <div className="flex flex-col items-center">
                <div className="inline-flex items-center justify-center w-16 h-16 border-2 border-alanizGold-600 bg-transparent rounded-full mb-4">
                  <Handshake className="w-6 h-6 text-alanizGold-600" aria-hidden="true" />
                </div>
                <h4 className="font-display font-semibold text-alanizGold-400 mb-2">
                  Coordinación
                </h4>
                <p className="text-sm text-parchment-300 text-center">Trabajo en equipo efectivo</p>
              </div>

              <div className="flex flex-col items-center">
                <div className="inline-flex items-center justify-center w-16 h-16 border-2 border-alanizGold-600 bg-transparent rounded-full mb-4">
                  <Zap className="w-6 h-6 text-alanizGold-600" aria-hidden="true" />
                </div>
                <h4 className="font-display font-semibold text-alanizGold-400 mb-2">Sacrificio</h4>
                <p className="text-sm text-parchment-300 text-center">Entrega total al servicio</p>
              </div>

              <div className="flex flex-col items-center">
                <div className="inline-flex items-center justify-center w-16 h-16 border-2 border-alanizGold-600 bg-transparent rounded-full mb-4">
                  <Shield className="w-6 h-6 text-alanizGold-600" aria-hidden="true" />
                </div>
                <h4 className="font-display font-semibold text-alanizGold-400 mb-2">Fidelidad</h4>
                <p className="text-sm text-parchment-300 text-center">
                  Lealtad inquebrantable al pueblo
                </p>
              </div>
            </div>
          </div>

          <div
            className="card-elegant bg-gradient-to-r from-alanizGreen-800/80 to-alanizGreen-900/80 border-2 border-alanizGold-600/40 observe-me opacity-0 translate-y-8"
            style={{ animationDelay: '300ms' }}
          >
            <div className="text-center mb-8">
              <h3 className="text-3xl font-display font-bold text-alanizGold-600 mb-6">
                Unidades Especializadas
              </h3>
              <p className="text-lg text-parchment-100 leading-relaxed">
                FASOR se organiza en{' '}
                <strong className="text-alanizGold-600">cinco unidades especializadas</strong>, cada
                una con capacidades específicas que garantizan una respuesta integral ante cualquier
                emergencia.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {units.map((unit) => (
                <div
                  key={unit.id}
                  className="flex flex-col items-center rounded-xl border border-alanizGold-600/30 bg-alanizGreen-900/40 p-6 text-center transition-all duration-300 hover:border-alanizGold-600/60"
                >
                  <div className="mb-4 inline-flex h-28 w-28 items-center justify-center overflow-hidden rounded-full border-2 border-alanizGold-600/40 bg-alanizGreen-900 shadow-lg">
                    <img
                      src={unit.logo}
                      alt={`Logo ${unit.name} - FASOR`}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <h4 className="mb-2 font-display text-lg font-semibold text-alanizGold-500">
                    {unit.name}
                  </h4>
                  <p className="text-sm leading-relaxed text-parchment-300">{unit.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="observe-me opacity-0 translate-y-8" style={{ animationDelay: '400ms' }}>
            <h3 className="text-3xl font-display font-bold text-alanizGold-600 text-center mb-8">
              Áreas de Actuación
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="card-elegant">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 border-2 border-alanizGold-600 bg-transparent rounded-full flex-shrink-0">
                    <Flame className="w-5 h-5 text-alanizGold-600" aria-hidden="true" />
                  </div>
                  <h4 className="font-display font-semibold text-alanizGold-500">Incendios</h4>
                </div>
                <p className="text-sm text-parchment-300">
                  Forestales y urbanos. Extinción, evacuación y protección de infraestructuras.
                </p>
              </div>

              <div className="card-elegant">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 border-2 border-alanizGold-600 bg-transparent rounded-full flex-shrink-0">
                    <Waves className="w-5 h-5 text-alanizGold-600" aria-hidden="true" />
                  </div>
                  <h4 className="font-display font-semibold text-alanizGold-500">Inundaciones</h4>
                </div>
                <p className="text-sm text-parchment-300">
                  Rescate acuático, evacuaciones y control de daños por desbordamientos.
                </p>
              </div>

              <div className="card-elegant">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 border-2 border-alanizGold-600 bg-transparent rounded-full flex-shrink-0">
                    <Mountain className="w-5 h-5 text-alanizGold-600" aria-hidden="true" />
                  </div>
                  <h4 className="font-display font-semibold text-alanizGold-500">
                    Catástrofes Naturales
                  </h4>
                </div>
                <p className="text-sm text-parchment-300">
                  Terremotos, tormentas severas y eventos meteorológicos extremos.
                </p>
              </div>

              <div className="card-elegant">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 border-2 border-alanizGold-600 bg-transparent rounded-full flex-shrink-0">
                    <Siren className="w-5 h-5 text-alanizGold-600" aria-hidden="true" />
                  </div>
                  <h4 className="font-display font-semibold text-alanizGold-500">
                    Emergencias Civiles
                  </h4>
                </div>
                <p className="text-sm text-parchment-300">
                  Accidentes, colapsos estructurales y situaciones de crisis urbana.
                </p>
              </div>

              <div className="card-elegant">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 border-2 border-alanizGold-600 bg-transparent rounded-full flex-shrink-0">
                    <Hospital className="w-5 h-5 text-alanizGold-600" aria-hidden="true" />
                  </div>
                  <h4 className="font-display font-semibold text-alanizGold-500">
                    Apoyo Sanitario
                  </h4>
                </div>
                <p className="text-sm text-parchment-300">
                  Asistencia médica de emergencia y evacuaciones sanitarias.
                </p>
              </div>

              <div className="card-elegant">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 border-2 border-alanizGold-600 bg-transparent rounded-full flex-shrink-0">
                    <BarChart3 className="w-5 h-5 text-alanizGold-600" aria-hidden="true" />
                  </div>
                  <h4 className="font-display font-semibold text-alanizGold-500">
                    Evaluación de Riesgos
                  </h4>
                </div>
                <p className="text-sm text-parchment-300">
                  Análisis previo de situaciones y planificación de respuesta.
                </p>
              </div>
            </div>
          </div>

          <div
            className="card-elegant observe-me opacity-0 translate-y-8"
            style={{ animationDelay: '600ms' }}
          >
            <div className="flex items-start space-x-6 mb-6">
              <div className="flex-shrink-0">
                <div className="inline-flex items-center justify-center w-14 h-14 border-2 border-alanizGold-600 bg-transparent rounded-full">
                  <Swords className="w-5 h-5 text-alanizGold-600" aria-hidden="true" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-display font-semibold text-alanizGold-600 mb-4">
                  Estructura Organizativa
                </h3>
                <p className="text-parchment-200 leading-relaxed">
                  La Fuerza de Auxilio, Soporte y Rescate Casa Alaniz se organiza bajo principios de
                  disciplina, responsabilidad y servicio. Cada nivel jerárquico tiene una función
                  clara, garantizando que la misión se cumpla con eficacia en cualquier
                  circunstancia.
                </p>
              </div>
            </div>

            <div className="space-y-6 mt-8">
              <h4 className="text-xl font-display font-semibold text-alanizGold-500 mb-6 flex items-center">
                <Swords className="w-5 h-5 mr-2 text-alanizGold-600" aria-hidden="true" />
                Escalafón Oficial de FASOR
              </h4>

              <div className="space-y-4">
                <div className="bg-alanizGreen-900/50 rounded-lg p-5 border border-alanizGold-600/30">
                  <div className="flex items-start space-x-4 mb-3">
                    <div className="flex-shrink-0 pt-1">
                      <RankStars count={3} />
                    </div>
                    <div className="flex-1">
                      <h5 className="font-display font-bold text-alanizGold-500 text-lg mb-1">
                        1. Comandante
                      </h5>
                    </div>
                  </div>
                  <p className="text-sm text-parchment-300 leading-relaxed">
                    Máxima autoridad operativa y doctrinal. Dirige la estrategia general, aprueba
                    despliegues y representa a FASOR ante organismos oficiales.
                  </p>
                </div>

                <div className="bg-alanizGreen-900/50 rounded-lg p-5 border border-alanizGold-600/30">
                  <div className="flex items-start space-x-4 mb-3">
                    <div className="flex-shrink-0 pt-1">
                      <RankStars count={2} />
                    </div>
                    <div className="flex-1">
                      <h5 className="font-display font-bold text-alanizGold-500 text-lg mb-1">
                        2. Capitán de Unidad
                      </h5>
                    </div>
                  </div>
                  <p className="text-sm text-parchment-300 leading-relaxed">
                    Mando superior sobre una Unidad Operativa (por territorio o especialidad).
                    Coordina múltiples equipos, autoriza intervenciones y lidera misiones complejas.
                  </p>
                </div>

                <div className="bg-alanizGreen-900/50 rounded-lg p-5 border border-alanizGold-600/30">
                  <div className="flex items-start space-x-4 mb-3">
                    <div className="flex-shrink-0 pt-1">
                      <RankStars count={1} />
                    </div>
                    <div className="flex-1">
                      <h5 className="font-display font-bold text-alanizGold-500 text-lg mb-1">
                        3. Teniente de Cuadrilla
                      </h5>
                    </div>
                  </div>
                  <p className="text-sm text-parchment-300 leading-relaxed">
                    Mando directo sobre una cuadrilla de intervención. Ejecuta órdenes del Capitán,
                    lidera en el terreno y asegura disciplina y eficacia en situaciones reales.
                  </p>
                </div>

                <div className="bg-alanizGreen-900/50 rounded-lg p-5 border border-alanizGold-600/30">
                  <div className="flex items-start space-x-4 mb-3">
                    <div className="flex-shrink-0 pt-1">
                      <RankChevrons count={2} />
                    </div>
                    <div className="flex-1">
                      <h5 className="font-display font-bold text-alanizGold-500 text-lg mb-1">
                        4. Operador Táctico
                      </h5>
                    </div>
                  </div>
                  <p className="text-sm text-parchment-300 leading-relaxed">
                    Miembro con formación completa y certificación operativa. Actúa con autonomía
                    bajo mando superior. Es la fuerza viva de FASOR.
                  </p>
                </div>

                <div className="bg-alanizGreen-900/50 rounded-lg p-5 border border-alanizGold-600/30">
                  <div className="flex items-start space-x-4 mb-3">
                    <div className="flex-shrink-0 pt-1">
                      <RankChevrons count={1} />
                    </div>
                    <div className="flex-1">
                      <h5 className="font-display font-bold text-alanizGold-500 text-lg mb-1">
                        5. Cadete en Formación
                      </h5>
                    </div>
                  </div>
                  <p className="text-sm text-parchment-300 leading-relaxed">
                    Integrante en fase de instrucción. Participa en tareas de apoyo, prácticas y
                    misiones no críticas. Asimila doctrina, técnica y espíritu de la organización.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div
            className="card-elegant observe-me opacity-0 translate-y-8"
            style={{ animationDelay: '800ms' }}
          >
            <h3 className="text-2xl font-display font-semibold text-alanizGold-600 mb-6">
              Especialidades
            </h3>
            <p className="text-parchment-200 leading-relaxed mb-6">
              Cada miembro puede formarse en una o varias áreas de especialización, lo que permite
              desplegar equipos versátiles y autosuficientes:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="bg-alanizGreen-900/50 rounded-lg p-4 border border-alanizGold-600/30">
                  <h5 className="font-display font-semibold text-alanizGold-500 mb-2 flex items-center">
                    <Construction className="w-5 h-5 mr-2 text-alanizGold-600" aria-hidden="true" />
                    Ingeniería y Fortificaciones de Emergencia
                  </h5>
                  <p className="text-sm text-parchment-300">
                    Construcción de pasos temporales, apuntalamientos y estructuras seguras.
                  </p>
                </div>

                <div className="bg-alanizGreen-900/50 rounded-lg p-4 border border-alanizGold-600/30">
                  <h5 className="font-display font-semibold text-alanizGold-500 mb-2 flex items-center">
                    <Truck className="w-5 h-5 mr-2 text-alanizGold-600" aria-hidden="true" />
                    Rescate y Movilidad Terrestre
                  </h5>
                  <p className="text-sm text-parchment-300">
                    Apertura de rutas, búsqueda de desaparecidos y extracción en terrenos
                    complicados.
                  </p>
                </div>

                <div className="bg-alanizGreen-900/50 rounded-lg p-4 border border-alanizGold-600/30">
                  <h5 className="font-display font-semibold text-alanizGold-500 mb-2 flex items-center">
                    <Tornado className="w-5 h-5 mr-2 text-alanizGold-600" aria-hidden="true" />
                    Gestión de Catástrofes Naturales
                  </h5>
                  <p className="text-sm text-parchment-300">
                    Refuerzo en incendios, control de inundaciones y protección de infraestructuras
                    críticas.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-alanizGreen-900/50 rounded-lg p-4 border border-alanizGold-600/30">
                  <h5 className="font-display font-semibold text-alanizGold-500 mb-2 flex items-center">
                    <HardHat className="w-5 h-5 mr-2 text-alanizGold-600" aria-hidden="true" />
                    Asistencia Sanitaria de Emergencia
                  </h5>
                  <p className="text-sm text-parchment-300">
                    Primeros auxilios, estabilización de heridos y evacuaciones sanitarias.
                  </p>
                </div>

                <div className="bg-alanizGreen-900/50 rounded-lg p-4 border border-alanizGold-600/30">
                  <h5 className="font-display font-semibold text-alanizGold-500 mb-2 flex items-center">
                    <RadioTower className="w-5 h-5 mr-2 text-alanizGold-600" aria-hidden="true" />
                    Logística y Comunicaciones
                  </h5>
                  <p className="text-sm text-parchment-300">
                    Transporte de materiales, coordinación tecnológica y apoyo prolongado en
                    operaciones.
                  </p>
                </div>

                <div className="bg-alanizGreen-900/50 rounded-lg p-4 border border-alanizGold-600/30">
                  <h5 className="font-display font-semibold text-alanizGold-500 mb-2 flex items-center">
                    <Handshake className="w-5 h-5 mr-2 text-alanizGold-600" aria-hidden="true" />
                    Coordinación Interinstitucional
                  </h5>
                  <p className="text-sm text-parchment-300">
                    Enlace con bomberos, protección civil y otras fuerzas de emergencia.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div
            className="card-elegant observe-me opacity-0 translate-y-8"
            style={{ animationDelay: '1000ms' }}
          >
            <h3 className="text-2xl font-display font-semibold text-alanizGold-600 mb-6">
              Entrenamiento y Preparación
            </h3>
            <p className="text-parchment-200 leading-relaxed mb-6">
              La preparación de los miembros se centra en la constancia y la excelencia. El
              entrenamiento combina resistencia física, fortaleza moral y pericia técnica.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-alanizGreen-900/50 rounded-lg p-6 border border-alanizGold-600/30">
                <div className="text-center mb-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 border-2 border-alanizGold-600 bg-transparent rounded-full mb-3 mx-auto">
                    <Dumbbell className="w-5 h-5 text-alanizGold-600" aria-hidden="true" />
                  </div>
                  <h4 className="font-display font-semibold text-alanizGold-500">
                    Condición Física
                  </h4>
                </div>
                <p className="text-sm text-parchment-300 text-center">
                  Capacidad para operar en escenarios de esfuerzo prolongado y condiciones adversas.
                </p>
              </div>

              <div className="bg-alanizGreen-900/50 rounded-lg p-6 border border-alanizGold-600/30">
                <div className="text-center mb-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 border-2 border-alanizGold-600 bg-transparent rounded-full mb-3 mx-auto">
                    <Wrench className="w-5 h-5 text-alanizGold-600" aria-hidden="true" />
                  </div>
                  <h4 className="font-display font-semibold text-alanizGold-500">
                    Formación Técnica
                  </h4>
                </div>
                <p className="text-sm text-parchment-300 text-center">
                  Instrucción en rescate, fortificación, logística, cartografía y primeros auxilios.
                </p>
              </div>

              <div className="bg-alanizGreen-900/50 rounded-lg p-6 border border-alanizGold-600/30">
                <div className="text-center mb-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 border-2 border-alanizGold-600 bg-transparent rounded-full mb-3 mx-auto">
                    <Brain className="w-5 h-5 text-alanizGold-600" aria-hidden="true" />
                  </div>
                  <h4 className="font-display font-semibold text-alanizGold-500">
                    Fortaleza Mental
                  </h4>
                </div>
                <p className="text-sm text-parchment-300 text-center">
                  Gestión del estrés, toma de decisiones bajo presión y resiliencia psicológica.
                </p>
              </div>
            </div>

            <div className="mt-8 space-y-4">
              <h4 className="text-lg font-display font-semibold text-alanizGold-500">
                Programa de Entrenamiento
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start space-x-3">
                  <Footprints
                    className="w-5 h-5 text-alanizGold-400 mt-1 flex-shrink-0"
                    aria-hidden="true"
                  />
                  <div>
                    <h5 className="font-semibold text-alanizGold-500 text-sm">
                      Simulacros Coordinados
                    </h5>
                    <p className="text-xs text-parchment-300">
                      Ejercicios periódicos que integran todas las especialidades
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Medal
                    className="w-5 h-5 text-alanizGold-400 mt-1 flex-shrink-0"
                    aria-hidden="true"
                  />
                  <div>
                    <h5 className="font-semibold text-alanizGold-500 text-sm">
                      Certificaciones Oficiales
                    </h5>
                    <p className="text-xs text-parchment-300">
                      Reconocimiento externo de competencias adquiridas
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <RefreshCw
                    className="w-5 h-5 text-alanizGold-400 mt-1 flex-shrink-0"
                    aria-hidden="true"
                  />
                  <div>
                    <h5 className="font-semibold text-alanizGold-500 text-sm">
                      Intercambio de Conocimientos
                    </h5>
                    <p className="text-xs text-parchment-300">
                      Colaboración con otras fuerzas para aprendizaje continuo
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Timer
                    className="w-5 h-5 text-alanizGold-400 mt-1 flex-shrink-0"
                    aria-hidden="true"
                  />
                  <div>
                    <h5 className="font-semibold text-alanizGold-500 text-sm">
                      Protocolos de Activación
                    </h5>
                    <p className="text-xs text-parchment-300">
                      Tiempos de respuesta optimizados y niveles de alerta
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className="card-elegant border-2 border-alanizGold-600/40 observe-me opacity-0 translate-y-8"
            style={{ animationDelay: '1200ms' }}
          >
            <h3 className="text-2xl font-display font-semibold text-alanizGold-600 mb-6 text-center">
              Protocolo de Activación
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center">
                <div className="inline-flex items-center justify-center w-16 h-16 border-2 border-alanizGold-600 bg-transparent rounded-full mb-4">
                  <span className="text-alanizGold-600 text-xl font-bold">1</span>
                </div>
                <h4 className="font-display font-semibold text-green-400 mb-3">Nivel Verde</h4>
                <div className="text-center">
                  <p className="text-sm text-parchment-300 font-semibold mb-1">Alerta Preventiva</p>
                  <p className="text-sm text-parchment-300 mb-1">Monitoreo y preparación.</p>
                  <p className="text-sm text-parchment-300">Tiempo de activación: 2-4 horas</p>
                </div>
              </div>

              <div className="flex flex-col items-center">
                <div className="inline-flex items-center justify-center w-16 h-16 border-2 border-alanizGold-600 bg-transparent rounded-full mb-4">
                  <span className="text-alanizGold-600 text-xl font-bold">2</span>
                </div>
                <h4 className="font-display font-semibold text-amber-400 mb-3">Nivel Ámbar</h4>
                <div className="text-center">
                  <p className="text-sm text-parchment-300 font-semibold mb-1">
                    Emergencia Moderada
                  </p>
                  <p className="text-sm text-parchment-300 mb-1">Despliegue parcial.</p>
                  <p className="text-sm text-parchment-300">Tiempo de activación: 30-60 min</p>
                </div>
              </div>

              <div className="flex flex-col items-center">
                <div className="inline-flex items-center justify-center w-16 h-16 border-2 border-alanizGold-600 bg-transparent rounded-full mb-4 animate-pulse">
                  <span className="text-alanizGold-600 text-xl font-bold">3</span>
                </div>
                <h4 className="font-display font-semibold text-red-400 mb-3">Nivel Rojo</h4>
                <div className="text-center">
                  <p className="text-sm text-parchment-300 font-semibold mb-1">
                    Emergencia Crítica
                  </p>
                  <p className="text-sm text-parchment-300 mb-1">Movilización total.</p>
                  <p className="text-sm text-parchment-300">Tiempo de activación: 10-15 min</p>
                </div>
              </div>
            </div>
          </div>

          <div
            className="card-elegant observe-me opacity-0 translate-y-8"
            style={{ animationDelay: '1400ms' }}
          >
            <h3 className="text-2xl font-display font-semibold text-alanizGold-600 mb-6">
              Principios Operativos
            </h3>

            <div className="space-y-6">
              <div className="bg-alanizGreen-900/50 rounded-lg p-6 border border-alanizGold-600/30">
                <h4 className="font-display font-semibold text-alanizGold-500 mb-3 flex items-center">
                  <Zap className="w-6 h-6 mr-3 text-alanizGold-600" aria-hidden="true" />
                  Respuesta Rápida y Coordinada
                </h4>
                <p className="text-parchment-200 text-sm leading-relaxed">
                  Cada segundo cuenta en una emergencia. FASOR mantiene equipos en estado de alerta
                  permanente, con protocolos claros que permiten la movilización inmediata y la
                  coordinación efectiva con otros organismos de emergencia.
                </p>
              </div>

              <div className="bg-alanizGreen-900/50 rounded-lg p-6 border border-alanizGold-600/30">
                <h4 className="font-display font-semibold text-alanizGold-500 mb-3 flex items-center">
                  <Handshake className="w-6 h-6 mr-3 text-alanizGold-600" aria-hidden="true" />
                  Colaboración Institucional
                </h4>
                <p className="text-parchment-200 text-sm leading-relaxed">
                  La cooperación con instituciones públicas y privadas es fundamental. FASOR actúa
                  como fuerza de apoyo complementaria, nunca en competencia, fortaleciendo la red de
                  protección civil existente.
                </p>
              </div>

              <div className="bg-alanizGreen-900/50 rounded-lg p-6 border border-alanizGold-600/30">
                <h4 className="font-display font-semibold text-alanizGold-500 mb-3 flex items-center">
                  <Target className="w-6 h-6 mr-3 text-alanizGold-600" aria-hidden="true" />
                  Eficacia y Profesionalidad
                </h4>
                <p className="text-parchment-200 text-sm leading-relaxed">
                  Cada intervención se ejecuta con método y precisión. La preparación continua y el
                  entrenamiento especializado garantizan que cada miembro de FASOR pueda actuar con
                  la máxima eficacia cuando la situación lo requiera.
                </p>
              </div>
            </div>
          </div>

          <div
            className="card-elegant bg-gradient-to-r from-alanizGreen-800/80 to-alanizGreen-900/80 border-2 border-alanizGold-600/40 observe-me opacity-0 translate-y-8"
            style={{ animationDelay: '1600ms' }}
          >
            <div className="flex items-start space-x-6 mb-6">
              <div className="flex-shrink-0">
                <div className="inline-flex items-center justify-center w-14 h-14 border-2 border-alanizGold-600 bg-transparent rounded-full">
                  <Heart className="w-5 h-5 text-alanizGold-600" aria-hidden="true" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-display font-semibold text-alanizGold-500 mb-4">
                  Compromiso con la Comunidad
                </h3>
              </div>
            </div>

            <div className="space-y-4 text-parchment-100 leading-relaxed">
              <p>
                En cada intervención, la Fuerza de Auxilio, Soporte y Rescate busca ser más que un
                grupo de apoyo: aspira a convertirse en un{' '}
                <strong className="text-alanizGold-400">referente de confianza</strong>, capaz de
                inspirar seguridad en quienes nos ven actuar y esperanza en quienes reciben nuestra
                ayuda.
              </p>
              <p>
                La Casa Alaniz entiende que el verdadero poder de un linaje no reside en títulos
                vacíos o recuerdos estáticos,{' '}
                <strong className="text-alanizGold-400">
                  reside en la capacidad de responder con eficacia cuando más se le necesita
                </strong>
                . Por ello, FASOR es, al mismo tiempo, un deber histórico y una promesa de futuro.
              </p>

              <div className="bg-alanizGold-600/10 rounded-lg p-6 border-l-4 border-alanizGold-600 mt-6">
                <p className="text-alanizGold-400 font-medium text-center italic text-lg">
                  "La Fuerza Casa Alaniz actúa con seriedad, método y determinación. Su estructura
                  no busca imitar un ejército, sino transmitir la misma solidez y confianza que
                  requiere toda organización destinada a proteger y servir en momentos de crisis."
                </p>
              </div>

              <div className="text-center mt-8">
                <div className="inline-flex items-center px-8 py-4 bg-alanizGold-600 text-alanizGreen-950 rounded-full font-bold text-lg shadow-lg">
                  <Flame className="w-5 h-5 mr-3" aria-hidden="true" />
                  DISCIPLINA • VALOR • SERVICIO
                </div>
              </div>

              <div className="mt-8">
                <div className="w-full max-w-2xl mx-auto">
                  <img
                    src={equipoImg}
                    alt="Equipo FASOR - Fuerza de Auxilio, Soporte y Rescate Casa Alaniz"
                    className="w-full h-auto rounded-xl shadow-2xl border-2 border-alanizGold-600/30"
                    loading="lazy"
                  />
                  <p className="text-center text-parchment-400 text-sm mt-3 italic">
                    FASOR: Honor, disciplina y servicio bajo la bandera de Casa Alaniz
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Abeiro - mapa incrustado (demostrador) */}
          <div
            className="card-elegant observe-me opacity-0 translate-y-8"
            style={{ animationDelay: '1700ms' }}
          >
            <div className="mb-6 flex items-start space-x-6">
              <div className="flex-shrink-0">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-full border-2 border-alanizGold-600 bg-transparent">
                  <Map className="h-5 w-5 text-alanizGold-600" aria-hidden="true" />
                </div>
              </div>
              <div className="flex-1">
                <p className="eyebrow mb-1 text-alanizGold-600/70">Proyecto · Demostrador</p>
                <h3 className="font-display text-2xl font-semibold text-alanizGold-500">
                  Abeiro — mapa de apoyo
                </h3>
              </div>
            </div>

            <div className="space-y-4 leading-relaxed text-parchment-200">
              <p>
                <strong className="text-alanizGold-400">Abeiro</strong> es un proyecto propio en
                desarrollo: un <em>demostrador</em> de mapa para visualizar y coordinar puntos de
                interés en labores de auxilio. No es un servicio operativo ni un sistema de
                emergencias real &mdash; se muestra aquí como ejemplo del trabajo técnico de la
                Casa.
              </p>
            </div>

            {/* Escritorio: mapa embebido usable */}
            <div className="mt-6 hidden md:block">
              <div className="overflow-hidden rounded-xl border border-alanizGold-600/30 bg-alanizGreen-900/40">
                <iframe
                  src="https://abeiro.vercel.app"
                  title="Abeiro — mapa (demostrador)"
                  loading="lazy"
                  className="h-[600px] w-full"
                ></iframe>
              </div>
              <p className="mt-3 text-center text-sm italic text-parchment-400">
                Demostrador embebido de Abeiro (abeiro.vercel.app)
              </p>
            </div>

            {/* Móvil: vista previa + botón a pantalla completa (evita el conflicto zoom/scroll) */}
            <div className="mt-6 md:hidden">
              <div className="flex flex-col items-center rounded-xl border border-alanizGold-600/30 bg-alanizGreen-900/40 p-8 text-center">
                <Map className="mb-3 h-10 w-10 text-alanizGold-600" aria-hidden="true" />
                <p className="mb-4 text-sm text-parchment-300">
                  Para una mejor experiencia en el móvil, abre el mapa a pantalla completa.
                </p>
                <a
                  href="https://abeiro.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-alaniz"
                >
                  <Maximize className="mr-2 h-5 w-5" aria-hidden="true" />
                  Abrir mapa a pantalla completa
                </a>
              </div>
            </div>
          </div>

          <div
            className="text-center mt-16 observe-me opacity-0 translate-y-8"
            style={{ animationDelay: '1800ms' }}
          >
            <div className="bg-alanizGreen-800/50 rounded-xl p-8 border border-alanizGold-600/20 backdrop-blur-sm shadow-elegant">
              <blockquote className="text-xl md:text-2xl font-display italic text-alanizGold-600 mb-4">
                "Donde la memoria arde, también nace la fuerza de proteger."
              </blockquote>
              <cite className="text-parchment-400 text-sm">
                — Lema de la Fuerza de Auxilio, Soporte y Rescate Casa Alaniz
              </cite>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
