import React, { useState, useEffect } from 'react';

interface Condecorado {
  id: string;
  nombre: string;
  fechaOtorgamiento: string;
  motivo: string;
  condecoracion: string;
}

interface Condecoracion {
  id: string;
  nombre: string;
  fundamento: string;
  motivo: string;
  descripcion: string;
  imagen: string;
  orden: number;
}

const condecoraciones: Condecoracion[] = [
  {
    id: 'gran-cruz',
    nombre: 'Gran Cruz de la Distinción Alaniz',
    fundamento: 'Instituida por decreto solemne del Señor de la Casa Alaniz, la Gran Cruz de la Distinción Alaniz nace como símbolo de gratitud perpetua hacia aquellos cuyo proceder ha reforzado, de manera visible y constante, el honor, la integridad y la proyección de este linaje. Su concesión reconoce no solo los actos, sino también la disposición noble de quien, por voluntad propia, ha tejido lazos indelebles con la Casa.',
    motivo: 'Se otorga exclusivamente a personas cuya trayectoria haya evidenciado una contribución singular al engrandecimiento moral, social o cultural de la Casa Alaniz. Comprende tanto servicios prestados en situaciones de relevancia como gestos de lealtad que, por su constancia y sinceridad, merezcan quedar inscritos en la memoria oficial del linaje.',
    descripcion: 'La cruz, esmaltada en negro profundo con bordes dorados, representa la dignidad y la autoridad que la Casa Alaniz otorga a quienes se distinguen. La corona central, labrada en metal noble, simboliza el reconocimiento supremo emanado del Señor de la Casa. La cinta, en disposición vertical y tonalidades sobrias, alude a la rectitud, la permanencia y el carácter solemne de este honor.',
    imagen: '/images/condecoraciones/GranCruz.png',
    orden: 1
  },
  {
    id: 'cruz-honor-merito',
    nombre: 'Cruz del Honor y el Mérito',
    fundamento: 'Creada como segunda distinción en orden de precedencia, la Cruz del Honor y el Mérito es una condecoración destinada a destacar la conducta ejemplar, la integridad personal y el compromiso inquebrantable con los valores que la Casa Alaniz preserva desde generaciones. No es una recompensa material, sino la confirmación pública de que el portador ha obrado conforme a los más altos principios.',
    motivo: 'Se concede a quienes, mediante actos voluntarios o servicios desinteresados, hayan demostrado un compromiso activo y constante en beneficio de la Casa o de su comunidad cercana, siempre en concordancia con los valores de honor, respeto y nobleza que definen al linaje Alaniz.',
    descripcion: 'Su diseño presenta una cruz esmaltada en blanco marfil, cuyos brazos se extienden con firmeza en las cuatro direcciones, simbolizando la proyección de la virtud en todos los ámbitos de la vida. En el centro, una estrella dorada recuerda que los principios rectores deben brillar incluso en la oscuridad. La cinta combina tonos cálidos y terrosos, evocando la raíz y la fortaleza que unen a las personas de recto proceder.',
    imagen: '/images/condecoraciones/HonoryMerito.png',
    orden: 2
  }
];

