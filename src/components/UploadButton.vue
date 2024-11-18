<template>
  <div>
    <input type="file" @change="handleFileUpload" accept="video/*" />
    <button @click="seedFile">Subir y compartir video</button>
  </div>
</template>

<script>
import magnetController from '../controllers/magnetController';  // Asegúrate de que este controlador esté bien configurado

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
          const magnet = await magnetController.seedFile(this.file);  // Aquí se obtiene el magnetURI
          
          // Después de obtener el Magnet URI, lo enviamos al backend para guardarlo
          await this.saveMagnetToDatabase(magnet);
          
          alert('Video subido y compartido exitosamente.');
        } catch (error) {
          console.error('Error al subir y compartir video:', error);
          alert('Error al subir el video.');
        }
      } else {
        alert('Por favor selecciona un archivo.');
      }
    },

    async saveMagnetToDatabase(magnet) {
      try {
        await fetch('https://tu-aplicacion.vercel.app/api/magnets', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: this.file.name,
            magnetURI: magnet,
          }),
        });
      } catch (error) {
        console.error('Error al guardar el Magnet URI:', error);
      }
    },
  },
};
</script>
