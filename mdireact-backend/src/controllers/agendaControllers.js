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
        const pool = await conexiondb();
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
        const [rows] = await pool.query('DELETE FROM agenda WHERE id = ?', [req.params.id]);
        res.json({
            affectedRows: rows.affectedRows
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
