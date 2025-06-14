// routes/producto.js
const express = require('express');
const router = express.Router();
const Producto = require('../models/Producto'); // Asegúrate que tu modelo está bien definido

// Obtener todos los productos
router.get('/', async (req, res) => {
  try {
    const productos = await Producto.find();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener productos', error });
  }
});

// Crear un producto nuevo
router.post('/', async (req, res) => {
  try {
    const { nombre, precio } = req.body;
    if (!nombre || precio == null) {
      return res.status(400).json({ mensaje: 'Nombre y precio son obligatorios' });
    }
    const nuevoProducto = new Producto({ nombre, precio });
    await nuevoProducto.save();
    res.status(201).json(nuevoProducto);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear producto', error });
  }
});

// Eliminar un producto por ID
router.delete('/:id', async (req, res) => {
  try {
    const productoEliminado = await Producto.findByIdAndDelete(req.params.id);
    if (!productoEliminado) {
      return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }
    res.json({ mensaje: 'Producto eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar producto', error });
  }
});

module.exports = router;
