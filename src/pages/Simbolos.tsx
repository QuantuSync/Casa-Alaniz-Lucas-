import React, { useEffect, useState } from 'react';
import {
  Eye,
  Shield,
  Flag,
  Gem,
  PawPrint,
  Flame,
  Star,
  Leaf,
  Diamond,
  Award,
  User,
  Zap,
  type LucideIcon,
} from 'lucide-react';
import escudo from '../assets/Escudo.jpg';
import bandera from '../assets/Bandera.jpg';
import anillo from '../assets/Anillo.png';

// Componente de tarjeta de símbolo mejorado
const Card = ({
  src,
  title,
  children,
  icon,
  delay = 0,
}: {
  src: string;
  title: string;
  children: React.ReactNode;
  icon: LucideIcon;
  delay?: number;
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <figure
      className="card-elegant hover:scale-105 transition-all duration-500 group observe-me opacity-0 translate-y-8"
      style={{ animationDelay: `${delay}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Contenedor de imagen con efectos */}
      <div className="relative overflow-hidden rounded-lg mb-6">
        <div
          className={`transition-all duration-700 ${
            imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
          }`}
        >
          <img
            src={src}
            alt={title}
            className="w-full h-56 object-contain bg-alanizGreen-900 image-glow border border-alanizGold-600/30
                       group-hover:border-alanizGold-600/50 transition-all duration-300 p-2"
            onLoad={() => setImageLoaded(true)}
          />
        </div>

        {/* Overlay con información adicional */}
        <div
          className={`absolute inset-0 bg-gradient-to-t from-alanizGreen-950/80 via-transparent to-transparent
                         transition-opacity duration-300 ${
                           isHovered ? 'opacity-100' : 'opacity-0'
                         }`}
        >
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex items-center space-x-2 text-alanizGold-600">
              <Eye className="w-4 h-4 text-alanizGold-600" aria-hidden="true" />
              <span className="text-sm font-medium">Ver detalles</span>
            </div>
          </div>
        </div>

        {/* Efecto de brillo */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-alanizGold-600/10 to-transparent 
                        -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"
        ></div>

        {/* Loading placeholder */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-alanizGreen-900 animate-pulse flex items-center justify-center rounded-lg">
            <div className="w-12 h-12 border-2 border-alanizGold-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
      </div>

      <figcaption className="space-y-6">
        {/* Encabezado con icono */}
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0">
            <div
              className="inline-flex items-center justify-center w-10 h-10
                            border-2 border-alanizGold-600 bg-transparent rounded-full group-hover:scale-110
                            transition-transform duration-300"
            >
              {React.createElement(icon, {
                className: 'w-5 h-5 text-alanizGold-600',
                'aria-hidden': 'true',
              })}
            </div>
          </div>
          <h3
            className="text-xl md:text-2xl font-display font-bold text-alanizGold-600 
                         group-hover:text-alanizGold-500 transition-colors duration-300"
          >
            {title}
          </h3>
        </div>

        {/* Contenido */}
        <div className="space-y-4">{children}</div>

        {/* Indicador de autenticidad */}
        <div
          className="flex items-center justify-center space-x-2 text-xs text-alanizGold-600/70 
                        font-medium uppercase tracking-wider"
        >
          <div className="w-2 h-2 bg-alanizGold-600 rounded-full"></div>
          <span>Símbolo Oficial</span>
          <div className="w-2 h-2 bg-alanizGold-600 rounded-full"></div>
        </div>
      </figcaption>
    </figure>
  );
};

export default function Simbolos() {
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
        <div className="text-center mb-16 observe-me opacity-0 translate-y-8">
          <div
            className="inline-flex items-center justify-center w-16 h-16 border-2 border-alanizGold-600
                          bg-transparent rounded-full mb-6"
          >
            <Shield className="w-8 h-8 text-alanizGold-600" aria-hidden="true" />
          </div>

          <h1 className="text-4xl md:text-5xl font-display font-bold text-alanizGold-600 mb-6">
            Símbolos Heráldicos
          </h1>

          <div className="rule-gold mx-auto my-6" aria-hidden="true"></div>

          <p className="text-lg text-parchment-300 max-w-3xl mx-auto leading-relaxed">
            Los emblemas sagrados que identifican y representan la noble Casa Alaniz, cada uno con
            un significado profundo forjado a través de los siglos y formalmente reconstituidos en
            el año 2025.
          </p>
        </div>

        {/* Grid de símbolos */}
        <div className="grid gap-12 lg:grid-cols-1 xl:grid-cols-1 mb-16">
          {/* Escudo */}
          <Card src={escudo} title="Escudo de Armas" icon={Shield} delay={200}>
            <div className="bg-alanizGreen-900/30 rounded-lg p-6 border-l-4 border-alanizGold-600/50 space-y-4">
              <p className="text-parchment-200 leading-relaxed">
                El escudo de la Casa Alaniz constituye la representación heráldica más completa de
                nuestra identidad señorial. Cada elemento ha sido cuidadosamente diseñado para
                reflejar los valores fundamentales del linaje.
              </p>

              <div className="grid md:grid-cols-2 gap-6 mt-6">
                <div className="space-y-4">
                  <div className="bg-alanizGold-600/10 rounded-lg p-4">
                    <h5 className="font-display font-semibold text-alanizGold-500 mb-2 flex items-center">
                      <PawPrint className="w-5 h-5 mr-2 text-alanizGold-600" aria-hidden="true" />{' '}
                      El Lobo Guardián
                    </h5>
                    <p className="text-sm text-parchment-300">
                      Figura central que simboliza la <em>inteligencia antes que la fuerza</em>.
                      Representa la vigilancia perpetua, la valentía sin temeridad y la fidelidad
                      inquebrantable al honor familiar. El lobo no es salvaje, es noble.
                    </p>
                  </div>

                  <div className="bg-alanizGold-600/10 rounded-lg p-4">
                    <h5 className="font-display font-semibold text-alanizGold-500 mb-2 flex items-center">
                      <Flame className="w-5 h-5 mr-2 text-alanizGold-600" aria-hidden="true" /> El
                      Orbe de Ámbar
                    </h5>
                    <p className="text-sm text-parchment-300">
                      Situada en el corazón del escudo, esta esfera dorada representa la llama
                      interior que nunca se extingue. Simboliza la pasión por preservar la memoria y
                      el fuego sagrado del lema <em>"Memoria Ardet"</em>.
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-alanizGold-600/10 rounded-lg p-4">
                    <h5 className="font-display font-semibold text-alanizGold-500 mb-2 flex items-center">
                      <Star className="w-5 h-5 mr-2 text-alanizGold-600" aria-hidden="true" /> Las
                      Tres Estrellas
                    </h5>
                    <p className="text-sm text-parchment-300">
                      Representan las luminarias del linaje vivo: <strong>Abril</strong> la heredera
                      del señorío, <strong>Diana</strong> la valiente, y <strong>Martina</strong> la
                      protectora. Cada estrella simboliza la continuidad y la esperanza del futuro
                      de la Casa.
                    </p>
                  </div>

                  <div className="bg-alanizGold-600/10 rounded-lg p-4">
                    <h5 className="font-display font-semibold text-alanizGold-500 mb-2 flex items-center">
                      <Leaf className="w-5 h-5 mr-2 text-alanizGold-600" aria-hidden="true" /> Las
                      Raíces Profundas
                    </h5>
                    <p className="text-sm text-parchment-300">
                      En la base del escudo, simbolizan la profundidad de la memoria ancestral y la
                      conexión inquebrantable con nuestros orígenes. Representan la estabilidad y la
                      permanencia del linaje a través de los siglos.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-alanizGreen-900/50 rounded-lg p-4 border border-alanizGold-600/30 mt-6">
                <h6 className="font-display font-semibold text-alanizGold-500 mb-2">
                  Colores Heráldicos
                </h6>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-alanizGreen-600 rounded-full border border-alanizGold-600"></div>
                    <span className="text-parchment-300">
                      <strong>Verde Alaniz:</strong> Esperanza, honor, lealtad
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-alanizGold-600 rounded-full border border-alanizGreen-600"></div>
                    <span className="text-parchment-300">
                      <strong>Oro Señorial:</strong> Excelencia, sabiduría, nobleza
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Bandera */}
          <Card src={bandera} title="Bandera Señorial" icon={Flag} delay={400}>
            <div className="bg-alanizGreen-900/30 rounded-lg p-6 border-l-4 border-alanizGold-600/50 space-y-4">
              <p className="text-parchment-200 leading-relaxed">
                La bandera de la Casa Alaniz ondea como símbolo de nuestra presencia territorial y
                autoridad señorial. Su diseño refleja la simplicidad noble y la elegancia que
                caracterizan nuestro linaje.
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h5 className="font-display font-semibold text-alanizGold-500">
                    Diseño y Proporciones
                  </h5>
                  <p className="text-sm text-parchment-300">
                    Fondo verde Alaniz con las tres estrellas doradas dispuestas en triángulo,
                    respetando las proporciones heráldicas tradicionales. El verde domina el campo,
                    mientras que el oro de las estrellas aporta la dignidad señorial.
                  </p>
                </div>

                <div className="space-y-3">
                  <h5 className="font-display font-semibold text-alanizGold-500">
                    Simbolismo de Colores
                  </h5>
                  <p className="text-sm text-parchment-300">
                    El <strong className="text-alanizGold-400">verde</strong> representa la
                    esperanza eterna y la conexión con la tierra ancestral del Valle de Monterrey.
                    El <strong className="text-alanizGold-400">oro</strong> simboliza la excelencia
                    y la nobleza de nuestros principios.
                  </p>
                </div>
              </div>

              <div className="bg-alanizGold-600/10 rounded-lg p-4 mt-4">
                <h6 className="font-display font-semibold text-alanizGold-500 mb-2">
                  Las Tres Estrellas
                </h6>
                <p className="text-sm text-parchment-300">
                  Como en el escudo, las tres estrellas de la bandera representan a{' '}
                  <strong>Abril</strong>, <strong>Diana</strong> y <strong>Martina</strong>, las
                  luminarias que aseguran la continuidad del linaje y proyectan la Casa Alaniz hacia
                  el futuro.
                </p>
              </div>
            </div>
          </Card>

          {/* Anillo */}
          <Card src={anillo} title="Anillo Señorial" icon={Gem} delay={600}>
            <div className="bg-alanizGreen-900/30 rounded-lg p-6 border-l-4 border-alanizGold-600/50 space-y-4">
              <p className="text-parchment-200 leading-relaxed">
                El anillo señorial de la Casa Alaniz constituye el símbolo más personal y sagrado de
                autoridad. Portado exclusivamente por el Señor de la Casa, es la marca tangible del
                linaje y la responsabilidad señorial.
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-alanizGold-600/10 rounded-lg p-4">
                    <h5 className="font-display font-semibold text-alanizGold-500 mb-2 flex items-center">
                      <Diamond className="w-5 h-5 mr-2 text-alanizGold-600" aria-hidden="true" /> El
                      Orbe de Ámbar Central
                    </h5>
                    <p className="text-sm text-parchment-300">
                      La piedra central del anillo es el mismo orbe de ámbar que aparece en el
                      escudo. Esta gema única simboliza la llama interior del lema{' '}
                      <em>"Memoria Ardet"</em> y representa la autoridad ininterrumpida del Señor de
                      la Casa Alaniz.
                    </p>
                  </div>

                  <div className="bg-alanizGold-600/10 rounded-lg p-4">
                    <h5 className="font-display font-semibold text-alanizGold-500 mb-2 flex items-center">
                      <Award className="w-5 h-5 mr-2 text-alanizGold-600" aria-hidden="true" />{' '}
                      Plata y Oro Noble
                    </h5>
                    <p className="text-sm text-parchment-300">
                      La base de plata representa la pureza de intenciones, mientras que los
                      detalles en oro simbolizan la excelencia en el ejercicio del señorío. La
                      combinación refleja el equilibrio entre humildad y dignidad.
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-alanizGold-600/10 rounded-lg p-4">
                    <h5 className="font-display font-semibold text-alanizGold-500 mb-2 flex items-center">
                      <User className="w-5 h-5 mr-2 text-alanizGold-600" aria-hidden="true" />{' '}
                      Símbolo de Autoridad
                    </h5>
                    <p className="text-sm text-parchment-300">
                      Por este anillo se reconoce la autoridad legítima del linaje. Su presencia
                      confirma la identidad del portador como Señor de la Casa Alaniz y custodio de
                      la responsabilidad territorial y familiar.
                    </p>
                  </div>

                  <div className="bg-alanizGold-600/10 rounded-lg p-4">
                    <h5 className="font-display font-semibold text-alanizGold-500 mb-2 flex items-center">
                      <Zap className="w-5 h-5 mr-2 text-alanizGold-600" aria-hidden="true" />{' '}
                      Reliquia Sagrada
                    </h5>
                    <p className="text-sm text-parchment-300">
                      Más que una joya, el anillo es una reliquia sagrada que conecta al portador
                      con todos los señores que le precedieron y con todos los que vendrán. Es el
                      vínculo tangible con la eternidad del linaje.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Sección del lema y filosofía heráldica */}
        <div className="observe-me opacity-0 translate-y-8" style={{ animationDelay: '800ms' }}>
          <div
            className="bg-gradient-to-r from-alanizGreen-800/50 to-alanizGreen-900/50 
                          rounded-xl p-8 border border-alanizGold-600/20 backdrop-blur-sm shadow-elegant"
          >
            <div className="text-center space-y-6">
              <div
                className="inline-flex items-center justify-center w-16 h-16 border-2 border-alanizGold-600
                              bg-transparent rounded-full"
              >
                <Flame className="w-8 h-8 text-alanizGold-600" aria-hidden="true" />
              </div>

              <div className="space-y-4">
                <h3 className="text-3xl font-display font-bold text-alanizGold-600">
                  "Memoria Ardet"
                </h3>
                <p className="text-xl text-alanizGold-400 italic">"La memoria arde"</p>
                <div className="max-w-3xl mx-auto">
                  <p className="text-parchment-200 leading-relaxed">
                    Nuestro lema heráldico encapsula la esencia de la Casa Alaniz: la llama interior
                    que mantiene viva la memoria ancestral y alimenta el compromiso con las
                    generaciones futuras. Esta llama arde en cada símbolo, en cada gesto y en cada
                    decisión del Señor de la Casa.
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mt-8">
                <div className="text-center p-4 bg-alanizGreen-900/30 rounded-lg border border-alanizGold-600/20">
                  <div className="mb-2 flex justify-center">
                    <Star className="w-6 h-6 text-alanizGold-600" aria-hidden="true" />
                  </div>
                  <h4 className="font-display font-semibold text-alanizGold-500 mb-2">Abril</h4>
                  <p className="text-sm text-alanizGold-400 italic">Heredera del señorío</p>
                  <p className="text-xs text-parchment-300 mt-1">
                    Inteligente y perseverante, destinada a continuar el linaje con sabiduría y
                    determinación
                  </p>
                </div>

                <div className="text-center p-4 bg-alanizGreen-900/30 rounded-lg border border-alanizGold-600/20">
                  <div className="mb-2 flex justify-center">
                    <Star className="w-6 h-6 text-alanizGold-600" aria-hidden="true" />
                  </div>
                  <h4 className="font-display font-semibold text-alanizGold-500 mb-2">Diana</h4>
                  <p className="text-sm text-alanizGold-400 italic">Del linaje Alaniz</p>
                  <p className="text-xs text-parchment-300 mt-1">
                    Valiente y fuerte, guardiana del honor familiar y protectora de las tradiciones
                  </p>
                </div>

                <div className="text-center p-4 bg-alanizGreen-900/30 rounded-lg border border-alanizGold-600/20">
                  <div className="mb-2 flex justify-center">
                    <Star className="w-6 h-6 text-alanizGold-600" aria-hidden="true" />
                  </div>
                  <h4 className="font-display font-semibold text-alanizGold-500 mb-2">Martina</h4>
                  <p className="text-sm text-alanizGold-400 italic">Del linaje Alaniz</p>
                  <p className="text-xs text-parchment-300 mt-1">
                    Protectora y audaz, defensora de la justicia y custodio de los valores
                    familiares
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Cita inspiracional */}
        <div
          className="text-center mt-16 observe-me opacity-0 translate-y-8"
          style={{ animationDelay: '1000ms' }}
        >
          <div
            className="bg-alanizGreen-800/50 rounded-xl p-8 border border-alanizGold-600/20 
                          backdrop-blur-sm shadow-elegant"
          >
            <blockquote className="text-xl md:text-2xl font-display italic text-alanizGold-600 mb-4 max-w-3xl mx-auto">
              "Los símbolos no adornan la nobleza; la revelan. En cada emblema de la Casa Alaniz
              reside el alma de ocho siglos de honor inquebrantable."
            </blockquote>
            <cite className="text-parchment-400 text-sm">
              — Filosofía heráldica de la Casa Alaniz
            </cite>
          </div>
        </div>
      </div>
    </div>
  );
}
