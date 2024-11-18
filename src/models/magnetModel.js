// src/models/magnetModel.js (MongoDB versión)
import mongoose from 'mongoose';

// Definir el esquema de Magnet
const magnetSchema = new mongoose.Schema({
  name: String,
  magnetURI: String,
});

// Crear el modelo de Magnet
const Magnet = mongoose.models.Magnet || mongoose.model('Magnet', magnetSchema);

// Función para obtener todos los Magnet URIs activos
export const getAllMagnets = async () => {
  try {
    return await Magnet.find();
  } catch (error) {
    console.error('Error al obtener los Magnet URIs:', error);
    throw error;
  }
};

// Función para agregar un nuevo Magnet URI
export const addMagnet = async (name, magnetURI) => {
  try {
    const newMagnet = new Magnet({ name, magnetURI });
    await newMagnet.save();
    return newMagnet;
  } catch (error) {
    console.error('Error al guardar el Magnet URI:', error);
    throw error;
  }
};
