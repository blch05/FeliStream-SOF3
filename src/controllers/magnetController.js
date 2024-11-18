import Magnet from '../models/magnetModel.js';  // Importa el modelo Magnet

// Guardar un nuevo Magnet URI
export const saveMagnet = async (req, res) => {
  const { name, magnetURI } = req.body;

  try {
    const newMagnet = new Magnet({ name, magnetURI });
    await newMagnet.save();
    res.status(201).json({ message: 'Magnet URI guardado exitosamente', magnet: newMagnet });
  } catch (error) {
    console.error('Error al guardar el Magnet URI:', error);
    res.status(500).json({ error: 'No se pudo guardar el Magnet URI' });
  }
};

// Obtener todos los Magnet URIs
export const getMagnets = async (req, res) => {
  try {
    const magnets = await Magnet.find();
    res.status(200).json(magnets);
  } catch (error) {
    console.error('Error al obtener los Magnet URIs:', error);
    res.status(500).json({ error: 'No se pudieron obtener los Magnet URIs' });
  }
};
