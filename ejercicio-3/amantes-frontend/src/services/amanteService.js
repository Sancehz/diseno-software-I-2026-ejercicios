const BASE_URL = 'http://localhost:3001';

/**
 * Servicio de comunicación con la API de Amantes.
 */
const amanteService = {
  /**
   * Crea un nuevo perfil de amante.
   * @param {{ nombre: string, edad: number, intereses: string[] }} data
   * @returns {Promise<Object>}
   */
  async crear(data) {
    const response = await fetch(`${BASE_URL}/amantes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const json = await response.json();
    if (!response.ok) throw new Error(json.message || 'Error al crear perfil');
    return json.data;
  },

  /**
   * Busca amantes por interés.
   * @param {string} interes
   * @returns {Promise<Object[]>}
   */
  async buscarPorInteres(interes) {
    const response = await fetch(
      `${BASE_URL}/amantes?interes=${encodeURIComponent(interes)}`
    );
    const json = await response.json();
    if (!response.ok) throw new Error(json.message || 'Error al buscar');
    return json.data;
  },
};

export default amanteService;
