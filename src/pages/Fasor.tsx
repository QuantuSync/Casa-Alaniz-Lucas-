import React, { useEffect } from 'react';
import fasorLogo from '../assets/fasor.jpg';

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
    elementsToObserve.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen py-16">
      <div className="content-container">
        <div className="text-center mb-16 observe-me opacity-0 translate-y-8">
          <div className="inline-flex items-center justify-center w-60 h-60 bg-red-600/20 rounded-full shadow-2xl mb-8 overflow-hidden border-4 border-red-600/40">
            <img 
              src={fasorLogo} 
              alt="Logo FASOR - Fuerza de Auxilio, Soporte y Rescate" 
              className="w-full h-full object-cover"
              loading="eager"
            />
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-alanizGold-600 mb-4 tracking-wider drop-shadow-lg" style={{ fontFamily: 'Impact, "Arial Black", sans-serif' }}>
            FASOR
          </h1>
          
          <h2 className="text-2xl md:text-3xl font-display font-semibold text-alanizGold-600 mb-6">
            Fuerza de Auxilio, Soporte y Rescate
          </h2>
          
          <div className="divider-ornamental"></div>
          
          <p className="text-lg text-parchment-300 max-w-3xl mx-auto leading-relaxed mb-6">          
            La Fuerza de Auxilio, Soporte y Rescate (FASOR) nace bajo el amparo de la Casa Alaniz
            como reflejo de un deber ancestral: servir y proteger en los momentos en que la comunidad más lo necesita. 
            
            No es una idea abstracta, es una respuesta concreta a la realidad que vivimos hoy. Incendios que devoran bosques enteros, 
            inundaciones que arrasan hogares, terremotos y tormentas que ponen a prueba nuestra resistencia como sociedad.
            
            Ante un mundo cada vez más vulnerable a la fuerza de la naturaleza, surge la necesidad de contar con una 
            organización civil preparada, disciplinada y entregada, capaz de actuar con decisión en medio del caos. 
            
            FASOR representa esa voluntad: estar listos, con la mente clara y el corazón firme, 
            para llevar auxilio donde la esperanza parece desvanecerse.
            
            Más que una fuerza organizada, FASOR es un compromiso vivo con la comunidad, un recordatorio de que el verdadero poder de un linaje 
            se mide en su capacidad para proteger a los suyos y tender la mano cuando la adversidad golpea.
          </p>
          
          <div className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-full font-bold text-lg shadow-lg animate-bounce">
            <span className="w-3 h-3 bg-green-400 rounded-full mr-3 animate-ping"></span>
            OPERATIVO - EN SERVICIO
          </div>
        </div>

        <div className="max-w-5xl mx-auto space-y-12">
          <div className="card-elegant bg-gradient-to-r from-alanizGreen-800/80 to-alanizGreen-900/80 border-2 border-alanizGold-600/40 observe-me opacity-0 translate-y-8" style={{ animationDelay: '200ms' }}>
            <div className="text-center mb-8">
              <h3 className="text-3xl font-display font-bold text-alanizGold-600 mb-4">
                Misión Principal
              </h3>
              <p className="text-xl text-parchment-100 leading-relaxed">
                <strong className="text-alanizGold-400">Estar presentes allí donde la adversidad golpea</strong>, 
                ya sea en incendios, inundaciones, catástrofes naturales o emergencias que requieran 
                manos firmes y corazones preparados.
              </p>
            </div>
            
            <div className="grid md:grid-cols-4 gap-6 mt-8">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-alanizGold-600 rounded-full shadow-lg mb-4">
                  <span className="text-alanizGreen-950 text-2xl">⚖️</span>
                </div>
                <h4 className="font-display font-semibold text-alanizGold-400 mb-2">Disciplina</h4>
                <p className="text-sm text-parchment-300">Orden y método en cada actuación</p>
              </div>
              
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-alanizGold-600 rounded-full shadow-lg mb-4">
                  <span className="text-alanizGreen-950 text-2xl">🤝</span>
                </div>
                <h4 className="font-display font-semibold text-alanizGold-400 mb-2">Coordinación</h4>
                <p className="text-sm text-parchment-300">Trabajo en equipo efectivo</p>
              </div>
              
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-alanizGold-600 rounded-full shadow-lg mb-4">
                  <span className="text-alanizGreen-950 text-2xl">⚡</span>
                </div>
                <h4 className="font-display font-semibold text-alanizGold-400 mb-2">Sacrificio</h4>
                <p className="text-sm text-parchment-300">Entrega total al servicio</p>
              </div>
              
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-alanizGold-600 rounded-full shadow-lg mb-4">
                  <span className="text-alanizGreen-950 text-2xl">🛡️</span>
                </div>
                <h4 className="font-display font-semibold text-alanizGold-400 mb-2">Fidelidad</h4>
                <p className="text-sm text-parchment-300">Lealtad inquebrantable al pueblo</p>
              </div>
            </div>
          </div>

          <div className="observe-me opacity-0 translate-y-8" style={{ animationDelay: '400ms' }}>
            <h3 className="text-3xl font-display font-bold text-alanizGold-600 text-center mb-8">
              Áreas de Actuación
            </h3>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="card-elegant bg-gradient-to-br from-orange-800/60 to-red-800/60 border border-orange-600/40">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-orange-600 rounded-full">
                    <span className="text-white text-xl">🔥</span>
                  </div>
                  <h4 className="font-display font-semibold text-orange-400">
                    Incendios
                  </h4>
                </div>
                <p className="text-sm text-parchment-300">
                  Forestales y urbanos. Extinción, evacuación y protección de infraestructuras.
                </p>
              </div>
              
              <div className="card-elegant bg-gradient-to-br from-blue-800/60 to-cyan-800/60 border border-blue-600/40">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-600 rounded-full">
                    <span className="text-white text-xl">🌊</span>
                  </div>
                  <h4 className="font-display font-semibold text-blue-400">
                    Inundaciones
                  </h4>
                </div>
                <p className="text-sm text-parchment-300">
                  Rescate acuático, evacuaciones y control de daños por desbordamientos.
                </p>
              </div>
              
              <div className="card-elegant bg-gradient-to-br from-amber-800/60 to-yellow-800/60 border border-amber-600/40">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-amber-600 rounded-full">
                    <span className="text-white text-xl">⛰️</span>
                  </div>
                  <h4 className="font-display font-semibold text-amber-400">
                    Catástrofes Naturales
                  </h4>
                </div>
                <p className="text-sm text-parchment-300">
                  Terremotos, tormentas severas y eventos meteorológicos extremos.
                </p>
              </div>
              
              <div className="card-elegant bg-gradient-to-br from-red-800/60 to-pink-800/60 border border-red-600/40">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-red-600 rounded-full">
                    <span className="text-white text-xl">🚨</span>
                  </div>
                  <h4 className="font-display font-semibold text-red-400">
                    Emergencias Civiles
                  </h4>
                </div>
                <p className="text-sm text-parchment-300">
                  Accidentes, colapsos estructurales y situaciones de crisis urbana.
                </p>
              </div>
              
              <div className="card-elegant bg-gradient-to-br from-green-800/60 to-emerald-800/60 border border-green-600/40">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-green-600 rounded-full">
                    <span className="text-white text-xl">🏥</span>
                  </div>
                  <h4 className="font-display font-semibold text-green-400">
                    Apoyo Sanitario
                  </h4>
                </div>
                <p className="text-sm text-parchment-300">
                  Asistencia médica de emergencia y evacuaciones sanitarias.
                </p>
              </div>
              
              <div className="card-elegant bg-gradient-to-br from-purple-800/60 to-indigo-800/60 border border-purple-600/40">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-600 rounded-full">
                    <span className="text-white text-xl">📊</span>
                  </div>
                  <h4 className="font-display font-semibold text-purple-400">
                    Evaluación de Riesgos
                  </h4>
                </div>
                <p className="text-sm text-parchment-300">
                  Análisis previo de situaciones y planificación de respuesta.
                </p>
              </div>
            </div>
          </div>

          <div className="card-elegant observe-me opacity-0 translate-y-8" style={{ animationDelay: '600ms' }}>
            <div className="flex items-start space-x-6 mb-6">
              <div className="flex-shrink-0">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-r from-alanizGold-500 to-alanizGold-600 rounded-full shadow-lg">
                  <span className="text-alanizGreen-950 text-xl">⚔️</span>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-display font-semibold text-alanizGold-600 mb-4">
                  Estructura Organizativa
                </h3>
                <p className="text-parchment-200 leading-relaxed">
                  La Fuerza de Auxilio, Soporte y Rescate Casa Alaniz se organiza bajo principios 
                  de disciplina, responsabilidad y servicio. Cada nivel jerárquico tiene una función clara, 
                  garantizando que la misión se cumpla con eficacia en cualquier circunstancia.
                </p>
              </div>
            </div>
            
            <div className="space-y-6 mt-8">
              <h4 className="text-xl font-display font-semibold text-alanizGold-500 mb-4">
                Jerarquía y Rangos
              </h4>
              
              <div className="space-y-4">
                <div className="bg-alanizGold-600/10 rounded-lg p-4 border-l-4 border-alanizGold-600">
                  <h5 className="font-display font-semibold text-alanizGold-500 mb-2">
                    🏛️ Comandancia de la Casa Alaniz
                  </h5>
                  <p className="text-sm text-parchment-300">
                    Órgano rector que marca las directrices estratégicas y vela por la fidelidad 
                    a los principios fundacionales.
                  </p>
                </div>
                
                <div className="bg-alanizGold-600/10 rounded-lg p-4 border-l-4 border-alanizGold-600">
                  <h5 className="font-display font-semibold text-alanizGold-500 mb-2">
                    👨‍✈️ Oficiales de Coordinación
                  </h5>
                  <p className="text-sm text-parchment-300">
                    Responsables de dirigir las operaciones sobre el terreno y coordinar 
                    recursos humanos y materiales.
                  </p>
                </div>
                
                <div className="bg-alanizGold-600/10 rounded-lg p-4 border-l-4 border-alanizGold-600">
                  <h5 className="font-display font-semibold text-alanizGold-500 mb-2">
                    🎓 Instructores Especializados
                  </h5>
                  <p className="text-sm text-parchment-300">
                    Encargados de la formación técnica y el entrenamiento continuo de los miembros.
                  </p>
                </div>
                
                <div className="bg-alanizGold-600/10 rounded-lg p-4 border-l-4 border-alanizGold-600">
                  <h5 className="font-display font-semibold text-alanizGold-500 mb-2">
                    🚁 Secciones de Intervención
                  </h5>
                  <p className="text-sm text-parchment-300">
                    Unidades especializadas, cada una con un oficial al mando, preparadas 
                    para actuar de manera rápida y precisa.
                  </p>
                </div>
                
                <div className="bg-alanizGold-600/10 rounded-lg p-4 border-l-4 border-alanizGold-600">
                  <h5 className="font-display font-semibold text-alanizGold-500 mb-2">
                    👥 Pelotones de Auxilio
                  </h5>
                  <p className="text-sm text-parchment-300">
                    La fuerza operativa básica, integrada por miembros capacitados en tareas 
                    de rescate, apoyo y asistencia.
                  </p>
                </div>
                
                <div className="bg-alanizGold-600/10 rounded-lg p-4 border-l-4 border-alanizGold-600">
                  <h5 className="font-display font-semibold text-alanizGold-500 mb-2">
                    📦 Cuerpo de Apoyo y Logística
                  </h5>
                  <p className="text-sm text-parchment-300">
                    Encargados de garantizar suministros, transporte, comunicaciones 
                    y sostenimiento de las operaciones.
                  </p>
                </div>
                
                <div className="bg-alanizGold-600/10 rounded-lg p-4 border-l-4 border-alanizGold-600">
                  <h5 className="font-display font-semibold text-alanizGold-500 mb-2">
                    🛡️ Reservistas
                  </h5>
                  <p className="text-sm text-parchment-300">
                    Miembros experimentados en standby, disponibles para refuerzo en operaciones 
                    de gran envergadura.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="card-elegant observe-me opacity-0 translate-y-8" style={{ animationDelay: '800ms' }}>
            <h3 className="text-2xl font-display font-semibold text-alanizGold-600 mb-6">
              Especialidades
            </h3>
            <p className="text-parchment-200 leading-relaxed mb-6">
              Cada miembro puede formarse en una o varias áreas de especialización, lo que permite 
              desplegar equipos versátiles y autosuficientes:
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="bg-alanizGreen-900/50 rounded-lg p-4 border border-alanizGold-600/30">
                  <h5 className="font-display font-semibold text-alanizGold-500 mb-2 flex items-center">
                    <span className="mr-2">🏗️</span>
                    Ingeniería y Fortificaciones de Emergencia
                  </h5>
                  <p className="text-sm text-parchment-300">
                    Construcción de pasos temporales, apuntalamientos y estructuras seguras.
                  </p>
                </div>
                
                <div className="bg-alanizGreen-900/50 rounded-lg p-4 border border-alanizGold-600/30">
                  <h5 className="font-display font-semibold text-alanizGold-500 mb-2 flex items-center">
                    <span className="mr-2">🚛</span>
                    Rescate y Movilidad Terrestre
                  </h5>
                  <p className="text-sm text-parchment-300">
                    Apertura de rutas, búsqueda de desaparecidos y extracción en terrenos complicados.
                  </p>
                </div>
                
                <div className="bg-alanizGreen-900/50 rounded-lg p-4 border border-alanizGold-600/30">
                  <h5 className="font-display font-semibold text-alanizGold-500 mb-2 flex items-center">
                    <span className="mr-2">🌪️</span>
                    Gestión de Catástrofes Naturales
                  </h5>
                  <p className="text-sm text-parchment-300">
                    Refuerzo en incendios, control de inundaciones y protección de infraestructuras críticas.
                  </p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="bg-alanizGreen-900/50 rounded-lg p-4 border border-alanizGold-600/30">
                  <h5 className="font-display font-semibold text-alanizGold-500 mb-2 flex items-center">
                    <span className="mr-2">⛑️</span>
                    Asistencia Sanitaria de Emergencia
                  </h5>
                  <p className="text-sm text-parchment-300">
                    Primeros auxilios, estabilización de heridos y evacuaciones sanitarias.
                  </p>
                </div>
                
                <div className="bg-alanizGreen-900/50 rounded-lg p-4 border border-alanizGold-600/30">
                  <h5 className="font-display font-semibold text-alanizGold-500 mb-2 flex items-center">
                    <span className="mr-2">📡</span>
                    Logística y Comunicaciones
                  </h5>
                  <p className="text-sm text-parchment-300">
                    Transporte de materiales, coordinación tecnológica y apoyo prolongado en operaciones.
                  </p>
                </div>
                
                <div className="bg-alanizGreen-900/50 rounded-lg p-4 border border-alanizGold-600/30">
                  <h5 className="font-display font-semibold text-alanizGold-500 mb-2 flex items-center">
                    <span className="mr-2">🤝</span>
                    Coordinación Interinstitucional
                  </h5>
                  <p className="text-sm text-parchment-300">
                    Enlace con bomberos, protección civil y otras fuerzas de emergencia.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="card-elegant observe-me opacity-0 translate-y-8" style={{ animationDelay: '1000ms' }}>
            <h3 className="text-2xl font-display font-semibold text-alanizGold-600 mb-6">
              Entrenamiento y Preparación
            </h3>
            <p className="text-parchment-200 leading-relaxed mb-6">
              La preparación de los miembros se centra en la constancia y la excelencia. 
              El entrenamiento combina resistencia física, fortaleza moral y pericia técnica.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-alanizGreen-900/50 rounded-lg p-6 border border-alanizGold-600/30">
                <div className="text-center mb-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-alanizGold-600 rounded-full mb-3">
                    <span className="text-alanizGreen-950 text-xl">💪</span>
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
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-alanizGold-600 rounded-full mb-3">
                    <span className="text-alanizGreen-950 text-xl">🛠️</span>
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
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-alanizGold-600 rounded-full mb-3">
                    <span className="text-alanizGreen-950 text-xl">🧠</span>
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
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start space-x-3">
                  <span className="text-alanizGold-400 mt-1">🏃‍♂️</span>
                  <div>
                    <h5 className="font-semibold text-alanizGold-500 text-sm">Simulacros Coordinados</h5>
                    <p className="text-xs text-parchment-300">
                      Ejercicios periódicos que integran todas las especialidades
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <span className="text-alanizGold-400 mt-1">🎖️</span>
                  <div>
                    <h5 className="font-semibold text-alanizGold-500 text-sm">Certificaciones Oficiales</h5>
                    <p className="text-xs text-parchment-300">
                      Reconocimiento externo de competencias adquiridas
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <span className="text-alanizGold-400 mt-1">🔄</span>
                  <div>
                    <h5 className="font-semibold text-alanizGold-500 text-sm">Intercambio de Conocimientos</h5>
                    <p className="text-xs text-parchment-300">
                      Colaboración con otras fuerzas para aprendizaje continuo
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <span className="text-alanizGold-400 mt-1">⏱️</span>
                  <div>
                    <h5 className="font-semibold text-alanizGold-500 text-sm">Protocolos de Activación</h5>
                    <p className="text-xs text-parchment-300">
                      Tiempos de respuesta optimizados y niveles de alerta
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="card-elegant bg-gradient-to-r from-orange-200/20 to-orange-300/30 border-2 border-orange-400/40 observe-me opacity-0 translate-y-8" style={{ animationDelay: '1200ms' }}>
            <h3 className="text-2xl font-display font-semibold text-alanizGold-600 mb-6">
              Protocolo de Activación
            </h3>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-600 rounded-full shadow-lg mb-4">
                  <span className="text-white text-xl font-bold">1</span>
                </div>
                <h4 className="font-display font-semibold text-green-400 mb-2">Nivel Verde</h4>
                <p className="text-sm text-parchment-300">
                  <strong>Alerta Preventiva</strong><br/>
                  Monitoreo y preparación.<br/>
                  Tiempo de activación: 2-4 horas
                </p>
              </div>
              
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-600 rounded-full shadow-lg mb-4">
                  <span className="text-white text-xl font-bold">2</span>
                </div>
                <h4 className="font-display font-semibold text-amber-400 mb-2">Nivel Ámbar</h4>
                <p className="text-sm text-parchment-300">
                  <strong>Emergencia Moderada</strong><br/>
                  Despliegue parcial.<br/>
                  Tiempo de activación: 30-60 min
                </p>
              </div>
              
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-red-600 rounded-full shadow-lg mb-4 animate-pulse">
                  <span className="text-white text-xl font-bold">3</span>
                </div>
                <h4 className="font-display font-semibold text-red-400 mb-2">Nivel Rojo</h4>
                <p className="text-sm text-parchment-300">
                  <strong>Emergencia Crítica</strong><br/>
                  Movilización total.<br/>
                  Tiempo de activación: 10-15 min
                </p>
              </div>
            </div>
          </div>

          <div className="card-elegant observe-me opacity-0 translate-y-8" style={{ animationDelay: '1400ms' }}>
            <h3 className="text-2xl font-display font-semibold text-alanizGold-600 mb-6">
              Principios Operativos
            </h3>
            
            <div className="space-y-6">
              <div className="bg-alanizGreen-900/50 rounded-lg p-6 border border-alanizGold-600/30">
                <h4 className="font-display font-semibold text-alanizGold-500 mb-3 flex items-center">
                  <span className="mr-3 text-2xl">⚡</span>
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
                  <span className="mr-3 text-2xl">🤝</span>
                  Colaboración Institucional
                </h4>
                <p className="text-parchment-200 text-sm leading-relaxed">
                  La cooperación con instituciones públicas y privadas es fundamental. FASOR actúa 
                  como fuerza de apoyo complementaria, nunca en competencia, fortaleciendo la red 
                  de protección civil existente.
                </p>
              </div>
              
              <div className="bg-alanizGreen-900/50 rounded-lg p-6 border border-alanizGold-600/30">
                <h4 className="font-display font-semibold text-alanizGold-500 mb-3 flex items-center">
                  <span className="mr-3 text-2xl">🎯</span>
                  Eficacia y Profesionalidad
                </h4>
                <p className="text-parchment-200 text-sm leading-relaxed">
                  Cada intervención se ejecuta con método y precisión. La preparación continua y 
                  el entrenamiento especializado garantizan que cada miembro de FASOR pueda actuar 
                  con la máxima eficacia cuando la situación lo requiera.
                </p>
              </div>
            </div>
          </div>

          <div className="card-elegant bg-gradient-to-r from-alanizGreen-800/80 to-alanizGreen-900/80 border-2 border-alanizGold-600/40 observe-me opacity-0 translate-y-8" style={{ animationDelay: '1600ms' }}>
            <div className="flex items-start space-x-6 mb-6">
              <div className="flex-shrink-0">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-r from-alanizGold-500 to-alanizGold-600 rounded-full shadow-lg">
                  <span className="text-alanizGreen-950 text-xl">❤️</span>
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
                En cada intervención, la Fuerza de Auxilio, Soporte y Rescate busca ser más que un grupo 
                de apoyo: aspira a convertirse en un <strong className="text-alanizGold-400">referente de confianza</strong>, 
                capaz de inspirar seguridad en quienes nos ven actuar y esperanza en quienes reciben nuestra ayuda.
              </p>
              <p>
                La Casa Alaniz entiende que el verdadero poder de un linaje no reside en títulos vacíos 
                o recuerdos estáticos, <strong className="text-alanizGold-400">reside en la capacidad de responder 
                con eficacia cuando más se le necesita</strong>. Por ello, FASOR es, al mismo tiempo, 
                un deber histórico y una promesa de futuro.
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
                  <span className="mr-3">🔥</span>
                  DISCIPLINA • VALOR • SERVICIO
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-16 observe-me opacity-0 translate-y-8" style={{ animationDelay: '1800ms' }}>
            <div className="bg-red-800/50 rounded-xl p-8 border border-red-600/20 backdrop-blur-sm shadow-elegant">
              <blockquote className="text-xl md:text-2xl font-display italic text-red-400 mb-4">
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
