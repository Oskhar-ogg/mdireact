const { conexiondb } = require('../libs/db_connect');

exports.getMontoTotal = async (req, res) => {
    try {
        const pool = conexiondb();
        const [rows] = await pool.query('SELECT * FROM MontoTotal ')
        const data = rows.map(row => row.Ingreso_Total_Pyme);

        res.json(data);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.getMontoMes = async (req, res) => {
    try {
        const pool = conexiondb();
        const [rows] = await pool.query('SELECT * FROM MontoMes ')
        const data = rows.map(row => row.Monto_Mes);

        res.json(data);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.getGastoMesFacturas = async (req, res) => {
    try {
        const pool = conexiondb();
        const [rows] = await pool.query('SELECT * FROM Gastomesfacturas ')
        res.json(rows);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.getGastoMesBoletas = async (req, res) => {
    try {
        const pool = conexiondb();
        const [rows] = await pool.query('SELECT * FROM Gastomesboletas ')
        res.json(rows);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}