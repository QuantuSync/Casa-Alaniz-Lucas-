import React, { useEffect, useState } from 'react';

// Interfaz para las fotos de la galería
interface FotoGaleria {
  id: string;
  url: string;
  descripcion: string;
  año: number;
  evento: string;
}

// Datos de ejemplo para la galería (puedes reemplazar con fotos reales)
const fotosGaleria: FotoGaleria[] = [
  {
    id: '1',
    url: '/images/galeria/dia-casa-2025-ceremonia.jpg',
    descripcion: 'Ceremonia de entrega de condecoraciones 2025',
    año: 2025,
    evento: 'Ceremonia Principal'
  },
  {
    id: '2',
    url: '/images/galeria/dia-casa-2025-banquete.jpg',
    descripcion: 'Banquete familiar tras la ceremonia',
    año: 2025,
    evento: 'Banquete'
  },
  {
    id: '3',
    url: '/images/galeria/dia-casa-2025-lectura.jpg',
    descripcion: 'Lectura solemne de la historia familiar',
    año: 2025,
    evento: 'Lectura Histórica'
  },
  {
    id: '4',
    url: '/images/galeria/dia-casa-2025-votos.jpg',
    descripcion: 'Renovación de votos de lealtad',
    año: 2025,
    evento: 'Renovación de Votos'
  }
];

// Programa del día
const programaDia = [
  {
    hora: '10:00',
    evento: 'Recepción y registro de invitados',
    descripcion: 'Acogida formal con protocolo de vestimenta'
  },
  {
    hora: '11:00',
    evento: 'Ceremonia de renovación de votos',
    descripcion: 'Renovación solemne de la lealtad al linaje y sus valores'
  },
  {
    hora: '12:00',
    evento: 'Lectura de la Crónica Fundacional',
    descripcion: 'Recordatorio solemne de nuestra historia milenaria'
  },
  {
    hora: '13:00',
    evento: 'Entrega de Condecoraciones',
    descripcion: 'Ceremonia principal: otorgamiento de honores y reconocimientos'
  },
  {
    hora: '14:30',
    evento: 'Banquete de la Casa',
    descripcion: 'Comida familiar y confraternización entre miembros'
  },
  {
    hora: '16:00',
    evento: 'Clausura y despedida',
    descripcion: 'Palabras finales del Señor de la Casa y despedida formal'
  }
];

// Protocolo de vestimenta
const protocoloVestimenta = [
  {
    categoria: 'Miembros de la Casa',
    descripcion: 'Vestimenta formal oscura con símbolos heráldicos de la Casa (pin del escudo, anillo familiar)',
    color: 'from-alanizGold-500 to-alanizGold-600'
  },
  {
    categoria: 'Condecorados del día',
    descripcion: 'Vestimenta formal oscura. Recibirán sus condecoraciones durante la ceremonia',
    color: 'from-blue-500 to-blue-600'
  },
  {
    categoria: 'Invitados',
    descripcion: 'Vestimenta formal respetuosa. Se sugiere colores sobrios en honor a la solemnidad',
    color: 'from-green-500 to-green-600'
  }
];

