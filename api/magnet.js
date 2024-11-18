import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI;  // Tu URI de MongoDB Atlas

// Esquema de ejemplo para 'Magnets'
const magnetSchema = new mongoose.Schema({
  name: String,
  description: String,
});

const Magnet = mongoose.models.Magnet || mongoose.model('Magnet', magnetSchema);

export default async function handler(req, res) {
  // Método GET: Obtener todos los magnets
  if (req.method === 'GET') {
    try {
      // Conectar a MongoDB Atlas (solo si no estamos ya conectados)
      if (mongoose.connection.readyState !== 1) {
        await mongoose.connect(MONGO_URI, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });
      }

      // Obtener todos los "magnets" de la base de datos
      const magnets = await Magnet.find();
      res.status(200).json(magnets);
    } catch (error) {
      console.error('Error al obtener los magnets:', error);
      res.status(500).json({ error: 'Error de servidor' });
    }
  }
  
  // Método POST: Crear un nuevo magnet
  else if (req.method === 'POST') {
    try {
      const { name, description } = req.body;

      // Validación básica
      if (!name || !description) {
        return res.status(400).json({ error: 'Faltan datos' });
      }

      // Conectar a MongoDB Atlas (si no estamos ya conectados)
      if (mongoose.connection.readyState !== 1) {
        await mongoose.connect(MONGO_URI, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });
      }

      // Crear un nuevo magnet
      const newMagnet = new Magnet({
        name,
        description,
      });

      // Guardar el magnet en la base de datos
      await newMagnet.save();

      // Responder con éxito
      res.status(201).json({ message: 'Magnet creado exitosamente', magnet: newMagnet });
    } catch (error) {
      console.error('Error al guardar el magnet:', error);
      res.status(500).json({ error: 'Error de servidor' });
    }
  } else {
    // Método HTTP no permitido
    res.status(405).json({ error: 'Método no permitido' });
  }
}
