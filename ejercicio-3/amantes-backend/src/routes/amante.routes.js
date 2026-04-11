const express = require('express');
const router = express.Router();
const amanteController = require('../controllers/amante.controller');

// POST /amantes - Crear perfil
router.post('/', (req, res) => amanteController.crear(req, res));

// GET /amantes?interes=x - Buscar por interés
router.get('/', (req, res) => amanteController.buscar(req, res));

module.exports = router;
