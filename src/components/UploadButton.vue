<template>
  <div>
    <input type="file" @change="handleFileUpload" accept="video/*" />
    <button @click="seedFile">Subir y compartir video</button>
  </div>
</template>

<script>
import magnetController from '../controllers/magnetController'; // Asegúrate de que este controlador esté bien configurado

export default {
  data() {
    return {
      file: null,
    };
  },
  methods: {
    handleFileUpload(event) {
      this.file = event.target.files[0]; // Guardamos el archivo seleccionado
    },
    async seedFile() {
      if (this.file) {
        try {
          // Se crea el magnet y se pasa al backend para guardarlo
          const magnet = await magnetController.seedFile(this.file);
          
          // Emitir el magnet link generado para que el frontend lo maneje
          this.$emit('newMagnet', magnet);

          // Puedes agregar algún mensaje de éxito o redirigir al usuario
          alert('Video subido y compartido exitosamente.');
        } catch (error) {
          console.error('Error al subir y compartir video:', error);
          alert('Error al subir el video.');
        }
      } else {
        alert('Por favor selecciona un archivo.');
      }
    },
  },
};
</script>
