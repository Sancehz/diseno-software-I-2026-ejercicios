const mongoose = require('mongoose');

const amanteSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100,
    },
    edad: {
      type: Number,
      required: true,
      min: 18,
      max: 120,
    },
    intereses: {
      type: [String],
      required: true,
      validate: {
        validator: (arr) => arr.length > 0,
        message: 'Debe tener al menos un interés',
      },
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Índice para búsquedas por interés
amanteSchema.index({ intereses: 1 });

const Amante = mongoose.model('Amante', amanteSchema);

module.exports = Amante;
