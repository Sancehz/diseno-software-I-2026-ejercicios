const { PartesService } = require('../services/PartesService');
const response = require('../utils/response');

/**
 * Lambda Handler: POST /partes
 * Registra una nueva parte de moto en el marketplace.
 *
 * Body esperado:
 * {
 *   "nombre": "Carburador Keihin 32mm",
 *   "tipo": "motor",
 *   "precio": 85.00,
 *   "descripcion": "Carburador para motos 125-150cc" (opcional)
 * }
 */
exports.handler = async (event) => {
  console.log('[crearParte] Evento recibido:', JSON.stringify(event));

  let body;
  try {
    body = JSON.parse(event.body || '{}');
  } catch {
    return response.badRequest('El cuerpo de la solicitud no es JSON válido.');
  }

  if (!body || Object.keys(body).length === 0) {
    return response.badRequest('El cuerpo de la solicitud está vacío.');
  }

  try {
    const resultado = await PartesService.registrarParte(body);

    if (!resultado.exito) {
      return response.badRequest(resultado.errores);
    }

    return response.created({
      mensaje: 'Parte registrada exitosamente.',
      parte: resultado.parte,
    });
  } catch (error) {
    console.error('[crearParte] Error:', error);
    return response.serverError('No se pudo registrar la parte.');
  }
};
