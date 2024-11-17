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
        magnets.value = await magnetController.getMagnets();
      };
  
      const addMagnet = (magnet) => {
        magnets.value.push(magnet);
      };
  
      onMounted(fetchMagnets);
  
      return { magnets, addMagnet };
    }
  };
  </script>
  