import React, { useEffect, useState } from 'react';
import escudo from '../assets/Escudo.jpg';
import bandera from '../assets/Bandera.jpg';
import anillo from '../assets/Anillo.png';

// Componente de tarjeta de símbolo mejorado
const Card = ({
  src,
  title,
  children,
  icon,
  delay = 0
}: {
  src: string;
  title: string;
  children: string;
  icon: string;
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
        <div className={`transition-all duration-700 ${imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`}>
          <img 
            src={src} 
            alt={title} 
            className="w-full h-48 object-contain bg-parchment-100 image-glow border border-alanizGold-600/20
                       group-hover:border-alanizGold-600/40 transition-all duration-300 p-4"
            onLoad={() => setImageLoaded(true)}
          />
        </div>
        
        {/* Overlay con información adicional */}
        <div className={`absolute inset-0 bg-gradient-to-t from-alanizGreen-950/80 via-transparent to-transparent
                         transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex items-center space-x-2 text-alanizGold-600">
              <span className="w-4 h-4">👁️</span>
              <span className="text-sm font-medium">Ver detalles</span>
            </div>
          </div>
        </div>
        
        {/* Efecto de brillo */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-alanizGold-600/10 to-transparent 
                        -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>
        
        {/* Loading placeholder */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-parchment-100 animate-pulse flex items-center justify-center rounded-lg">
            <div className="w-12 h-12 border-2 border-alanizGold-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
      </div>

      <figcaption className="space-y-4">
        {/* Encabezado con icono */}
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0">
            <div className="inline-flex items-center justify-center w-10 h-10 
                            bg-alanizGold-600 rounded-full shadow-lg group-hover:scale-110 
                            transition-transform duration-300">
              <span className="w-5 h-5 text-alanizGreen-950 text-lg flex items-center justify-center">{icon}</span>
            </div>
          </div>
          <h3 className="text-xl md:text-2xl font-display font-bold text-alanizGold-600 
                         group-hover:text-alanizGold-500 transition-colors duration-300">
            {title}
          </h3>
        </div>
        
        {/* Descripción */}
        <div className="bg-alanizGreen-900/30 rounded-lg p-4 border-l-4 border-alanizGold-600/50">
          <p className="text-parchment-200 leading-relaxed text-sm md:text-base">
            {children}
          </p>
        </div>
        
        {/* Indicador de autenticidad */}
        <div className="flex items-center justify-center space-x-2 text-xs text-alanizGold-600/70 
                        font-medium uppercase tracking-wider">
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
            <span className="w-8 h-8 text-alanizGreen-950 text-2xl">🛡️</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-display font-bold text-alanizGold-600 mb-6">
            Símbolos Heráldicos
          </h1>
          
          <div className="divider-ornamental"></div>
          
          <p className="text-lg text-parchment-300 max-w-3xl mx-auto leading-relaxed">
            Los emblemas sagrados que identifican y representan la noble Casa Alaniz, 
            cada uno con un significado profundo forjado a través de los siglos.
          </p>
        </div>

        {/* Grid de símbolos */}
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3 mb-16">
          <Card 
            src={escudo} 
            title="Escudo" 
            icon="🛡️"
            delay={200}
          >
            Lobo pasante, tres estrellas y raíces profundas: vigilancia, honor y
            unión con la tierra ancestral. Las tres estrellas llevan los nombres de
            las hijas del linaje: Abril la heredera, Diana la valiente, y Martina la protectora.
          </Card>
          
          <Card 
            src={bandera} 
            title="Bandera" 
            icon="🏳️"
            delay={400}
          >
            Verde esperanza y oro de excelencia. Las tres estrellas representan
            a las hijas del linaje: Abril, Diana y Martina.
          </Card>
          
          <Card 
            src={anillo} 
            title="Anillo" 
            icon="💍"
            delay={600}
          >
            Plata, oro y ámbar: reliquia sagrada que porta siempre el señor o custodio
            de la Casa. Por este anillo se reconoce la autoridad del linaje.
          </Card>
        </div>

        {/* Sección informativa adicional */}
        <div className="observe-me opacity-0 translate-y-8" style={{ animationDelay: '800ms' }}>
          <div className="bg-gradient-to-r from-alanizGreen-800/50 to-alanizGreen-900/50 
                          rounded-xl p-8 border border-alanizGold-600/20 backdrop-blur-sm shadow-elegant">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="inline-flex items-center justify-center w-12 h-12 
                                bg-alanizGold-600 rounded-full shadow-lg">
                  <span className="w-6 h-6 text-alanizGreen-950 text-lg">ℹ️</span>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-display font-semibold text-alanizGold-600 mb-4">
                  Las Tres Estrellas del Linaje
                </h3>
                <p className="text-parchment-200 leading-relaxed mb-6">
                  Cada símbolo de la Casa Alaniz ha sido cuidadosamente preservado y transmitido 
                  de generación en generación. Las tres estrellas del escudo llevan los nombres 
                  y representan las virtudes de las hijas del linaje vivo:
                </p>
                
                {/* Las tres hijas */}
                <div className="grid md:grid-cols-3 gap-6 mb-6">
                  <div className="text-center p-4 bg-alanizGreen-900/30 rounded-lg border border-alanizGold-600/20">
                    <div className="text-2xl mb-2">⭐</div>
                    <h4 className="font-display font-semibold text-alanizGold-500 mb-2">Abril</h4>
                    <p className="text-sm text-alanizGold-400 italic">Heredera del señorío</p>
                    <p className="text-xs text-parchment-300 mt-1">Inteligente y perseverante</p>
                  </div>
                  
                  <div className="text-center p-4 bg-alanizGreen-900/30 rounded-lg border border-alanizGold-600/20">
                    <div className="text-2xl mb-2">⭐</div>
                    <h4 className="font-display font-semibold text-alanizGold-500 mb-2">Diana</h4>
                    <p className="text-sm text-alanizGold-400 italic">Del linaje Alaniz</p>
                    <p className="text-xs text-parchment-300 mt-1">Valiente y fuerte</p>
                  </div>
                  
                  <div className="text-center p-4 bg-alanizGreen-900/30 rounded-lg border border-alanizGold-600/20">
                    <div className="text-2xl mb-2">⭐</div>
                    <h4 className="font-display font-semibold text-alanizGold-500 mb-2">Martina</h4>
                    <p className="text-sm text-alanizGold-400 italic">Del linaje Alaniz</p>
                    <p className="text-xs text-parchment-300 mt-1">Protectora y audaz</p>
                  </div>
                </div>

                <p className="text-parchment-300 text-sm leading-relaxed">
                  Los colores, formas y elementos no son meras decoraciones, sino manifestaciones 
                  tangibles de los valores y el linaje vivo que han guiado a nuestra casa durante 
                  más de novecientos años de historia.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Cita inspiracional */}
        <div className="text-center mt-16 observe-me opacity-0 translate-y-8" 
             style={{ animationDelay: '1000ms' }}>
          <blockquote className="text-xl md:text-2xl font-display italic text-alanizGold-600 mb-4 max-w-3xl mx-auto">
            "En cada símbolo reside el alma de la casa, y en cada casa vive el honor de sus ancestros."
          </blockquote>
          <cite className="text-parchment-400 text-sm">— Lema heráldico tradicional</cite>
        </div>
      </div>
    </div>
  );
}