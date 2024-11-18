import mongoose from 'mongoose';
import multer from 'multer';
import WebTorrent from 'webtorrent';

// Configurar multer para almacenar archivos temporalmente
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Guardar en la carpeta 'uploads'
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

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
    // Usamos multer para manejar el archivo subido
    upload.single('file')(req, res, async (err) => {
      if (err) {
        return res.status(500).json({ error: 'Error al procesar el archivo' });
      }

      const file = req.file;
      if (!file) {
        return res.status(400).json({ error: 'No se recibió un archivo' });
      }

      try {
        // Usamos WebTorrent para crear el magnet link
        const client = new WebTorrent();
        client.seed(file.path, (torrent) => {
          const magnetLink = torrent.magnetURI;

          // Guardar el magnet link en la base de datos
          const newMagnet = new Magnet({
            name: file.originalname,
            magnet: magnetLink,
          });

          newMagnet.save()
            .then(() => {
              res.status(201).json({ message: 'Magnet guardado', magnet: magnetLink });
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
    });
  } else {
    res.status(405).json({ error: 'Método no permitido' });
  }
}
