const { v4: uuidv4 } = require('uuid');
const Part = require('../models/Part');
const PartRepository = require('../repositories/PartRepository');

class PartService {
  constructor() {
    this.repository = new PartRepository();
  }

  async createPart(data) {
    // Create part instance
    const part = new Part({
      id: uuidv4(),
      name: data.name,
      type: data.type,
      price: data.price
    });

    // Validate part
    const validation = part.validate();
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    // Save to repository
    return await this.repository.create(part);
  }

  async searchParts(type) {
    if (type) {
      // Search by specific type
      return await this.repository.findByType(type);
    } else {
      // Return all parts
      return await this.repository.findAll();
    }
  }
}

module.exports = PartService;
