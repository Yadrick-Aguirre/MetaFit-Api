const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json({ limit: '20mb' })); // Para fotos grandes en Base64

// CONEXIÓN A MONGODB ATLAS
mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://TU_USUARIO:TU_PASS@cluster0.xxxxx.mongodb.net/mundofit?retryWrites=true&w=majority')
  .then(() => console.log('MongoDB conectado - MUNDO FIT API'))
  .catch(err => console.log('Error MongoDB:', err));

// === MODELO USUARIO MUNDO FIT ===
const usuarioSchema = new mongoose.Schema({
  cedula: { type: String, required: true, unique: true },
  nombre: { type: String, required: true },
  apellidos: { type: String, required: true },
  nacionalidad: String,
  fechaNacimiento: { type: String, required: true }, // "10/10/1995"
  genero: { type: String, required: true },
  peso: { type: String, required: true },
  fotoPerfil: { type: String, default: "" } // Base64
}, { timestamps: true });

const Usuario = mongoose.model('Usuario', usuarioSchema);

// === RUTAS CRUD MUNDO FIT ===

// CREATE o UPDATE (si existe cédula, actualiza)
app.post('/api/usuarios', async (req, res) => {
  try {
    const existente = await Usuario.findOne({ cedula: req.body.cedula });
    if (existente) {
      // Actualizar
      Object.assign(existente, req.body);
      await existente.save();
      return res.json({ success: true, message: "Usuario actualizado", usuario: existente });
    }
    // Crear nuevo
    const nuevo = new Usuario(req.body);
    await nuevo.save();
    res.status(201).json({ success: true, message: "Usuario creado", usuario: nuevo });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// READ - Buscar por cédula
app.get('/api/usuarios/:cedula', async (req, res) => {
  try {
    const usuario = await Usuario.findOne({ cedula: req.params.cedula });
    if (!usuario) return res.status(404).json({ success: false, message: "No encontrado" });
    res.json({ success: true, usuario });
  } catch (err) {
    res.status(500).json({ success: false });
  }
});

// READ ALL - Lista completa
app.get('/api/usuarios', async (req, res) => {
  try {
    const usuarios = await Usuario.find().sort({ createdAt: -1 });
    res.json({ success: true, usuarios });
  } catch (err) {
    res.status(500).json({ success: false });
  }
});

// DELETE - Por cédula
app.delete('/api/usuarios/:cedula', async (req, res) => {
  try {
    const result = await Usuario.findOneAndDelete({ cedula: req.params.cedula });
    if (!result) return res.status(404).json({ success: false, message: "No encontrado" });
    res.json({ success: true, message: "Usuario eliminado" });
  } catch (err) {
    res.status(500).json({ success: false });
  }
});

// PRUEBA
app.get('/', (req, res) => {
  res.json({ 
    mensaje: "MUNDO FIT API - CRUD COMPLETO", 
    rutas: {
      crear_actualizar: "POST /api/usuarios",
      buscar: "GET /api/usuarios/123456789",
      listar: "GET /api/usuarios",
      eliminar: "DELETE /api/usuarios/123456789"
    }
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`MUNDO FIT API corriendo en el puerto ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});
