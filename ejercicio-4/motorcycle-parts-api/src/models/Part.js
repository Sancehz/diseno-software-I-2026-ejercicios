class Part {
  constructor({ id, name, type, price, createdAt }) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.price = price;
    this.createdAt = createdAt || new Date().toISOString();
  }

  validate() {
    const errors = [];

    if (!this.name || typeof this.name !== 'string' || this.name.trim().length === 0) {
      errors.push('Name is required and must be a non-empty string');
    }

    if (!this.type || typeof this.type !== 'string' || this.type.trim().length === 0) {
      errors.push('Type is required and must be a non-empty string');
    }

    if (this.price === undefined || this.price === null) {
      errors.push('Price is required');
    }

    if (typeof this.price !== 'number' || this.price < 0) {
      errors.push('Price must be a positive number');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      type: this.type,
      price: this.price,
      createdAt: this.createdAt
    };
  }
}

module.exports = Part;
