const Amante = require('../models/amante.model');

/**
 * Repositorio de Amantes.
 * Responsable de toda la interacción directa con la base de datos.
 */
class AmanteRepository {
  /**
   * Persiste un nuevo amante en la base de datos.
   * @param {{ nombre: string, edad: number, intereses: string[] }} data
   * @returns {Promise<Object>} El documento creado
   */
  async create(data) {
    const amante = new Amante(data);
    return await amante.save();
  }

  /**
   * Busca amantes que contengan el interés dado (case-insensitive).
   * @param {string} interes
   * @returns {Promise<Object[]>}
   */
  async findByInteres(interes) {
    return await Amante.find({
      intereses: { $regex: new RegExp(`^${interes}$`, 'i') },
    }).sort({ createdAt: -1 });
  }

  /**
   * Retorna todos los amantes registrados.
   * @returns {Promise<Object[]>}
   */
  async findAll() {
    return await Amante.find().sort({ createdAt: -1 });
  }

  /**
   * Verifica cuántos documentos existen (para seed).
   * @returns {Promise<number>}
   */
  async count() {
    return await Amante.countDocuments();
  }

  /**
   * Inserta múltiples amantes a la vez (para seed).
   * @param {Object[]} amantes
   * @returns {Promise<Object[]>}
   */
  async insertMany(amantes) {
    return await Amante.insertMany(amantes);
  }
}

module.exports = new AmanteRepository();
