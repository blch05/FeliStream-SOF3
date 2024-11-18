const express = require('express');
const router = express.Router();
const Magnet = require('../models/Magnet');
const { saveMagnet } = require('../controllers/magnetsController'); // Importa el controlador


// Obtener todos los Magnet URIs
router.get('/', (req, res) => {
  Magnet.find()
    .sort({ date: -1 })
    .then(magnets => res.json(magnets));
});

// Agregar un nuevo Magnet URI
router.post('/', saveMagnet);

module.exports = router;