import mongoose from 'mongoose';

const magnetSchema = new mongoose.Schema({
  name: String,
  magnetURI: String,
});

const Magnet = mongoose.models.Magnet || mongoose.model('Magnet', magnetSchema);

export default Magnet;
