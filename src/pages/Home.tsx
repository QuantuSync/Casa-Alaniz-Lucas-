import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import escudo from '../assets/Escudo.jpg';

// Datos para las secciones destacadas
const featuredSections = [
  {
    icon: '📚',
    title: 'Historia Familiar',
    description: 'Descubre la rica crónica de los Alaniz desde 1117 d.C., con relatos de honor, valor y legado.',
    link: '/historia',
    color: 'from-blue-500 to-blue-600'
  },
  {
    icon: '🛡️',
    title: 'Símbolos Heráldicos',
    description: 'Explora el significado del escudo, bandera y anillo que identifican nuestra noble casa.',
    link: '/simbolos',
    color: 'from-green-500 to-green-600'
  },
  {
    icon: '👑',
    title: 'El Legado Vivo',
    description: 'Conoce cómo el legado de la Casa Alaniz continúa guiando a las nuevas generaciones.',
    link: '/legado',
    color: 'from-purple-500 to-purple-600'
  },
  {
    icon: '📜',
    title: 'Archivo Documental',
    description: 'Accede a documentos históricos, cartas y tratados que narran nuestra historia.',
    link: '/documentos',
    color: 'from-amber-500 to-amber-600'
  }
];

// Estadísticas de la casa
const houseStats = [
  { number: '907', label: 'Años de Historia', suffix: '+' },
  { number: '15', label: 'Generaciones', suffix: '+' },
  { number: '3', label: 'Símbolos Heráldicos', suffix: '' },
  { number: '∞', label: 'Memoria Preservada', suffix: '' }
];

