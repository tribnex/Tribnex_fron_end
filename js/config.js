/* ============================================================
   Tribnex - Configuración del frontend
   ÚNICO lugar donde se define a qué backend apunta la página.
   Se carga PRIMERO en todas las páginas (antes del resto de scripts).

   - En tu PC (localhost / 127.0.0.1 / archivo local) -> backend local.
   - En internet (Netlify o tu dominio)               -> backend en Render.

   Cuando tengas dominio propio para el backend (ej. api.tudominio.com),
   cambia SOLO la URL de producción de abajo.
   ============================================================ */
const BACKEND_LOCAL = 'http://localhost:8080';
const BACKEND_PRODUCCION = 'https://tribnex-backend.onrender.com';

const ES_ENTORNO_LOCAL =
  location.protocol === 'file:' ||
  location.hostname === 'localhost' ||
  location.hostname === '127.0.0.1';

// Origen del backend (sin /api). Se usa para fotos y archivos: API_ORIGIN + '/uploads/...'
const API_ORIGIN = ES_ENTORNO_LOCAL ? BACKEND_LOCAL : BACKEND_PRODUCCION;
// Base de todas las llamadas a la API.
const API_URL = API_ORIGIN + '/api';

/**
 * Convierte la URL de un archivo guardado (foto de perfil, material de una guía)
 * en una URL lista para usar en <img>, <video> o <a>.
 * - Si ya es una URL completa (https://...supabase.co/...), se deja igual.
 * - Si es una ruta relativa (/uploads/...), se le antepone el backend.
 */
function urlArchivo(url) {
  if (!url) return '';
  const limpia = String(url).trim();
  if (/^https?:\/\//i.test(limpia)) return limpia;
  return API_ORIGIN + (limpia.startsWith('/') ? limpia : '/' + limpia);
}
