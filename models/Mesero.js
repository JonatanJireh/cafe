const mongoose = require('mongoose');

const meseroSchema = new mongoose.Schema({
  nombre: { type: String, required: true }
});

module.exports = mongoose.model('Mesero', meseroSchema);