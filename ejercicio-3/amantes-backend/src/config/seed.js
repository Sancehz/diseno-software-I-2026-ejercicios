const amanteRepository = require('../repositories/amante.repository');

const seedData = [
  {
    nombre: 'Valentina Ríos',
    edad: 28,
    intereses: ['senderismo', 'fotografía', 'café', 'yoga'],
  },
  {
    nombre: 'Andrés Méndez',
    edad: 32,
    intereses: ['música', 'cocina', 'viajes', 'café'],
  },
  {
    nombre: 'Sofía Vargas',
    edad: 25,
    intereses: ['arte', 'yoga', 'lectura', 'teatro'],
  },
  {
    nombre: 'Diego Herrera',
    edad: 30,
    intereses: ['surf', 'fotografía', 'viajes', 'música'],
  },
  {
    nombre: 'Camila Torres',
    edad: 27,
    intereses: ['lectura', 'cocina', 'senderismo', 'cine'],
  },
  {
    nombre: 'Mateo Gutiérrez',
    edad: 35,
    intereses: ['ciclismo', 'café', 'tecnología', 'viajes'],
  },
  {
    nombre: 'Isabella Mora',
    edad: 29,
    intereses: ['danza', 'teatro', 'arte', 'yoga'],
  },
  {
    nombre: 'Sebastián Castro',
    edad: 31,
    intereses: ['gaming', 'música', 'cine', 'tecnología'],
  },
];

const runSeed = async () => {
  try {
    const count = await amanteRepository.count();
    if (count > 0) {
      console.log(`🌱 Seed omitido: ya existen ${count} registros.`);
      return;
    }
    await amanteRepository.insertMany(seedData);
    console.log(`🌱 Seed cargado: ${seedData.length} amantes registrados.`);
  } catch (error) {
    console.error('❌ Error al cargar seed:', error.message);
  }
};

module.exports = runSeed;
