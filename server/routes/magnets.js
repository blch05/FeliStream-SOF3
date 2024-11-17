const express = require('express');
const router = express.Router();
const Magnet = require('../models/Magnet');

// Obtener todos los Magnet URIs
router.get('/', (req, res) => {
  Magnet.find()
    .sort({ date: -1 })
    .then(magnets => res.json(magnets));
});

// Agregar un nuevo Magnet URI
router.post('/', (req, res) => {
  const { name, magnetURI } = req.body;
  const newMagnet = new Magnet({
    name,
    magnetURI
  });

  newMagnet.save().then(magnet => res.json(magnet));
});

module.exports = router;