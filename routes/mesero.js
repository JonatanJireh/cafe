const express = require('express');
const router = express.Router();
const Mesero = require('../models/Mesero');

router.get('/', async (req, res) => {
  const meseros = await Mesero.find();
  res.json(meseros);
});

router.post('/', async (req, res) => {
  const nuevo = new Mesero(req.body);
  await nuevo.save();
  res.status(201).json(nuevo);
});

module.exports = router;

