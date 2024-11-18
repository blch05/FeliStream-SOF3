<template>
  <div>
    <h2>Magnet URIs Activos</h2>
    <ul>
      <li v-for="magnet in magnets" :key="magnet.magnetURI">
        {{ magnet.name }}
        <button @click="copyToClipboard(magnet.magnetURI)">Copiar enlace</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ['magnets'],
  methods: {
    copyToClipboard(magnetURI) {
      navigator.clipboard.writeText(magnetURI).then(() => {
        alert('Magnet URI copiado al portapapeles');
      });
    }
  }
};
</script>
