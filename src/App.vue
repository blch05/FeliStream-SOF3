<template>
  <div id="app">
    <h1>P2P Video Streaming</h1>
    <HomeView />
  </div>
</template>

<script>
import HomeView from './views/HomeView.vue';
import WebTorrent from 'webtorrent';

export default {
  components: {
    HomeView
  }
};
</script>
