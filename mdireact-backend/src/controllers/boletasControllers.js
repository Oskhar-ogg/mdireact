const { conexiondb } = require('../libs/db_connect');
const upload = require('../middlewares/subir_boleta');

exports.saveBoleta = async (req, res) => {
    console.log('Guardando la boleta...', req.file, req.body.amount);
    const pool = conexiondb();
    const amount = req.body.amount; // Accede al valor de "amount" desde FormData
    const filename = req.file.filename; // Accede al nombre del archivo
    const filePath = req.file.path; // Accede al path del archivo

    const sql = 'INSERT INTO boletas (boletas_fecha, boletas_imageURL, boletas_valor, tecnico_id) VALUES (NOW(), ?, ?, ?)';
    const values = [filename, amount, 1]; // Asigna los valores para la consulta SQL

    pool.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error al insertar en la base de datos:', err);
            return res.status(500).json({ error: 'Error al insertar en la base de datos.' });
        }
        res.status(200).json({ message: 'Imagen y monto subidos correctamente a la base de datos' });
    });
    res.status(201).send('Imagen y monto subidos correctamente a la base de datos');
};

exports.getBoleta = async (req, res) => {
    try {
        const pool = conexiondb(); 
        const [rows] = await pool.query('SELECT * FROM boletas');
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


// Controlador para eliminar una boleta
exports.deleteBoleta = (req, res) => {
    const boletaId = req.params.id;

    
    conexiondb.eliminarBoleta(boletaId)
        .then(() => {
            // Enviar una respuesta exitosa al cliente
            res.status(200).json({ message: 'Boleta eliminada exitosamente' });
        })
        .catch((error) => {
            // Manejar el error si ocurre durante la operación en la base de datos
            res.status(500).json({ error: 'Error al eliminar la boleta de la base de datos' });
        });
};
