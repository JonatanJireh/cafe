const mongoose = require('mongoose');

const pedidoSchema = new mongoose.Schema({
  mesero: String,
  mesa: String,
  productos: [
    {
      producto: String,
      cantidad: Number,
      precio: Number,
      subtotal: Number
    }
  ],
  total: Number,
  fecha: { type: Date, default: Date.now },
  atendido: { type: Boolean, default: false },
  numeroPedido: { type: Number, unique: true }  // ← NUEVO CAMPO
});

module.exports = mongoose.model('Pedido', pedidoSchema);
