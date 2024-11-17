const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const magnets = require('./routes/magnets');
const config = require('./config');

const app = express();

// Middleware
app.use(bodyParser.json());

// Conectar a MongoDB
mongoose.connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB conectado'))
  .catch(err => console.log(err));

// Rutas
app.use('/api/magnets', magnets);

const port = process.env.PORT || 5173;
app.listen(port, () => console.log(`Servidor corriendo en el puerto ${port}`));
