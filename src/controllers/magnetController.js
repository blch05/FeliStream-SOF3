import WebTorrent from 'webtorrent';

const client = new WebTorrent();

export default {
  async seedFile(file, videoElement) {
    try {
      if (!file) {
        console.error('Archivo no disponible.');
        return;
      }

      // Sembrar el archivo (hace que el archivo sea accesible para otros)
      const torrent = await client.seed(file, (torrent) => {
        // Obtener el Magnet URI generado por WebTorrent
        const magnetURI = torrent.magnetURI;
        console.log(`Magnet URI generado: ${magnetURI}`);

        // Opcional: mostrar el Magnet URI en la interfaz
        alert(`Magnet URI: ${magnetURI}`);

        // Si deseas compartirlo con otros usuarios (enviar a tu servidor o base de datos)
        fetch('/api/magnets', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: file.name,
            magnetURI,
          }),
        });
        

        // Luego, puedes usar este Magnet URI para compartir el archivo con otros
      });

      // Opcional: reproducción del video desde el mismo torrent
      torrent.files.forEach((file) => {
        if (file.name.endsWith('.mp4') || file.name.endsWith('.webm')) {
          console.log(`Transmitiendo archivo: ${file.name}`);
          file.renderTo(videoElement, {
            autoplay: true,
            muted: false,
            controls: true,
          });
        }
      });

      // Cuando la descarga se complete (para dejar de sembrar o hacer algo más)
      torrent.on('done', () => {
        console.log('Descarga completa');
      });

    } catch (error) {
      console.error('Error al sembrar el archivo:', error);
    }
  },
};

export const saveMagnet = async (req, res) => {
  const { name, magnetURI } = req.body;

  try {
    const newMagnet = new MagnetModel({ name, magnetURI });
    await newMagnet.save();
    res.status(201).json({ message: 'Magnet URI guardado exitosamente', magnet: newMagnet });
  } catch (error) {
    console.error('Error al guardar el Magnet URI:', error);
    res.status(500).json({ error: 'No se pudo guardar el Magnet URI' });
  }
};

