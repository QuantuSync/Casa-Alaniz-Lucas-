import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Library, Shield, Crown, ScrollText, Mail } from 'lucide-react';
import escudo from '../assets/Escudo.jpg';
import Card from '../components/Card';
import SectionHeading from '../components/SectionHeading';

// Datos para las secciones destacadas
const featuredSections = [
  {
    icon: Library,
    title: 'Historia Familiar',
    description:
      'Descubre la rica crónica de la Casa Alaniz desde el siglo XII, con relatos de honor, valor y legado señorial.',
    link: '/historia',
  },
  {
    icon: Shield,
    title: 'Símbolos Heráldicos',
    description:
      'Explora el significado del escudo, bandera y anillo que identifican a nuestra noble casa señorial.',
    link: '/simbolos',
  },
  {
    icon: Crown,
    title: 'El Legado Inmutable',
    description:
      'Conoce cómo el legado territorial y militar de la Casa Alaniz perdura a través de los siglos.',
    link: '/legado',
  },
  {
    icon: ScrollText,
    title: 'Archivo Documental',
    description:
      'Accede a documentos históricos, cartas y tratados que narran nuestra historia señorial.',
    link: '/documentos',
  },
];

// Estadísticas de la casa
const houseStats = [
  { number: '907', label: 'Años de Historia', suffix: '+' },
  { number: '15', label: 'Generaciones', suffix: '+' },
  { number: '3', label: 'Símbolos Heráldicos', suffix: '' },
  { number: '∞', label: 'Memoria Preservada', suffix: '' },
];

// Componente de estadística
const StatCard = ({
  number,
  label,
  suffix,
  delay = 0,
}: {
  number: string;
  label: string;
  suffix: string;
  delay?: number;
}) => (
  <div
    className="animate-on-scroll translate-y-8 text-center opacity-0"
    style={{ animationDelay: `${delay}ms` }}
  >
    <div className="mb-2 font-display text-3xl font-bold text-alanizGold-600 md:text-4xl">
      {number}
      {suffix}
    </div>
    <div className="text-sm font-medium uppercase tracking-wider text-parchment-400">{label}</div>
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

    const elementsToAnimate = document.querySelectorAll('.animate-on-scroll');
    elementsToAnimate.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [mounted]);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden py-12 lg:py-16">
        {/* Fondo: resplandor radial suavizado */}
        <div className="absolute inset-0 bg-gradient-to-b from-alanizGreen-900/40 to-alanizGreen-950"></div>
        <div className="pointer-events-none absolute left-1/2 top-1/3 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-alanizGold-600/5 blur-3xl"></div>

        <div className="content-container relative z-10">
          <div className="flex flex-col items-center space-y-6 text-center">
            {/* Escudo enmarcado */}
            <div className="w-52 lg:w-60">
              <div
                className={`rounded-xl border border-alanizGold-600/30 bg-alanizGreen-900/40 p-4 shadow-elegant transition-all duration-1000 ${
                  imageLoaded ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
                }`}
              >
                <img
                  src={escudo}
                  alt="Escudo de la Casa Alaniz"
                  className="image-glow mx-auto h-56 w-full object-contain lg:h-64"
                  onLoad={() => setImageLoaded(true)}
                />
              </div>
            </div>

            {/* Título y lema */}
            <div className="space-y-3">
              <h1 className="font-display text-4xl font-bold text-alanizGold-600 md:text-5xl lg:text-6xl">
                Casa Alaniz
              </h1>
              <div className="flex items-center justify-center gap-4">
                <span className="rule-gold w-12"></span>
                <p className="text-lg font-medium italic text-alanizGold-600/80 md:text-xl">
                  Memoria Ardet
                </p>
                <span className="rule-gold w-12"></span>
              </div>
            </div>

            {/* Frase breve */}
            <p className="max-w-2xl text-lg leading-relaxed text-parchment-200 md:text-xl">
              Custodios de la memoria y el legado de una casa señorial con más de nueve siglos de
              historia, honor &amp; servicio.
            </p>

            {/* Accesos */}
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link to="/historia" className="btn-alaniz">
                <Library className="mr-2 h-5 w-5" aria-hidden="true" />
                Explorar Historia
              </Link>
              <Link to="/simbolos" className="btn-secondary">
                <Shield className="mr-2 h-5 w-5" aria-hidden="true" />
                Ver Símbolos
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Estadísticas */}
      <section className="border-y border-alanizGold-600/20 bg-alanizGreen-900/30 py-16">
        <div className="content-container">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
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

      {/* Narrativa */}
      <section className="py-16 md:py-24">
        <div className="content-container">
          <SectionHeading eyebrow="Quiénes somos" title="Una casa con memoria" />
          <div className="mx-auto max-w-3xl space-y-6 text-parchment-200">
            <p className="text-lg leading-relaxed">
              Bienvenido al archivo heráldico oficial de la Casa Alaniz. Durante más de novecientos
              años, hemos sido una casa señorial con tradición militar, preservando nuestro legado
              territorial y familiar para las generaciones futuras.
            </p>
            <p className="leading-relaxed">
              Desde el siglo XII, cuando nuestros ancestros servían como ingenieros y estrategas
              militares, la Casa Alaniz ha mantenido vivos los valores de honor, disciplina y la
              responsabilidad señorial sobre el{' '}
              <em className="text-alanizGold-400">Valle de Monterrey</em>.
            </p>
          </div>
        </div>
      </section>

      {/* Secciones destacadas */}
      <section className="py-16 md:py-24">
        <div className="content-container">
          <SectionHeading
            eyebrow="Explora el archivo"
            title="Descubre nuestro legado"
            intro="Historia, símbolos y documentos que conforman el rico patrimonio señorial de la Casa Alaniz."
          />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {featuredSections.map((section) => (
              <Card
                key={section.title}
                icon={section.icon}
                title={section.title}
                to={section.link}
                cta="Explorar"
              >
                {section.description}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Llamada a la acción final */}
      <section className="bg-gradient-to-r from-alanizGreen-900 via-alanizGreen-800 to-alanizGreen-900 py-16 md:py-24">
        <div className="content-container">
          <div className="text-center">
            <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full border-2 border-alanizGold-600 bg-transparent">
              <Mail className="h-8 w-8 text-alanizGold-600" aria-hidden="true" />
            </div>
            <SectionHeading
              title="¿Formas parte de la Casa Alaniz?"
              intro="Si eres descendiente de nuestra casa señorial o necesitas información sobre documentos genealógicos y territoriales, contacta con la administración de la Casa."
            />
            <Link to="/contacto" className="btn-alaniz">
              <Mail className="mr-2 h-5 w-5" aria-hidden="true" />
              Contactar Administración
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
