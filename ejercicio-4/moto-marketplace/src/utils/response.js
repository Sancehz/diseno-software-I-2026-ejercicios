/**
 * Helpers para construir respuestas HTTP estándar con CORS.
 */

const CORS_HEADERS = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type,Authorization',
  'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
};

const responder = (statusCode, body) => ({
  statusCode,
  headers: CORS_HEADERS,
  body: JSON.stringify(body),
});

module.exports = {
  ok: (data) => responder(200, data),
  created: (data) => responder(201, data),
  badRequest: (errores) =>
    responder(400, {
      error: 'Solicitud inválida',
      errores: Array.isArray(errores) ? errores : [errores],
    }),
  notFound: (mensaje) =>
    responder(404, { error: 'No encontrado', mensaje }),
  serverError: (mensaje = 'Error interno del servidor') =>
    responder(500, { error: mensaje }),
};
