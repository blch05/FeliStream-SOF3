import express from 'express';
import { saveMagnet, getMagnets } from '../controllers/magnetsController.js';

const router = express.Router();

// Ruta para obtener todos los Magnet URIs
router.get('/', getMagnets);

// Ruta para guardar un nuevo Magnet URI
router.post('/', saveMagnet);

export default router;
