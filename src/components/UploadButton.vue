<template>
    <div>
      <input type="file" @change="handleFileUpload" accept="video/*" />
      <button @click="seedFile">Subir y compartir video</button>
    </div>
  </template>
  
  <script>
  import magnetController from '../controllers/magnetController';
  import WebTorrent from 'webtorrent';

  
  export default {
    methods: {
      handleFileUpload(event) {
        this.file = event.target.files[0];
      },
      async seedFile() {
        if (this.file) {
          const magnet = await magnetController.seedFile(this.file);
          this.$emit('newMagnet', magnet);
        }
      }
    }
  };
  </script>
  