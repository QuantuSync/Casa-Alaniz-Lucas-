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
import AccreditationSeal from '../components/AccreditationSeal';

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
        <div className="stack-centered mb-16 observe-me opacity-0 translate-y-8">
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
            Los símbolos que identifican a la Casa Alaniz —escudo, bandera y anillo—, recuperados y
            fijados en su forma actual en 2025.
          </p>
        </div>

        {/* Grid de símbolos */}
        <div className="grid gap-12 lg:grid-cols-1 xl:grid-cols-1 mb-16">
          {/* Escudo */}
          <Card src={escudo} title="Escudo de Armas" icon={Shield} delay={200}>
            <div className="bg-alanizGreen-900/30 rounded-lg p-6 border-l-4 border-alanizGold-600/50 space-y-4">
              <p className="text-parchment-200 leading-relaxed">
                El escudo reúne los principales símbolos de la Casa. Cada elemento se eligió para
                representar uno de sus valores.
              </p>

              <div className="grid md:grid-cols-2 gap-6 mt-6">
                <div className="space-y-4">
                  <div className="bg-alanizGold-600/10 rounded-lg p-4">
                    <h5 className="font-display font-semibold text-alanizGold-500 mb-2 flex items-center">
                      <PawPrint className="w-5 h-5 mr-2 text-alanizGold-600" aria-hidden="true" />{' '}
                      El Lobo Guardián
                    </h5>
                    <p className="text-sm text-parchment-300">
                      Figura central del escudo. Representa la{' '}
                      <em>inteligencia, la vigilancia y la lealtad</em> a la familia, más que la
                      fuerza.
                    </p>
                  </div>

                  <div className="bg-alanizGold-600/10 rounded-lg p-4">
                    <h5 className="font-display font-semibold text-alanizGold-500 mb-2 flex items-center">
                      <Flame className="w-5 h-5 mr-2 text-alanizGold-600" aria-hidden="true" /> El
                      Orbe de Ámbar
                    </h5>
                    <p className="text-sm text-parchment-300">
                      En el centro del escudo, esta esfera dorada es la llama del lema{' '}
                      <em>"Memoria Ardet"</em>: la voluntad de mantener viva la memoria de la
                      familia.
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
                      Representan a las tres hijas de la familia —<strong>Abril</strong>,{' '}
                      <strong>Diana</strong> y <strong>Martina</strong>— y la continuidad de la Casa.
                    </p>
                  </div>

                  <div className="bg-alanizGold-600/10 rounded-lg p-4">
                    <h5 className="font-display font-semibold text-alanizGold-500 mb-2 flex items-center">
                      <Leaf className="w-5 h-5 mr-2 text-alanizGold-600" aria-hidden="true" /> Las
                      Raíces Profundas
                    </h5>
                    <p className="text-sm text-parchment-300">
                      En la base del escudo, representan los orígenes de la familia y el arraigo de su
                      memoria.
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

          {/* Escudo de armas certificado */}
          <AccreditationSeal eyebrow="Reconocimiento oficial" title="Escudo de armas certificado">
            <p>
              El escudo de armas de la Casa Alaniz se encuentra oficialmente certificado y
              registrado en el Armorial Internacional (Gijón, Principado de Asturias, 2025), con
              testimonio notarial del Ilustre Colegio Notarial de Asturias.
            </p>
          </AccreditationSeal>

          {/* Bandera */}
          <Card src={bandera} title="Bandera Señorial" icon={Flag} delay={400}>
            <div className="bg-alanizGreen-900/30 rounded-lg p-6 border-l-4 border-alanizGold-600/50 space-y-4">
              <p className="text-parchment-200 leading-relaxed">
                La bandera de la Casa Alaniz. Su diseño es sencillo: el campo verde y las tres
                estrellas doradas del escudo.
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h5 className="font-display font-semibold text-alanizGold-500">
                    Diseño y Proporciones
                  </h5>
                  <p className="text-sm text-parchment-300">
                    Fondo verde Alaniz con las tres estrellas doradas dispuestas en triángulo,
                    según las proporciones heráldicas habituales. El verde ocupa el campo y el oro de
                    las estrellas aporta el contraste.
                  </p>
                </div>

                <div className="space-y-3">
                  <h5 className="font-display font-semibold text-alanizGold-500">
                    Simbolismo de Colores
                  </h5>
                  <p className="text-sm text-parchment-300">
                    El <strong className="text-alanizGold-400">verde</strong>: la esperanza y el
                    vínculo con la tierra del Valle de Monterrey. El{' '}
                    <strong className="text-alanizGold-400">oro</strong>: la excelencia y la dignidad.
                  </p>
                </div>
              </div>

              <div className="bg-alanizGold-600/10 rounded-lg p-4 mt-4">
                <h6 className="font-display font-semibold text-alanizGold-500 mb-2">
                  Las Tres Estrellas
                </h6>
                <p className="text-sm text-parchment-300">
                  Como en el escudo, las tres estrellas de la bandera son{' '}
                  <strong>Abril</strong>, <strong>Diana</strong> y <strong>Martina</strong>.
                </p>
              </div>
            </div>
          </Card>

          {/* Anillo */}
          <Card src={anillo} title="Anillo Señorial" icon={Gem} delay={600}>
            <div className="bg-alanizGreen-900/30 rounded-lg p-6 border-l-4 border-alanizGold-600/50 space-y-4">
              <p className="text-parchment-200 leading-relaxed">
                El anillo es el símbolo más personal de la Casa. Lo lleva el Señor de la Casa como
                señal de su responsabilidad sobre ella.
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-alanizGold-600/10 rounded-lg p-4">
                    <h5 className="font-display font-semibold text-alanizGold-500 mb-2 flex items-center">
                      <Diamond className="w-5 h-5 mr-2 text-alanizGold-600" aria-hidden="true" /> El
                      Orbe de Ámbar Central
                    </h5>
                    <p className="text-sm text-parchment-300">
                      La piedra central es el mismo orbe de ámbar del escudo, en referencia al lema{' '}
                      <em>"Memoria Ardet"</em>.
                    </p>
                  </div>

                  <div className="bg-alanizGold-600/10 rounded-lg p-4">
                    <h5 className="font-display font-semibold text-alanizGold-500 mb-2 flex items-center">
                      <Award className="w-5 h-5 mr-2 text-alanizGold-600" aria-hidden="true" />{' '}
                      Plata y Oro Noble
                    </h5>
                    <p className="text-sm text-parchment-300">
                      La plata, la sencillez; el oro, la excelencia. Juntos, el equilibrio entre
                      humildad y dignidad.
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
                      El anillo identifica a quien lo lleva como Señor de la Casa Alaniz y
                      responsable de su cuidado.
                    </p>
                  </div>

                  <div className="bg-alanizGold-600/10 rounded-lg p-4">
                    <h5 className="font-display font-semibold text-alanizGold-500 mb-2 flex items-center">
                      <Zap className="w-5 h-5 mr-2 text-alanizGold-600" aria-hidden="true" />{' '}
                      Vínculo entre generaciones
                    </h5>
                    <p className="text-sm text-parchment-300">
                      Más que una joya, el anillo enlaza a quien lo lleva con quienes le precedieron y
                      con quienes vendrán.
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
                    El lema resume la idea que guía a la Casa Alaniz: mantener viva la memoria de la
                    familia y cuidar de las próximas generaciones.
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mt-8">
                <div className="text-center p-4 bg-alanizGreen-900/30 rounded-lg border border-alanizGold-600/20">
                  <div className="mb-2 flex justify-center">
                    <Star className="w-6 h-6 text-alanizGold-600" aria-hidden="true" />
                  </div>
                  <h4 className="font-display font-semibold text-alanizGold-500 mb-2">Abril</h4>
                  <p className="text-sm text-alanizGold-400 italic">La hija mayor</p>
                  <p className="text-xs text-parchment-300 mt-1">
                    Llamada a dar continuidad a la Casa.
                  </p>
                </div>

                <div className="text-center p-4 bg-alanizGreen-900/30 rounded-lg border border-alanizGold-600/20">
                  <div className="mb-2 flex justify-center">
                    <Star className="w-6 h-6 text-alanizGold-600" aria-hidden="true" />
                  </div>
                  <h4 className="font-display font-semibold text-alanizGold-500 mb-2">Diana</h4>
                  <p className="text-sm text-alanizGold-400 italic">Del linaje Alaniz</p>
                  <p className="text-xs text-parchment-300 mt-1">
                    Una de las tres estrellas de la Casa.
                  </p>
                </div>

                <div className="text-center p-4 bg-alanizGreen-900/30 rounded-lg border border-alanizGold-600/20">
                  <div className="mb-2 flex justify-center">
                    <Star className="w-6 h-6 text-alanizGold-600" aria-hidden="true" />
                  </div>
                  <h4 className="font-display font-semibold text-alanizGold-500 mb-2">Martina</h4>
                  <p className="text-sm text-alanizGold-400 italic">Del linaje Alaniz</p>
                  <p className="text-xs text-parchment-300 mt-1">
                    Una de las tres estrellas de la Casa.
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
              "Los símbolos no adornan: cuentan quiénes somos. En cada uno está la memoria de la Casa
              Alaniz."
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
