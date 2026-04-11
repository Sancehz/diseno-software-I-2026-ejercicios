const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const runSeed = require('./config/seed');
const amanteRoutes = require('./routes/amante.routes');

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

// Rutas
app.use('/amantes', amanteRoutes);

// Health check
app.get('/', (req, res) => {
  res.json({ message: '💘 API de Amantes activa', version: '1.0.0' });
});

// Manejo de rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Ruta no encontrada' });
});

// Arranque
const start = async () => {
  await connectDB();
  await runSeed();
  app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  });
};

start();
