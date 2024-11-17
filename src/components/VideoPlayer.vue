<template>
    <div>
      <input v-model="magnetURI" placeholder="Magnet URI para cargar video" />
      <button @click="playVideo">Cargar video</button>
      <video ref="videoPlayer" controls style="width: 600px;"></video>
    </div>
  </template>
  
  <script>
  import magnetController from '../controllers/magnetController';
  import WebTorrent from 'webtorrent';

  
  export default {
    data() {
      return {
        magnetURI: ''
      };
    },
    methods: {
      async playVideo() {
        await magnetController.playVideo(this.magnetURI, this.$refs.videoPlayer);
      }
    }
  };
  </script>
  