require('dotenv').config(); // Carga variables desde .env

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

// Rutas
const pedidoRoutes = require('./routes/pedido');
const productoRoutes = require('./routes/producto');
const meseroRoutes = require('./routes/mesero');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Servir archivos estáticos del frontend (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Rutas API
app.use('/api/pedidos', pedidoRoutes);
app.use('/api/productos', productoRoutes);
app.use('/api/meseros', meseroRoutes);

// Conexión a MongoDB y arrancar servidor
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("✅ MongoDB conectado correctamente");
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
    });
  })
  .catch(err => {
    console.error("❌ Error al conectar MongoDB:", err);
  });
