// Condecorados (personas premiadas) de la Casa Alaniz.
// Antes se cargaban desde Supabase; ahora son datos estáticos servidos con la web.
// Para añadir un condecorado, agrega un objeto a este array.
//   - `condecoracion` debe ser el id de una condecoración: 'gran-cruz' | 'cruz-honor-merito'
//   - `fecha_otorgamiento` en formato ISO (p. ej. '2025-09-22')

export interface Condecorado {
  id: string;
  nombre: string;
  fecha_otorgamiento: string;
  motivo: string;
  condecoracion: string;
  created_at?: string;
}

export const condecorados: Condecorado[] = [];
