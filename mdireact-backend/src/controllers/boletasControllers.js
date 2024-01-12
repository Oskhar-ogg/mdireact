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
    const pool = conexiondb();
    try {
        const sql = 'SELECT * FROM boletas';
        
        const result = await pool.query(sql);

        const boletas = result[0].map(boleta => ({
            imageURL: `http://146.83.194.142:1414/uploads/boletas/${boleta.boletas_imageURL}`,
            valor: boleta.boletas_valor,
            fecha: boleta.boletas_fecha
        }));
        res.status(200).json(boletas);
    } catch (error) {
        console.error('Error al obtener las boletas:', error);
        res.status(500).send('Error al obtener las boletas.');
    }
}

