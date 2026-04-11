const { v4: uuidv4 } = require('uuid');
const { Parte } = require('../models/Parte');
const { PartesRepository } = require('../repositories/PartesRepository');

/**
 * Service: PartesService
 * Capa de lógica de negocio.
 * Orquesta validaciones, transformaciones y persistencia.
 */
const PartesService = {
  /**
   * Registra una nueva parte en el marketplace.
   * @param {Object} datos - { nombre, tipo, precio, descripcion }
   * @returns {{ exito: boolean, parte?: Object, errores?: string[] }}
   */
  async registrarParte(datos) {
    const parte = new Parte({
      id: uuidv4(),
      nombre: datos.nombre,
      tipo: datos.tipo,
      precio: Number(datos.precio),
      descripcion: datos.descripcion,
    });

    const { valido, errores } = parte.validar();

    if (!valido) {
      return { exito: false, errores };
    }

    const item = parte.toItem();
    await PartesRepository.guardar(item);

    return { exito: true, parte: item };
  },

  /**
   * Consulta partes del marketplace, opcionalmente filtrando por tipo.
   * @param {string|null} tipo
   * @returns {{ exito: boolean, partes: Object[], total: number }}
   */
  async consultarPartes(tipo) {
    let items;

    if (tipo && tipo.trim().length > 0) {
      items = await PartesRepository.listarPorTipo(tipo.trim());
    } else {
      items = await PartesRepository.listarTodas();
    }

    // Ordenar por fecha de creación descendente
    const partes = items
      .map((item) => Parte.fromItem(item).toItem())
      .sort((a, b) => new Date(b.fechaCreacion) - new Date(a.fechaCreacion));

    return {
      exito: true,
      partes,
      total: partes.length,
    };
  },
};

module.exports = { PartesService };
