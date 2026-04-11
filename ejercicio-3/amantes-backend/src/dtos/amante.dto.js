/**
 * DTO para la creación de un amante.
 * Valida y normaliza los datos de entrada.
 */
class CreateAmanteDto {
  constructor({ nombre, edad, intereses }) {
    this.nombre = nombre;
    this.edad = edad;
    this.intereses = intereses;
  }

  /**
   * Valida el DTO y devuelve un objeto con los errores encontrados.
   * @returns {{ valid: boolean, errors: string[] }}
   */
  validate() {
    const errors = [];

    // Validar nombre
    if (!this.nombre || typeof this.nombre !== 'string') {
      errors.push('El campo "nombre" es obligatorio y debe ser texto.');
    } else if (this.nombre.trim().length < 2) {
      errors.push('El "nombre" debe tener al menos 2 caracteres.');
    } else if (this.nombre.trim().length > 100) {
      errors.push('El "nombre" no puede superar los 100 caracteres.');
    }

    // Validar edad
    if (this.edad === undefined || this.edad === null) {
      errors.push('El campo "edad" es obligatorio.');
    } else if (!Number.isInteger(Number(this.edad))) {
      errors.push('La "edad" debe ser un número entero.');
    } else if (Number(this.edad) < 18) {
      errors.push('La "edad" mínima permitida es 18 años.');
    } else if (Number(this.edad) > 120) {
      errors.push('La "edad" máxima permitida es 120 años.');
    }

    // Validar intereses
    if (!this.intereses) {
      errors.push('El campo "intereses" es obligatorio.');
    } else if (!Array.isArray(this.intereses)) {
      errors.push('"intereses" debe ser un arreglo de strings.');
    } else if (this.intereses.length === 0) {
      errors.push('"intereses" debe contener al menos un elemento.');
    } else {
      const invalidos = this.intereses.filter(
        (i) => typeof i !== 'string' || i.trim().length === 0
      );
      if (invalidos.length > 0) {
        errors.push('Todos los "intereses" deben ser strings no vacíos.');
      }
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }

  /**
   * Devuelve los datos normalizados listos para persistir.
   */
  toEntity() {
    return {
      nombre: this.nombre.trim(),
      edad: Number(this.edad),
      intereses: this.intereses.map((i) => i.trim().toLowerCase()),
    };
  }
}

/**
 * DTO para la consulta de amantes por interés.
 */
class QueryAmanteDto {
  constructor({ interes }) {
    this.interes = interes;
  }

  validate() {
    const errors = [];

    if (!this.interes || typeof this.interes !== 'string') {
      errors.push('El parámetro "interes" es obligatorio y debe ser texto.');
    } else if (this.interes.trim().length === 0) {
      errors.push('El parámetro "interes" no puede estar vacío.');
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }

  getNormalizedInteres() {
    return this.interes.trim().toLowerCase();
  }
}

module.exports = { CreateAmanteDto, QueryAmanteDto };