export default function Condecoraciones() {
  const [condecorados, setCondecorados] = useState<Condecorado[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    fechaOtorgamiento: '',
    motivo: '',
    condecoracion: ''
  });

  useEffect(() => {
    // Verificar si el usuario es admin
    const adminAuth = localStorage.getItem('alanizAuth');
    const userType = localStorage.getItem('alanizUserType');
    setIsAdmin(adminAuth === 'true' && userType === 'admin');

    // Cargar condecorados existentes
    const savedCondecorados = localStorage.getItem('alanizCondecorados');
    if (savedCondecorados) {
      setCondecorados(JSON.parse(savedCondecorados));
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nombre || !formData.fechaOtorgamiento || !formData.motivo || !formData.condecoracion) {
      alert('Todos los campos son obligatorios');
      return;
    }

    const nuevoCondecorado: Condecorado = {
      id: Date.now().toString(),
      nombre: formData.nombre,
      fechaOtorgamiento: formData.fechaOtorgamiento,
      motivo: formData.motivo,
      condecoracion: formData.condecoracion
    };

    const nuevosCondecorados = [...condecorados, nuevoCondecorado];
    setCondecorados(nuevosCondecorados);
    localStorage.setItem('alanizCondecorados', JSON.stringify(nuevosCondecorados));

    // Limpiar formulario
    setFormData({ nombre: '', fechaOtorgamiento: '', motivo: '', condecoracion: '' });
    setShowForm(false);
    alert('Condecorado añadido exitosamente');
  };

  const handleDelete = (id: string) => {
    if (!confirm('¿Estás seguro de eliminar este condecorado?')) return;

    const nuevosCondecorados = condecorados.filter(c => c.id !== id);
    setCondecorados(nuevosCondecorados);
    localStorage.setItem('alanizCondecorados', JSON.stringify(nuevosCondecorados));
  };

  const getCondecoracionName = (id: string) => {
    return condecoraciones.find(c => c.id === id)?.nombre || id;
  };

  const getCondecoradosPorCondecoracion = (condecoracionId: string) => {
    return condecorados.filter(c => c.condecoracion === condecoracionId);
  };

  return (
    <div className="min-h-screen bg-alanizGreen-950 py-8">
      <div className="content-container">
        
        {/* Header */}
        <div className="card-elegant mb-8">
          <div className="text-center">
            <div className="flex justify-center items-center space-x-4 mb-4">
              <span className="text-4xl">🏆</span>
              <span className="text-5xl">👑</span>
              <span className="text-4xl">⭐</span>
            </div>
            <h1 className="text-4xl font-display font-bold text-alanizGold-600 mb-4">
              Condecoraciones de la Casa Alaniz
            </h1>
            <p className="text-lg text-parchment-300 max-w-3xl mx-auto">
              Distinciones otorgadas en reconocimiento a quienes han demostrado valores excepcionales 
              de honor, lealtad y servicio, contribuyendo al engrandecimiento del linaje Alaniz.
            </p>
          </div>
        </div>

        {/* Panel de administración - Solo visible para admins */}
        {isAdmin && (
          <div className="card-elegant mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <Shield className="w-6 h-6 text-alanizGold-600" />
                <h2 className="text-xl font-display font-bold text-alanizGold-600">
                  Panel de Administración
                </h2>
              </div>
              <button
                onClick={() => setShowForm(!showForm)}
                className="btn-alaniz flex items-center space-x-2"
              >
                <span className="text-lg">➕</span>
                <span>Añadir Condecorado</span>
              </button>
            </div>

            {showForm && (
              <div className="bg-alanizGreen-900/30 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-alanizGold-600 mb-4">
                  Nuevo Condecorado
                </h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-alanizGold-600 mb-2">
                        Nombre completo
                      </label>
                      <input
                        type="text"
                        value={formData.nombre}
                        onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                        className="w-full px-3 py-2 bg-alanizGreen-800/50 border border-alanizGold-600/30 
                                   rounded-lg text-parchment-100 placeholder-parchment-400
                                   focus:border-alanizGold-600"
                        placeholder="Don Fernando de Castilla"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-alanizGold-600 mb-2">
                        Fecha de otorgamiento
                      </label>
                      <input
                        type="date"
                        value={formData.fechaOtorgamiento}
                        onChange={(e) => setFormData({...formData, fechaOtorgamiento: e.target.value})}
                        className="w-full px-3 py-2 bg-alanizGreen-800/50 border border-alanizGold-600/30 
                                   rounded-lg text-parchment-100 focus:border-alanizGold-600"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-alanizGold-600 mb-2">
                      Condecoración otorgada
                    </label>
                    <select
                      value={formData.condecoracion}
                      onChange={(e) => setFormData({...formData, condecoracion: e.target.value})}
                      className="w-full px-3 py-2 bg-alanizGreen-800/50 border border-alanizGold-600/30 
                                 rounded-lg text-parchment-100 focus:border-alanizGold-600"
                      required
                    >
                      <option value="">Seleccionar condecoración</option>
                      {condecoraciones.map(condecoracion => (
                        <option key={condecoracion.id} value={condecoracion.id}>
                          {condecoracion.nombre}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-alanizGold-600 mb-2">
                      Motivo del otorgamiento
                    </label>
                    <textarea
                      value={formData.motivo}
                      onChange={(e) => setFormData({...formData, motivo: e.target.value})}
                      rows={3}
                      className="w-full px-3 py-2 bg-alanizGreen-800/50 border border-alanizGold-600/30 
                                 rounded-lg text-parchment-100 placeholder-parchment-400
                                 focus:border-alanizGold-600 resize-none"
                      placeholder="Descripción del motivo por el cual se otorga la condecoración..."
                      required
                    />
                  </div>

                  <div className="flex space-x-4">
                    <button
                      type="submit"
                      className="btn-alaniz"
                    >
                      Añadir Condecorado
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowForm(false)}
                      className="btn-secondary"
                    >
                      Cancelar
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        )}

        {/* Lista de condecoraciones */}
        <div className="space-y-8">
          {condecoraciones.map((condecoracion) => (
            <div key={condecoracion.id} className="card-elegant">
              <div className="grid lg:grid-cols-3 gap-8">
                
                {/* Imagen de la condecoración */}
                <div className="lg:col-span-1">
                  <div className="text-center">
                    <div className="w-64 h-64 mx-auto mb-4 bg-alanizGreen-900/30 rounded-lg flex items-center justify-center overflow-hidden">
                      <img
                        src={condecoracion.imagen}
                        alt={condecoracion.nombre}
                        className="max-w-full max-h-full object-contain"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const parent = target.parentElement;
                          if (parent) {
                            parent.innerHTML = '<span class="text-6xl">👑</span>';
                          }
                        }}
                      />
                    </div>
                    <h2 className="text-2xl font-display font-bold text-alanizGold-600 mb-2">
                      {condecoracion.nombre}
                    </h2>
                    <div className="inline-flex items-center px-3 py-1 bg-alanizGold-600/20 rounded-full">
                      <span className="text-sm font-medium text-alanizGold-600">
                        Orden {condecoracion.orden}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Información de la condecoración */}
                <div className="lg:col-span-2 space-y-6">
                  
                  <div>
                    <h3 className="text-lg font-display font-semibold text-alanizGold-600 mb-3">
                      Fundamento Histórico
                    </h3>
                    <p className="text-parchment-200 leading-relaxed">
                      {condecoracion.fundamento}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-display font-semibold text-alanizGold-600 mb-3">
                      Motivo de Concesión
                    </h3>
                    <p className="text-parchment-200 leading-relaxed">
                      {condecoracion.motivo}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-display font-semibold text-alanizGold-600 mb-3">
                      Descripción Simbólica
                    </h3>
                    <p className="text-parchment-200 leading-relaxed">
                      {condecoracion.descripcion}
                    </p>
                  </div>

                  {/* Lista de condecorados */}
                  <div>
                    <h3 className="text-lg font-display font-semibold text-alanizGold-600 mb-3">
                      Condecorados
                    </h3>
                    {getCondecoradosPorCondecoracion(condecoracion.id).length === 0 ? (
                      <p className="text-parchment-400 italic">
                        Aún no se han otorgado condecoraciones de este tipo.
                      </p>
                    ) : (
                      <div className="space-y-6">
                        {getCondecoradosPorCondecoracion(condecoracion.id).map((condecorado) => (
                          <div key={condecorado.id} className="bg-alanizGreen-900/30 rounded-lg p-5 border border-alanizGold-600/20">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <h4 className="text-xl font-display font-bold text-alanizGold-500 mb-2">
                                  {condecorado.nombre}
                                </h4>
                                <div className="flex items-center space-x-2 mb-3">
                                  <span className="inline-flex items-center px-2 py-1 bg-alanizGold-600/20 rounded-full text-xs font-medium text-alanizGold-400">
                                    {new Date(condecorado.fechaOtorgamiento).toLocaleDateString('es-ES', {
                                      year: 'numeric',
                                      month: 'long',
                                      day: 'numeric'
                                    })}
                                  </span>
                                </div>
                                <p className="text-parchment-200 text-sm leading-relaxed italic pl-4 border-l-2 border-alanizGold-600/30">
                                  "{condecorado.motivo}"
                                </p>
                              </div>
                              {isAdmin && (
                                <button
                                  onClick={() => handleDelete(condecorado.id)}
                                  className="ml-6 p-2 text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded-lg transition-colors"
                                  title="Eliminar condecorado"
                                >
                                  <span className="text-sm">🗑️</span>
                                </button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
