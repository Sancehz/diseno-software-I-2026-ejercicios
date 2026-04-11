const amanteService = require('../services/amante.service');

/**
 * Controlador de Amantes.
 * Maneja los requests HTTP y delega la lógica al servicio.
 */
class AmanteController {
  /**
   * POST /amantes
   * Crea un nuevo perfil de amante.
   */
  async crear(req, res) {
    try {
      const amante = await amanteService.crearAmante(req.body);
      return res.status(201).json({
        success: true,
        message: 'Perfil de amante creado exitosamente 💘',
        data: amante,
      });
    } catch (error) {
      const status = error.statusCode || 500;
      return res.status(status).json({
        success: false,
        message: error.message,
      });
    }
  }

  /**
   * GET /amantes?interes=x
   * Lista amantes que coincidan con el interés dado.
   */
  async buscar(req, res) {
    try {
      const amantes = await amanteService.buscarPorInteres(req.query);
      return res.status(200).json({
        success: true,
        total: amantes.length,
        data: amantes,
      });
    } catch (error) {
      const status = error.statusCode || 500;
      return res.status(status).json({
        success: false,
        message: error.message,
      });
    }
  }
}

module.exports = new AmanteController();
