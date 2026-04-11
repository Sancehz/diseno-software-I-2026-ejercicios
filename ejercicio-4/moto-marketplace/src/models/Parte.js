/**
 * Model: Parte
 * Representa una parte de moto en el marketplace.
 */

const TIPOS_VALIDOS = [
  'motor',
  'frenos',
  'suspension',
  'electrico',
  'carroceria',
  'transmision',
  'escape',
  'iluminacion',
  'otro',
];

class Parte {
  constructor({ id, nombre, tipo, precio, descripcion, fechaCreacion, disponible }) {
    this.id = id;
    this.nombre = nombre;
    this.tipo = tipo;
    this.precio = precio;
    this.descripcion = descripcion || '';
    this.fechaCreacion = fechaCreacion || new Date().toISOString();
    this.disponible = disponible !== undefined ? disponible : true;
  }

  /**
   * Valida que los campos obligatorios sean correctos.
   * @returns {{ valido: boolean, errores: string[] }}
   */
  validar() {
    const errores = [];

    if (!this.nombre || typeof this.nombre !== 'string' || this.nombre.trim().length === 0) {
      errores.push('El campo "nombre" es obligatorio y debe ser texto.');
    }

    if (!this.tipo || !TIPOS_VALIDOS.includes(this.tipo.toLowerCase())) {
      errores.push(
        `El campo "tipo" es obligatorio. Valores permitidos: ${TIPOS_VALIDOS.join(', ')}.`
      );
    }

    if (this.precio === undefined || this.precio === null) {
      errores.push('El campo "precio" es obligatorio.');
    } else if (typeof this.precio !== 'number' || isNaN(this.precio) || this.precio < 0) {
      errores.push('El campo "precio" debe ser un número mayor o igual a 0.');
    }

    return {
      valido: errores.length === 0,
      errores,
    };
  }

  /**
   * Devuelve el objeto listo para persistir en DynamoDB.
   */
  toItem() {
    return {
      id: this.id,
      nombre: this.nombre.trim(),
      tipo: this.tipo.toLowerCase().trim(),
      precio: this.precio,
      descripcion: this.descripcion.trim(),
      fechaCreacion: this.fechaCreacion,
      disponible: this.disponible,
    };
  }

  /**
   * Crea una instancia de Parte desde un item de DynamoDB.
   */
  static fromItem(item) {
    return new Parte(item);
  }
}

module.exports = { Parte, TIPOS_VALIDOS };
