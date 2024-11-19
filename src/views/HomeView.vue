<template>
    <div>
      <UploadButton @newMagnet="addMagnet" />
      <MagnetList :magnets="magnets" />
      <VideoPlayer />
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import UploadButton from '../components/UploadButton.vue';
  import MagnetList from '../components/MagnetList.vue';
  import VideoPlayer from '../components/VideoPlayer.vue';
  import magnetController from '../controllers/magnetController';
  
  export default {
    components: {
      UploadButton,
      MagnetList,
      VideoPlayer
    },
    setup() {
      const magnets = ref([]);
  
      const fetchMagnets = async () => {
        try {
          const response = await fetch('http://localhost:3000/api/magnets/test-save');  // Asegúrate de que la URL sea la correcta
          if (!response.ok) {
            throw new Error('Error al obtener los Magnet URIs');
          }
          const magnetsData = await response.json();
          magnets.value = magnetsData;
        } catch (error) {
          console.error('Error al obtener los Magnet URIs:', error);
        }
      };

  
      const addMagnet = (magnet) => {
        magnets.value.push(magnet);
      };
  
      onMounted(fetchMagnets);
  
      return { magnets, addMagnet };
    }
  };
  </script>
  