import mongoose from 'mongoose';
import WebTorrent from 'webtorrent';

// Esquema de "Magnet"
const magnetSchema = new mongoose.Schema({
  name: String,
  magnet: String,
});
const Magnet = mongoose.models.Magnet || mongoose.model('Magnet', magnetSchema);

// Conexión a MongoDB
const MONGO_URI = process.env.MONGO_URI; // Asegúrate de tener la URI correcta

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { filePath, fileName } = req.body; // Esperamos la URL o path del archivo y su nombre desde el cliente

    if (!filePath || !fileName) {
      return res.status(400).json({ error: 'Faltan datos para generar el magnet' });
    }

    try {
      // Usamos WebTorrent para crear el magnet link
      const client = new WebTorrent();
      client.seed(filePath, { name: fileName }, (torrent) => {
        const magnetLink = torrent.magnetURI;

        // Guardar el magnet link en la base de datos
        const newMagnet = new Magnet({
          name: fileName,
          magnet: magnetLink,
        });

        newMagnet.save()
          .then(() => {
            res.status(201).json({ message: 'Magnet guardado correctamente', magnet: magnetLink });
          })
          .catch((err) => {
            console.error('Error al guardar el magnet:', err);
            res.status(500).json({ error: 'Error al guardar el magnet' });
          });
      });
    } catch (error) {
      console.error('Error al generar el magnet link:', error);
      res.status(500).json({ error: 'Error al generar el magnet link' });
    }
  } else {
    res.status(405).json({ error: 'Método no permitido' });
  }
}