export default function DiaDeLaCasa() {
  const [selectedPhoto, setSelectedPhoto] = useState<FotoGaleria | null>(null);
  const [condecorados, setCondecorados] = useState<any[]>([]);

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

    // Cargar condecorados del localStorage
    const savedCondecorados = localStorage.getItem('alanizCondecorados');
    if (savedCondecorados) {
      setCondecorados(JSON.parse(savedCondecorados));
    }

    return () => observer.disconnect();
  }, []);

  // Función para obtener próxima fecha del Día de la Casa
  const getProximaFecha = () => {
    const now = new Date();
    const currentYear = now.getFullYear();
    let diaDelaCasa = new Date(currentYear, 8, 22); // 22 de septiembre (mes 8 = septiembre)
    
    // Si ya pasó este año, mostrar el del próximo año
    if (now > diaDelaCasa) {
      diaDelaCasa = new Date(currentYear + 1, 8, 22);
    }
    
    return diaDelaCasa;
  };

  const proximaFecha = getProximaFecha();
  const diasRestantes = Math.ceil((proximaFecha.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

  // Obtener condecorados de este año
  const condecoradosEsteAño = condecorados.filter(c => {
    const fechaOtorgamiento = new Date(c.fechaOtorgamiento);
    return fechaOtorgamiento.getFullYear() === 2025;
  });

  return (
    <div className="min-h-screen py-16">
      <div className="content-container">
        
        {/* Hero Section */}
        <div className="text-center mb-16 observe-me opacity-0 translate-y-8">
          <div className="inline-flex items-center justify-center space-x-4 mb-6">
            <span className="text-4xl animate-float">🎖️</span>
            <span className="text-5xl animate-float" style={{ animationDelay: '0.5s' }}>👑</span>
            <span className="text-4xl animate-float" style={{ animationDelay: '1s' }}>🏆</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-display font-bold text-alanizGold-600 mb-6">
            El Día de la Casa Alaniz
          </h1>
          
          <div className="divider-ornamental"></div>
          
          <p className="text-lg text-parchment-300 max-w-3xl mx-auto leading-relaxed mb-8">
            La celebración anual más solemne de nuestro linaje, donde honramos nuestra historia, 
            renovamos nuestros votos y reconocemos a quienes han demostrado honor y lealtad 
            excepcionales a la Casa Alaniz.
          </p>

          {/* Próxima celebración */}
          <div className="bg-alanizGreen-800/50 rounded-xl p-6 max-w-2xl mx-auto border border-alanizGold-600/20">
            <h3 className="text-xl font-display font-semibold text-alanizGold-500 mb-3">
              Próxima Celebración
            </h3>
            <div className="flex items-center justify-center space-x-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-alanizGold-600">22</div>
                <div className="text-sm text-parchment-400">Septiembre</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-alanizGold-600">{proximaFecha.getFullYear()}</div>
                <div className="text-sm text-parchment-400">Año</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-alanizGold-600">{diasRestantes}</div>
                <div className="text-sm text-parchment-400">Días restantes</div>
              </div>
            </div>
          </div>
        </div>

        {/* Historia de la celebración */}
        <div className="card-elegant observe-me opacity-0 translate-y-8 mb-12" 
             style={{ animationDelay: '200ms' }}>
          <div className="flex items-start space-x-6 mb-6">
            <div className="flex-shrink-0">
              <div className="inline-flex items-center justify-center w-14 h-14 
                              bg-gradient-to-r from-amber-500 to-amber-600 rounded-full shadow-lg">
                <span className="text-white text-xl">📜</span>
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-display font-semibold text-alanizGold-600 mb-4">
                Historia de la Celebración
              </h3>
            </div>
          </div>
          
          <div className="space-y-4 text-parchment-200 leading-relaxed">
            <p>
              El <strong className="text-alanizGold-500">Día de la Casa Alaniz</strong> se instituyó oficialmente 
              en el año <strong className="text-alanizGold-500">2025</strong>, coincidiendo con la refundación 
              formal de nuestro linaje. El <em className="text-alanizGold-400">22 de septiembre</em> fue elegido 
              como fecha conmemorativa por su proximidad al equinoccio de otoño, simbolizando el equilibrio 
              entre tradición y renovación que define a nuestra Casa.
            </p>
            <p>
              Esta celebración anual tiene como propósito <strong className="text-alanizGold-500">fortalecer los 
              lazos familiares</strong>, reconocer públicamente a quienes han contribuido al honor de la Casa, 
              y renovar solemnemente nuestro compromiso con los valores ancestrales que nos han guiado 
              durante más de ocho siglos.
            </p>
            <p>
              El <em className="text-alanizGold-400">lugar de celebración varía cada año</em>, permitiendo que 
              diferentes territorios vinculados a la Casa puedan acoger esta ceremonia solemne, 
              manteniendo viva la conexión con nuestras raíces territoriales.
            </p>
          </div>
        </div>

        {/* Programa del día */}
        <div className="card-elegant observe-me opacity-0 translate-y-8 mb-12" 
             style={{ animationDelay: '400ms' }}>
          <div className="flex items-start space-x-6 mb-6">
            <div className="flex-shrink-0">
              <div className="inline-flex items-center justify-center w-14 h-14 
                              bg-gradient-to-r from-blue-500 to-blue-600 rounded-full shadow-lg">
                <span className="text-white text-xl">⏰</span>
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-display font-semibold text-alanizGold-600 mb-4">
                Programa de Actividades
              </h3>
            </div>
          </div>
          
          <div className="space-y-4">
            {programaDia.map((actividad, index) => (
              <div key={index} className="flex items-start space-x-4 p-4 bg-alanizGreen-900/30 rounded-lg">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-alanizGold-600/20 rounded-lg flex items-center justify-center">
                    <span className="text-alanizGold-600 font-bold text-sm">{actividad.hora}</span>
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-alanizGold-500 mb-1">
                    {actividad.evento}
                  </h4>
                  <p className="text-parchment-300 text-sm">
                    {actividad.descripcion}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Protocolo de vestimenta */}
        <div className="card-elegant observe-me opacity-0 translate-y-8 mb-12" 
             style={{ animationDelay: '600ms' }}>
          <div className="flex items-start space-x-6 mb-6">
            <div className="flex-shrink-0">
              <div className="inline-flex items-center justify-center w-14 h-14 
                              bg-gradient-to-r from-purple-500 to-purple-600 rounded-full shadow-lg">
                <span className="text-white text-xl">👔</span>
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-display font-semibold text-alanizGold-600 mb-4">
                Protocolo de Vestimenta
              </h3>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {protocoloVestimenta.map((protocolo, index) => (
              <div key={index} className="bg-alanizGreen-900/30 rounded-lg p-5 border border-alanizGold-600/20">
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg 
                                 bg-gradient-to-r ${protocolo.color} shadow-lg mb-4`}>
                  <span className="text-white text-lg">
                    {index === 0 ? '👑' : index === 1 ? '🏆' : '👥'}
                  </span>
                </div>
                <h4 className="text-lg font-semibold text-alanizGold-500 mb-3">
                  {protocolo.categoria}
                </h4>
                <p className="text-parchment-300 text-sm leading-relaxed">
                  {protocolo.descripcion}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Condecoraciones otorgadas */}
        <div className="card-elegant observe-me opacity-0 translate-y-8 mb-12" 
             style={{ animationDelay: '800ms' }}>
          <div className="flex items-start space-x-6 mb-6">
            <div className="flex-shrink-0">
              <div className="inline-flex items-center justify-center w-14 h-14 
                              bg-gradient-to-r from-red-500 to-red-600 rounded-full shadow-lg">
                <span className="text-white text-xl">🏅</span>
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-display font-semibold text-alanizGold-600 mb-4">
                Condecoraciones del Año {new Date().getFullYear()}
              </h3>
            </div>
          </div>
          
          {condecoradosEsteAño.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-4xl text-alanizGold-600/30 mb-4">🏆</div>
              <p className="text-parchment-400">
                Las condecoraciones de este año se anunciarán próximamente por decisión del Consejo de la Casa.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {condecoradosEsteAño.map((condecorado) => (
                <div key={condecorado.id} className="bg-alanizGreen-900/30 rounded-lg p-5 border border-alanizGold-600/20">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-alanizGold-600/20 rounded-lg flex items-center justify-center">
                      <span className="text-alanizGold-600 text-lg">🏆</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-display font-bold text-alanizGold-500 mb-2">
                        {condecorado.nombre}
                      </h4>
                      <div className="flex items-center space-x-2 mb-3">
                        <span className="inline-flex items-center px-3 py-1 bg-alanizGold-600/20 rounded-full text-sm font-medium text-alanizGold-400">
                          {condecorado.condecoracion === 'gran-cruz' ? 'Gran Cruz de la Distinción Alaniz' : 'Cruz del Honor y el Mérito'}
                        </span>
                      </div>
                      <p className="text-parchment-200 text-sm leading-relaxed italic pl-4 border-l-2 border-alanizGold-600/30">
                        "{condecorado.motivo}"
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Galería de fotos */}
        <div className="card-elegant observe-me opacity-0 translate-y-8 mb-12" 
             style={{ animationDelay: '1000ms' }}>
          <div className="flex items-start space-x-6 mb-6">
            <div className="flex-shrink-0">
              <div className="inline-flex items-center justify-center w-14 h-14 
                              bg-gradient-to-r from-green-500 to-green-600 rounded-full shadow-lg">
                <span className="text-white text-xl">📸</span>
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-display font-semibold text-alanizGold-600 mb-4">
                Galería de Celebraciones
              </h3>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {fotosGaleria.map((foto) => (
              <div 
                key={foto.id} 
                className="group cursor-pointer"
                onClick={() => setSelectedPhoto(foto)}
              >
                <div className="aspect-square bg-alanizGreen-800/50 rounded-lg overflow-hidden 
                                border-2 border-alanizGold-600/20 group-hover:border-alanizGold-600/60 
                                transition-all duration-300 group-hover:scale-105 shadow-lg">
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center text-alanizGold-600/60">
                      <div className="text-4xl mb-2">📷</div>
                      <div className="text-sm font-medium">{foto.evento}</div>
                      <div className="text-xs text-parchment-400">{foto.año}</div>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-parchment-300 mt-2 text-center px-2">
                  {foto.descripcion}
                </p>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-6">
            <p className="text-parchment-400 text-sm">
              📷 Las fotografías de las celebraciones se subirán tras cada evento anual
            </p>
          </div>
        </div>

        {/* Modal de foto ampliada */}
        {selectedPhoto && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
               onClick={() => setSelectedPhoto(null)}>
            <div className="bg-alanizGreen-900 rounded-lg p-6 max-w-2xl w-full">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-display font-bold text-alanizGold-600">
                  {selectedPhoto.evento} - {selectedPhoto.año}
                </h3>
                <button
                  onClick={() => setSelectedPhoto(null)}
                  className="text-alanizGold-600 hover:text-alanizGold-500 text-2xl"
                >
                  ✕
                </button>
              </div>
              <div className="aspect-video bg-alanizGreen-800/50 rounded-lg mb-4 flex items-center justify-center">
                <div className="text-center text-alanizGold-600/60">
                  <div className="text-6xl mb-4">📷</div>
                  <div className="text-lg">{selectedPhoto.evento}</div>
                </div>
              </div>
              <p className="text-parchment-300">
                {selectedPhoto.descripcion}
              </p>
            </div>
          </div>
        )}

        {/* Mensaje final */}
        <div className="text-center observe-me opacity-0 translate-y-8" 
             style={{ animationDelay: '1200ms' }}>
          <div className="bg-alanizGreen-800/50 rounded-xl p-8 border border-alanizGold-600/20 
                          backdrop-blur-sm shadow-elegant">
            <blockquote className="text-xl md:text-2xl font-display italic text-alanizGold-600 mb-4">
              "En el Día de la Casa, la memoria arde más fuerte que nunca. 
              Unidos en honor, proyectados hacia la eternidad."
            </blockquote>
            <cite className="text-parchment-400 text-sm">
              — Lema del Día de la Casa Alaniz
            </cite>
          </div>
        </div>

      </div>
    </div>
  );
}
