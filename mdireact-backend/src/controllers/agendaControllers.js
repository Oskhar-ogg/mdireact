const { conexiondb } = require("../libs/db_connect");

exports.getAgenda = async (req, res) => {
    try {
        const pool = conexiondb();
        const [rows] = await pool.query('SELECT * FROM agenda');
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

exports.saveAgenda = async (req, res) => {

    try {
        console.log(req.body); // Agregar esta línea para verificar los datos recibidos
        const pool = conexiondb();
        const fechaParts = req.body.agenda_fecha.split('-'); // Suponiendo que el formato original es 'DD/MM/YYYY'
        const formattedFecha = `${fechaParts[2]}-${fechaParts[1]}-${fechaParts[0]}`;
        req.body.agenda_fecha = formattedFecha;
        const [rows] = await pool.query('INSERT INTO agenda SET ?', [req.body]);
        res.json({
            id: rows.insertId,
            ...req.body
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

exports.deleteAgenda = async (req, res) => {
    try {
        const pool = await conexiondb();
        const [rows] = await pool.query('DELETE FROM agenda WHERE agenda_id = ?', [req.params.id]);
        res.json({
            affectedRows: rows.affectedRows
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