// Componente de tarjeta de sección
const SectionCard = ({ 
  icon, 
  title, 
  description, 
  link, 
  color,
  delay = 0 
}: {
  icon: string;
  title: string;
  description: string;
  link: string;
  color: string;
  delay?: number;
}) => (
  <Link 
    to={link}
    className="group card-elegant hover:scale-105 transition-all duration-500 block"
    style={{ animationDelay: `${delay}ms` }}
  >
    <div className="relative overflow-hidden">
      {/* Icono con gradiente */}
      <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg 
                       bg-gradient-to-r ${color} shadow-lg mb-4 group-hover:scale-110 
                       transition-transform duration-300`}>
        <span className="text-white text-xl">{icon}</span>
      </div>
      
      {/* Contenido */}
      <h3 className="text-xl font-display font-semibold text-alanizGold-600 mb-3 
                     group-hover:text-alanizGold-500 transition-colors duration-300">
        {title}
      </h3>
      
      <p className="text-parchment-300 leading-relaxed mb-4 text-sm">
        {description}
      </p>
      
      {/* Call to action */}
      <div className="flex items-center text-alanizGold-600 font-medium text-sm 
                      group-hover:text-alanizGold-500 transition-colors duration-300">
        <span>Explorar</span>
        <span className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300">→</span>
      </div>
      
      {/* Efecto hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-alanizGold-600/5 to-transparent 
                      opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
    </div>
  </Link>
);

// Componente de estadística
const StatCard = ({ number, label, suffix, delay = 0 }: {
  number: string;
  label: string;
  suffix: string;
  delay?: number;
}) => (
  <div 
    className="text-center animate-on-scroll opacity-0 translate-y-8"
    style={{ animationDelay: `${delay}ms` }}
  >
    <div className="text-3xl md:text-4xl font-display font-bold text-alanizGold-600 mb-2">
      {number}{suffix}
    </div>
    <div className="text-sm text-parchment-400 font-medium uppercase tracking-wider">
      {label}
    </div>
  </div>
);

// Componente principal
export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Intersection Observer para animaciones
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            entry.target.classList.remove('opacity-0', 'translate-y-8');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    // Observar elementos con la clase animate-on-scroll
    const elementsToAnimate = document.querySelectorAll('.animate-on-scroll');
    elementsToAnimate.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, [mounted]);

  return (
    <div className="min-h-screen">
      
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        {/* Background decorativo */}
        <div className="absolute inset-0 bg-gradient-to-b from-alanizGreen-900/50 to-alanizGreen-950"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-alanizGold-600/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-alanizGold-600/5 rounded-full blur-2xl animate-float" 
             style={{ animationDelay: '2s' }}></div>
        
        <div className="content-container relative z-10">
          <div className="text-center space-y-8">
            
            {/* Escudo con animación */}
            <div className="relative w-52 h-64 lg:w-64 lg:h-72 mx-auto">
              <div className={`transition-all duration-1000 ${imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                <img 
                  src={escudo} 
                  alt="Escudo de la Casa Alaniz" 
                  className="w-50 h-60 lg:w-60 lg:h-70 mx-auto object-cover rounded-lg shadow-2xl image-glow"
                  onLoad={() => setImageLoaded(true)}
                />
              </div>
              
              {/* Efectos de resplandor */}
              <div className="absolute inset-0 bg-alanizGold-600/20 rounded-lg blur-xl -z-10 animate-pulse"></div>
              <div className="absolute -inset-4 bg-gradient-to-r from-transparent via-alanizGold-600/10 to-transparent rounded-full blur-2xl -z-20"></div>
            </div>
            
            {/* Título principal */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-alanizGold-600 
                             animate-fade-in-up drop-shadow-gold">
                Casa Alaniz
              </h1>
              
              <div className="flex items-center justify-center space-x-4">
                <div className="h-px w-16 bg-alanizGold-600"></div>
                <p className="text-lg md:text-xl text-alanizGold-600/80 italic font-medium">
                  Memoria Ardet
                </p>
                <div className="h-px w-16 bg-alanizGold-600"></div>
              </div>
            </div>
            
            {/* Descripción principal */}
            <div className="max-w-3xl mx-auto space-y-6">
              <p className="text-lg md:text-xl text-parchment-200 leading-relaxed animate-fade-in-up"
                 style={{ animationDelay: '200ms' }}>
                Bienvenido al archivo heráldico oficial de la Casa Alaniz. Durante más de 
                novecientos años, hemos sido custodios de la memoria familiar, preservando 
                nuestro legado para las generaciones futuras.
              </p>
              
              <p className="text-base md:text-lg text-parchment-300 leading-relaxed animate-fade-in-up"
                 style={{ animationDelay: '400ms' }}>
                Desde las brumas del año 1117, cuando <em>Eslogar</em>, el "Lobo Guardián", 
                protegía los valles septentrionales, nuestra casa ha mantenido vivos los 
                valores de honor, valor y unión con la tierra ancestral.
              </p>
            </div>
            
            {/* Botones de acción */}
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 
                            animate-fade-in-up" style={{ animationDelay: '600ms' }}>
              <Link to="/historia" className="btn-alaniz">
                <span className="w-5 h-5 mr-2">📚</span>
                Explorar Historia
              </Link>
              <Link to="/simbolos" className="btn-secondary">
                <span className="w-5 h-5 mr-2">🛡️</span>
                Ver Símbolos
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Estadísticas */}
      <section className="py-16 bg-alanizGreen-900/30 border-y border-alanizGold-600/20">
        <div className="content-container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {houseStats.map((stat, index) => (
              <StatCard 
                key={stat.label}
                number={stat.number}
                label={stat.label}
                suffix={stat.suffix}
                delay={index * 150}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Secciones destacadas */}
      <section className="py-20">
        <div className="content-container">
          
          {/* Encabezado de sección */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-alanizGold-600 mb-4">
              Descubre Nuestro Legado
            </h2>
            <div className="divider-ornamental"></div>
            <p className="text-lg text-parchment-300 max-w-2xl mx-auto">
              Explora los diferentes aspectos de la historia, símbolos y documentos 
              que conforman el rico patrimonio de la Casa Alaniz.
            </p>
          </div>
          
          {/* Grid de secciones */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {featuredSections.map((section, index) => (
              <SectionCard 
                key={section.title}
                icon={section.icon}
                title={section.title}
                description={section.description}
                link={section.link}
                color={section.color}
                delay={index * 100}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Llamada a la acción final */}
      <section className="py-20 bg-gradient-to-r from-alanizGreen-900 via-alanizGreen-800 to-alanizGreen-900">
        <div className="content-container">
          <div className="text-center space-y-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-alanizGold-600 
                            rounded-full shadow-lg mb-4">
              <span className="w-8 h-8 text-alanizGreen-950 text-2xl">📧</span>
            </div>
            
            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-display font-bold text-alanizGold-600">
                ¿Formas parte de la Casa Alaniz?
              </h2>
              <p className="text-parchment-300 max-w-2xl mx-auto">
                Si eres descendiente de nuestra noble casa o necesitas información sobre 
                documentos genealógicos, no dudes en contactar con nuestra administración.
              </p>
            </div>
            
            <Link to="/contacto" className="btn-alaniz">
              <span className="w-5 h-5 mr-2">📧</span>
              Contactar Administración
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
