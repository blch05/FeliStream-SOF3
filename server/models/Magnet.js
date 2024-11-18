const express = require('express');
const router = express.Router();
const Magnet = require('../models/magnetModel'); // Importa el modelo de Magnet

// Ruta de prueba para guardar un nuevo magnet link
router.post('/test-save', async (req, res) => {
  try {
    const nuevoMagnet = new Magnet({
      name: 'Prueba', // Valor de prueba para el nombre
      magnetURI: 'magnet:?xt=urn:btih:...', // Inserta un enlace de prueba aquí
      // date no es necesario especificarlo, ya que toma el valor por defecto
    });

    const resultado = await nuevoMagnet.save();
    res.status(200).json({ mensaje: 'Guardado exitoso', data: resultado });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al guardar', error });
  }
});

module.exports = router;
