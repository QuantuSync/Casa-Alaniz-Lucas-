import React, { useEffect, useState } from 'react';

// Interfaz para el contador
interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

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
  const [condecorados, setCondecorados] = useState<any[]>([]);
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Función para calcular el tiempo restante
  const calculateTimeRemaining = (): TimeRemaining => {
    const now = new Date();
    const currentYear = now.getFullYear();
    let diaDelaCasa = new Date(currentYear, 8, 22, 10, 0, 0); // 22 de septiembre a las 10:00 AM
    
    // Si ya pasó este año, mostrar el del próximo año
    if (now > diaDelaCasa) {
      diaDelaCasa = new Date(currentYear + 1, 8, 22, 10, 0, 0);
    }
    
    const difference = diaDelaCasa.getTime() - now.getTime();
    
    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }
    
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    
    return { days, hours, minutes, seconds };
  };

  // Función para obtener próxima fecha del Día de la Casa
  const getProximaFecha = () => {
    const now = new Date();
    const currentYear = now.getFullYear();
    let diaDelaCasa = new Date(currentYear, 8, 22); // 22 de septiembre
    
    // Si ya pasó este año, mostrar el del próximo año
    if (now > diaDelaCasa) {
      diaDelaCasa = new Date(currentYear + 1, 8, 22);
    }
    
    return diaDelaCasa;
  };

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

          {/* Fecha de la celebración */}
          <div className="bg-alanizGreen-800/50 rounded-xl p-8 max-w-2xl mx-auto border border-alanizGold-600/20 mb-8">
            <h3 className="text-2xl font-display font-semibold text-alanizGold-500 mb-6 text-center">
              Fecha de la Celebración
            </h3>
            <div className="flex items-center justify-center space-x-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-alanizGold-600 mb-2">22</div>
                <div className="text-sm text-parchment-400 uppercase tracking-wider">Septiembre</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-alanizGold-600 mb-2">{proximaFecha.getFullYear()}</div>
                <div className="text-sm text-parchment-400 uppercase tracking-wider">Año</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-alanizGold-600 mb-2">10:00</div>
                <div className="text-sm text-parchment-400 uppercase tracking-wider">Inicio</div>
              </div>
            </div>
          </div>

          {/* Contador regresivo */}
          <div className="bg-gradient-to-r from-alanizGreen-800/80 to-alanizGreen-900/80 rounded-xl p-8 max-w-4xl mx-auto border-2 border-alanizGold-600/40">
            <h3 className="text-2xl font-display font-semibold text-alanizGold-500 mb-6 text-center">
              Tiempo Restante
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="bg-alanizGold-600/10 rounded-lg p-4 border border-alanizGold-600/30">
                  <div className="text-3xl md:text-4xl font-bold text-alanizGold-600 mb-2 font-mono">
                    {String(timeRemaining.days).padStart(2, '0')}
                  </div>
                  <div className="text-sm text-parchment-400 uppercase tracking-wider font-semibold">
                    Días
                  </div>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-alanizGold-600/10 rounded-lg p-4 border border-alanizGold-600/30">
                  <div className="text-3xl md:text-4xl font-bold text-alanizGold-600 mb-2 font-mono">
                    {String(timeRemaining.hours).padStart(2, '0')}
                  </div>
                  <div className="text-sm text-parchment-400 uppercase tracking-wider font-semibold">
                    Horas
                  </div>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-alanizGold-600/10 rounded-lg p-4 border border-alanizGold-600/30">
                  <div className="text-3xl md:text-4xl font-bold text-alanizGold-600 mb-2 font-mono">
                    {String(timeRemaining.minutes).padStart(2, '0')}
                  </div>
                  <div className="text-sm text-parchment-400 uppercase tracking-wider font-semibold">
                    Minutos
                  </div>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-alanizGold-600/10 rounded-lg p-4 border border-alanizGold-600/30">
                  <div className="text-3xl md:text-4xl font-bold text-alanizGold-600 mb-2 font-mono animate-pulse">
                    {String(timeRemaining.seconds).padStart(2, '0')}
                  </div>
                  <div className="text-sm text-parchment-400 uppercase tracking-wider font-semibold">
                    Segundos
                  </div>
                </div>
              </div>
            </div>
            
            {/* Mensaje especial cuando falte poco tiempo */}
            {timeRemaining.days === 0 && timeRemaining.hours === 0 && timeRemaining.minutes < 60 && (
              <div className="mt-6 text-center">
                <p className="text-alanizGold-400 font-semibold animate-pulse">
                  🎖️ ¡La celebración está a punto de comenzar! 🎖️
                </p>
              </div>
            )}
            
            {/* Mensaje cuando es el día */}
            {timeRemaining.days === 0 && timeRemaining.hours === 0 && timeRemaining.minutes === 0 && timeRemaining.seconds === 0 && (
              <div className="mt-6 text-center">
                <p className="text-alanizGold-400 font-bold text-xl animate-bounce">
                  🎉 ¡Hoy es el Día de la Casa Alaniz! 🎉
                </p>
              </div>
            )}
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

        {/* Mensaje final */}
        <div className="text-center observe-me opacity-0 translate-y-8" 
             style={{ animationDelay: '1000ms' }}>
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
