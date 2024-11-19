import express from 'express';
import connectDB from '../db.js';
import router from '../models/Magnet.js'; // Asegúrate de que la ruta esté bien importada
// Importar el paquete cors
import cors from 'cors';

const app = express();
// Habilitar CORS para todas las rutas
app.use(cors());

// Conexión a la base de datos
connectDB();


// Middleware para manejar JSON
app.use(express.json());

// Usar las rutas para los Magnets
app.use('/api/magnets', router);  // Asegúrate de que '/api/magnets' es la ruta correcta

// Inicia el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
