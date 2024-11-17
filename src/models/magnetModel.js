// src/models/magnetModel.js

// Arreglo en memoria para almacenar los Magnet URI activos
let magnets = [];

/**
 * Función para obtener todos los Magnet URIs activos
 * @returns {Array} - Lista de magnet URIs activos
 */
function getAllMagnets() {
    return magnets;
}

/**
 * Función para agregar un nuevo Magnet URI
 * @param {string} name - Nombre del video
 * @param {string} magnetURI - Magnet URI del video
 * @returns {Object} - El nuevo magnet URI agregado
 */
function addMagnet(name, magnetURI) {
    const newMagnet = { name, magnetURI };
    magnets.push(newMagnet);
    return newMagnet;
}

// Exportar las funciones del modelo
module.exports = {
    getAllMagnets,
    addMagnet
};
