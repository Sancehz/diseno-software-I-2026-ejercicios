const { PartesService } = require('../services/PartesService');
const response = require('../utils/response');

/**
 * Lambda Handler: GET /partes
 * Lista partes del marketplace, opcionalmente filtrando por tipo.
 *
 * Query params opcionales:
 *   ?tipo=motor          → Filtra por tipo
 *
 * Ejemplos:
 *   GET /partes              → Todas las partes
 *   GET /partes?tipo=motor   → Solo partes de tipo "motor"
 *   GET /partes?tipo=frenos  → Solo partes de tipo "frenos"
 */
exports.handler = async (event) => {
  console.log('[listarPartes] Evento recibido:', JSON.stringify(event));

  const queryParams = event.queryStringParameters || {};
  const tipo = queryParams.tipo || null;

  try {
    const resultado = await PartesService.consultarPartes(tipo);

    const mensajeFiltro = tipo
      ? `Partes de tipo "${tipo}"`
      : 'Todas las partes disponibles';

    return response.ok({
      mensaje: mensajeFiltro,
      total: resultado.total,
      partes: resultado.partes,
    });
  } catch (error) {
    console.error('[listarPartes] Error:', error);
    return response.serverError('No se pudo consultar las partes.');
  }
};
