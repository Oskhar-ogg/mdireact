const { conexiondb } = require('../libs/db_connect');

exports.getMantencionesCalderas = async (req, res) => {
    try {
        const pool = conexiondb();
        const [rows] = await pool.query('SELECT * FROM mantenimiento_caldera');
        res.json(rows);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.saveMantencionesCaldera = async (req, res) => {
    try {
        const pool = conexiondb();
        const [rows] = await pool.query('INSERT INTO mantenimiento_caldera SET ?', [req.body]);
        res.json(rows);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.getMantencionesCalefont = async (req, res) => {
    try {
        const pool = conexiondb();
        const [rows] = await pool.query('SELECT * FROM mantenimiento_calefont');
        res.json(rows);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.saveMantencionesCalefont = async (req, res) => {
    try {
        const pool = conexiondb();
        const [rows] = await pool.query('INSERT INTO mantenimiento_calefont SET ?', [req.body]);
        res.json(rows);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.getMantenimientoCalderaCliente = async (req, res) => {
    console.log("Cliente ID:", req.params.id);
    try {
        const db = await conexiondb();
        const [rows] = await db.query(`
            SELECT mc.*, c.*, cl.*
            FROM mantenimiento_caldera mc
            JOIN caldera c ON mc.caldera_id = c.caldera_id
            JOIN cliente cl ON mc.cliente_id = cl.cliente_id
            WHERE mc.cliente_id = ?;
        `, [req.params.id]);

        if (rows.length === 0) {
            return res.status(404).json({ message: 'No hay datos registrados para este cliente en mantenimiento de calderas.' });
        }
        console.log(rows);
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// Endpoint para obtener mantenimiento de calefonts para un cliente específico
exports.getMantenimientoCalefontCliente = async (req, res) => {
    console.log("Cliente ID:", req.params.id);
    try {
        const db = await conexiondb();
        const [rows] = await db.query(`
            SELECT mc.*, cf.*, cl.*
            FROM mantenimiento_calefont mc
            JOIN calefont cf ON mc.calefont_id = cf.calefont_id
            JOIN cliente cl ON mc.cliente_id = cl.cliente_id
            WHERE mc.cliente_id = ?;
        `, [req.params.id]);

        if (rows.length === 0) {
            return res.status(404).json({ message: 'No hay datos registrados para este cliente en mantenimiento de calefonts.' });
        }
        console.log(rows);
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}



exports.getMantenimientoCalderaTecnico = async (req, res) => {
    try {
        const pool = conexiondb();
        const [rows] = await pool.query('SELECT * FROM mantenimiento_caldera WHERE tecnico_id = ?', [req.params.id]);
        res.json(rows);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.getMantenimientoCalefontTecnico = async (req, res) => {
    try {
        const pool = conexiondb();
        const [rows] = await pool.query('SELECT * FROM mantenimiento_calefont WHERE tecnico_id = ?', [req.params.id]);
        res.json(rows);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.updateMantenimientoCaldera = async (req, res) => {
    try {
        const pool = conexiondb();
        const [rows] = await pool.query('UPDATE mantenimiento_caldera SET ? WHERE id = ?', [req.body, req.params.id]);
        res.json(rows);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }

}

exports.updateMantenimientoCalefont = async (req, res) => {
    try {
        const pool = conexiondb();
        const [rows] = await pool.query('UPDATE mantenimiento_calefont SET ? WHERE id = ?', [req.body, req.params.id]);
        res.json(rows);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }

}

exports.deleteMantenimientoCaldera = async (req, res) => {
    try {
        const pool = conexiondb();
        const [rows] = await pool.query('DELETE FROM mantenimiento_caldera WHERE id = ?', [req.params.id]);
        res.json(rows);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }

}

exports.deleteMantenimientoCalefont = async (req, res) => {
    try {
        const pool = conexiondb();
        const [rows] = await pool.query('DELETE FROM mantenimiento_calefont WHERE id = ?', [req.params.id]);
        res.json(rows);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }

}


