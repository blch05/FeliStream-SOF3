// src/pages/api/magnets.js
import { addMagnet } from '../../models/magnetModel';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, magnetURI } = req.body;

    if (!name || !magnetURI) {
      return res.status(400).json({ error: 'Faltan datos para guardar el magnet' });
    }

    try {
      const savedMagnet = await addMagnet(name, magnetURI);
      res.status(201).json({ message: 'Magnet URI guardado exitosamente', magnet: savedMagnet });
    } catch (error) {
      res.status(500).json({ error: 'Error al guardar el magnet URI' });
    }
  } else {
    res.status(405).json({ error: 'Método no permitido' });
  }
}
