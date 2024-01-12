// Importar las dependencias necesarias
const { conexiondb } = require('../libs/db_connect');
const upload = require('../middlewares/subir_factura');

// Controlador para subir una factura al servidor
exports.saveFactura = (req, res) => {
    console.log('Guardando la factura...', req.file, req.body.amount);
    const pool = conexiondb();
    const amount = req.body.amount; // Accede al valor de "amount" desde FormData
    const filename = req.file.filename; // Accede al nombre del archivo
    const filePath = req.file.path; // Accede al path del archivo
  
    const sql = 'INSERT INTO facturas (facturas_fecha, facturas_imageURL, facturas_valor, tecnico_id) VALUES (NOW(), ?, ?, ?)';
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

exports.getFactura = async (req, res) => {
    const pool = conexiondb();

    try {
        const sql = 'SELECT * FROM facturas';
        
        const result = await pool.query(sql);

        const facturas = result[0].map(factura => ({
            imageURL: `http://146.83.194.142:1414/uploads/facturas/${factura.facturas_imageURL}`, 
            valor: factura.facturas_valor,
            fecha: factura.facturas_fecha
        }));

        res.status(200).json(facturas);
    } catch (error) {
        console.error('Error al obtener las facturas:', error);
        res.status(500).send('Error al obtener las facturas.');
    }
};
