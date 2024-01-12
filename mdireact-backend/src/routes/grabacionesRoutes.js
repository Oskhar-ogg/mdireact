const express = require('express');
const multer = require('multer');
const { conexiondb } = require('../libs/db_connect');

const router = express.Router();
const upload = multer({ dest: 'uploads/audio' });

// Configurar ruta para subir grabaciones
router.post('/subir/grabacion', upload.single('file'), (req, res) => {
  const { file, body } = req;

  // Obtener información del archivo y datos adicionales
  const nombreArchivo = file.originalname;
  const duracion = body.duration;

  // Conectar a la base de datos
  const pool = conexiondb();

  // Insertar datos en la base de datos
  const sql = 'INSERT INTO grabado_voz (grabado_voz_archivo, grabado_voz_texto, tecnico_id) VALUES (?, ?, ?)';
  const values = [nombreArchivo, duracion, 1]; // 1 es un ejemplo, debes ajustar el ID del técnico según tu lógica

  pool.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error al insertar en la base de datos:', err);
      return res.status(500).json({ error: 'Error al insertar en la base de datos.' });
    }

    // Enviar respuesta al cliente
    res.status(200).json({ message: 'Grabación subida y guardada correctamente' });
  });
});

module.exports = router;
