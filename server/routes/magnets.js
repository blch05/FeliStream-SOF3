import express from 'express';
import connectDB from './db';
import magnetsRouter from './routes/magnetsRoute'; // Asegúrate de que la ruta esté bien importada

const app = express();

// Conexión a la base de datos
connectDB();

// Middleware para manejar JSON
app.use(express.json());

// Usar las rutas para los Magnets
app.use('https://tu-aplicacion.vercel.app/api/magnets', magnetsRouter);  // Asegúrate de que '/api/magnets' es la ruta correcta

// Inicia el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
