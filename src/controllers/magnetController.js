import WebTorrent from 'webtorrent';

const client = new WebTorrent();

export default {
  async playVideo(magnetURI, videoElement) {
    try {
      if (!videoElement) {
        console.error('Elemento de video no disponible.');
        return;
      }

      // Añadir el torrent
      const torrent = client.add(magnetURI, {
        // Opcional: configura el cliente para que se conecte a múltiples trackers
        announce: [
          'wss://tracker.openwebtorrent.com',
          'wss://tracker.btorrent.xyz',
        ],
      });

      // Manejo de errores del torrent
      torrent.on('error', (err) => {
        console.error('Error en el torrent:', err);
      });

      // Cuando el torrent está listo
      torrent.on('ready', () => {
        console.log(`Conectado a ${torrent.numPeers} pares.`);
      });

      // Reproducir el archivo cuando esté listo
      torrent.files.forEach((file) => {
        // Solo intentar reproducir archivos de video (mp4, webm)
        if (file.name.endsWith('.mp4') || file.name.endsWith('.webm')) {
          console.log(`Transmitiendo archivo: ${file.name}`);
          file.renderTo(videoElement, {
            autoplay: true,  // Inicia la reproducción automáticamente
            muted: false,    // Desactivar mute si lo deseas
            controls: true,  // Activar controles de video
          });
        }
      });

      // Cuando el torrent se haya descargado completamente
      torrent.on('done', () => {
        console.log('Descarga completa');
      });
      
    } catch (error) {
      console.error('Error al reproducir el video:', error);
    }
  },
};
