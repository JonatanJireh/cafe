const express = require('express');
const router = express.Router();
const Pedido = require('../models/Pedido');

// Obtener pedidos
router.get('/', async (req, res) => {
  const pedidos = await Pedido.find();
  res.json(pedidos);
});

// Crear pedido
router.post('/', async (req, res) => {
  const nuevo = new Pedido(req.body);
  await nuevo.save();
  res.json(nuevo);
});

// Eliminar pedido
router.delete('/:id', async (req, res) => {
  await Pedido.findByIdAndDelete(req.params.id);
  res.json({ mensaje: 'Pedido eliminado' });
});

// Actualizar pedido (marcar como atendido)
router.patch('/:id', async (req, res) => {
  try {
    const { atendido } = req.body;
    if (typeof atendido !== 'boolean') {
      return res.status(400).json({ mensaje: 'El campo "atendido" debe ser booleano' });
    }
    const pedidoActualizado = await Pedido.findByIdAndUpdate(
      req.params.id,
      { atendido },
      { new: true }
    );
    if (!pedidoActualizado) {
      return res.status(404).json({ mensaje: 'Pedido no encontrado' });
    }
    res.json(pedidoActualizado);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar pedido', error });
  }
});

module.exports = router;  // <--- SOLO UNO al final
