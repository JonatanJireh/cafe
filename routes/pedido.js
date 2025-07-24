const express = require('express');
const router = express.Router();
const Pedido = require('../models/Pedido');

// Obtener pedidos
router.get('/', async (req, res) => {
  const pedidos = await Pedido.find();
  res.json(pedidos);
});

// Crear pedido
// Obtener el siguiente número correlativo
async function obtenerProximoNumeroPedido() {
  const ultimo = await Pedido.findOne().sort({ numeroPedido: -1 });
  return ultimo ? ultimo.numeroPedido + 1 : 1;
}

// Crear pedido
router.post('/', async (req, res) => {
  try {
    const numeroPedido = await obtenerProximoNumeroPedido();

    const nuevo = new Pedido({
      ...req.body,
      numeroPedido  // ← Añadir número correlativo
    });

    await nuevo.save();
    res.json(nuevo);
  } catch (error) {
    console.error('Error al crear pedido:', error);
    res.status(500).json({ mensaje: 'Error al crear el pedido', error });
  }
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
