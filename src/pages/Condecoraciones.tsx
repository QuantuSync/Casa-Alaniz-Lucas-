import { Trophy, Crown, Star } from 'lucide-react';
import { condecorados } from '../data/condecorados';

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
    fundamento:
      'Instituida por el Señor de la Casa Alaniz, la Gran Cruz de la Distinción Alaniz es la máxima distinción de la Casa. Reconoce a quienes, de forma constante, han contribuido a su prestigio y han mantenido un vínculo cercano con ella.',
    motivo:
      'Se concede a personas cuya trayectoria suponga una contribución destacada a la Casa Alaniz, ya sea por servicios prestados en momentos relevantes o por una lealtad sostenida en el tiempo.',
    descripcion:
      'La cruz, esmaltada en negro con bordes dorados, representa la dignidad del reconocimiento que otorga la Casa. La corona central simboliza que la distinción procede del Señor de la Casa. La cinta, vertical y de tonos sobrios, alude a la rectitud y el carácter formal del honor.',
    imagen: '/images/condecoraciones/GranCruz.png',
    orden: 1,
  },
  {
    id: 'cruz-honor-merito',
    nombre: 'Cruz del Honor y el Mérito',
    fundamento:
      'Segunda distinción en orden de precedencia, la Cruz del Honor y el Mérito reconoce la conducta ejemplar, la integridad y el compromiso con los valores de la Casa Alaniz. No es una recompensa material, sino un reconocimiento público a quien ha obrado conforme a esos principios.',
    motivo:
      'Se concede a quienes, mediante actos voluntarios o servicios desinteresados, hayan mostrado un compromiso constante con la Casa o con su comunidad cercana, en concordancia con los valores de honor y respeto de la Casa Alaniz.',
    descripcion:
      'Una cruz esmaltada en blanco marfil, con los brazos extendidos en las cuatro direcciones. En el centro, una estrella dorada. La cinta combina tonos cálidos y terrosos, en alusión al arraigo y la firmeza.',
    imagen: '/images/condecoraciones/HonoryMerito.png',
    orden: 2,
  },
];

export default function Condecoraciones() {
  const getCondecoradosPorCondecoracion = (condecoracionId: string) => {
    return condecorados.filter((c) => c.condecoracion === condecoracionId);
  };

  return (
    <div className="min-h-screen bg-alanizGreen-950 py-16 md:py-24">
      <div className="content-container">
        {/* Header */}
        <div className="card-elegant mb-8">
          <div className="stack-centered">
            <div className="flex justify-center items-center space-x-4 mb-4">
              <Trophy className="w-8 h-8 text-alanizGold-600" aria-hidden="true" />
              <Crown className="w-12 h-12 text-alanizGold-600" aria-hidden="true" />
              <Star className="w-8 h-8 text-alanizGold-600" aria-hidden="true" />
            </div>
            <h1 className="text-4xl font-display font-bold text-alanizGold-600 mb-4">
              Condecoraciones de la Casa Alaniz
            </h1>
            <p className="text-lg text-parchment-300 max-w-3xl mx-auto">
              Distinciones que la Casa Alaniz otorga a quienes han destacado por su honor, lealtad y
              servicio.
            </p>
          </div>
        </div>

        {/* Lista de condecoraciones */}
        <div className="space-y-8">
          {condecoraciones.map((condecoracion) => (
            <div key={condecoracion.id} className="card-elegant">
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Imagen de la condecoración */}
                <div className="lg:col-span-1">
                  <div className="text-center">
                    <div className="w-64 h-64 mx-auto mb-4 bg-stone-50 rounded-lg flex items-center justify-center overflow-hidden border-4 border-yellow-400 shadow-lg">
                      <img
                        src={condecoracion.imagen}
                        alt={condecoracion.nombre}
                        className="max-w-full max-h-full object-contain"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const parent = target.parentElement;
                          if (parent) {
                            parent.innerHTML =
                              '<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-alanizGold-600" aria-hidden="true"><path d="M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z"/><path d="M5 21h14"/></svg>';
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
                    <p className="text-parchment-200 leading-relaxed">{condecoracion.fundamento}</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-display font-semibold text-alanizGold-600 mb-3">
                      Motivo de Concesión
                    </h3>
                    <p className="text-parchment-200 leading-relaxed">{condecoracion.motivo}</p>
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
                          <div
                            key={condecorado.id}
                            className="bg-alanizGreen-900/30 rounded-lg p-5 border border-alanizGold-600/20"
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <h4 className="text-xl font-display font-bold text-alanizGold-500 mb-2">
                                  {condecorado.nombre}
                                </h4>
                                <div className="flex items-center space-x-2 mb-3">
                                  <span className="inline-flex items-center px-2 py-1 bg-alanizGold-600/20 rounded-full text-xs font-medium text-alanizGold-400">
                                    {new Date(condecorado.fecha_otorgamiento).toLocaleDateString(
                                      'es-ES',
                                      {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                      }
                                    )}
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
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
