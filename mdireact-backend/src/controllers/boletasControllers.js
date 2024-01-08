const { conexiondb } = require('../libs/db_connect');
const upload = require('../middlewares/subir_boleta');

exports.saveBoleta = async (req, res) => {
    const connection = conexiondb(); // Assuming conexiondb returns a MySQL connection

    try {
        await connection.beginTransaction();

        upload.fields(req, res, async (err) => {
            if (err) {
                console.error('Error uploading file:', err);
                await connection.rollback();
                return res.status(500).json({ error: 'Error al subir la boleta' });
            }

            const imageUrl = req.file.path;
            const { monto, fecha } = req.body;

            const query = `INSERT INTO boletas (boletas_fecha, boletas_imageURL, boletas_valor, tecnico_id) VALUES (?, ?, ?, 1)`;
            const values = [fecha, imageUrl, monto];

            try {
                await connection.query(query, values);
                await connection.commit();
                res.status(200).json({ message: 'Boleta subida exitosamente' });
            } catch (error) {
                console.error('Error executing query:', error);
                await connection.rollback();
                res.status(500).json({ error: 'Error al subir la boleta' });
            } finally {
                connection.end(); // Close the connection after committing or rolling back
            }
        });
    } catch (error) {
        console.error('Error in saveBoleta:', error);
        res.status(500).json({ error: 'Error al subir la boleta' });
    }
};



exports.getBoleta = async (req, res) => {
    try {
        const pool = conexiondb(); // Assuming conexiondb returns a MySQL pool
        const [rows] = await pool.query('SELECT * FROM boletas');
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


// Controlador para eliminar una boleta
exports.deleteBoleta = (req, res) => {
    // Obtener el ID de la boleta desde el cliente
    const boletaId = req.params.id;

    // Eliminar la boleta de la base de datos utilizando el ID
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
