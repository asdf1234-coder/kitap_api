// backend/app.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB bağlantısı
mongoose.connect("mongodb+srv://Admin_9119:tfDCJ8VNRjN8YGxo@kitapmongo.l2hkg.mongodb.net/kitap_node?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Veritabanına bağlandı');
}).catch(err => {
  console.log('Veritabanı bağlantı hatası:', err);
});

// Kitap Schema'sı
const KitapSchema = new mongoose.Schema({
  id: Number,
  isim: String,
  resim: String,
  yayinevi: String,
  tur: String,
  yazar: String,
  ucret: Number
});

const Kitap = mongoose.model('Kitap', KitapSchema, 'kitaplar');

// Kitapları API ile sun
app.get('/api/kitaplar', async (req, res) => {
  try {
    const kitaplar = await Kitap.find({});
    res.json(kitaplar);
  } catch (err) {
    res.status(500).json({ message: 'Veri çekme hatası' });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
