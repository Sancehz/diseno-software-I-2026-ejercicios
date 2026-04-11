const amanteRepository = require('../repositories/amante.repository');
const { CreateAmanteDto, QueryAmanteDto } = require('../dtos/amante.dto');

/**
 * Servicio de Amantes.
 * Contiene la lógica de negocio y coordina DTOs con el repositorio.
 */
class AmanteService {
  /**
   * Crea un nuevo perfil de amante tras validar el DTO.
   * @param {Object} body - Datos crudos del request
   * @returns {Promise<Object>} El amante creado
   * @throws {Error} Si la validación falla
   */
  async crearAmante(body) {
    const dto = new CreateAmanteDto(body);
    const { valid, errors } = dto.validate();

    if (!valid) {
      const err = new Error(errors.join(' | '));
      err.statusCode = 400;
      throw err;
    }

    const entity = dto.toEntity();
    return await amanteRepository.create(entity);
  }

  /**
   * Busca amantes por interés específico.
   * @param {Object} query - Query params del request
   * @returns {Promise<Object[]>}
   * @throws {Error} Si la validación falla
   */
  async buscarPorInteres(query) {
    const dto = new QueryAmanteDto(query);
    const { valid, errors } = dto.validate();

    if (!valid) {
      const err = new Error(errors.join(' | '));
      err.statusCode = 400;
      throw err;
    }

    const interes = dto.getNormalizedInteres();
    return await amanteRepository.findByInteres(interes);
  }
}

module.exports = new AmanteService();
