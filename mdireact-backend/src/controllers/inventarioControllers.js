const { conexiondb } = require("../libs/db_connect");

exports.getInventarioCaldera = async (req, res) => {
    try {
        const pool = conexiondb();
        const [rows] = await pool.query('SELECT * FROM inventario_caldera');
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

exports.getInventarioCalefont = async (req, res) => {
    try {
        const pool = conexiondb();
        const [rows] = await pool.query('SELECT * FROM inventario_calefont');
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

exports.getInventarioEquipo = async (req, res) => {
    try {
        const pool = conexiondb();
        const [rows] = await pool.query('SELECT * FROM inventario_equipo_electrico');
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

exports.getInventarioRedgas = async (req, res) => {
    try {
        const pool = conexiondb();
        const [rows] = await pool.query('SELECT * FROM inventario_red_gas');
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

exports.getInventarioRedagua = async (req, res) => {
    try {
        const pool = conexiondb();
        const [rows] = await pool.query('SELECT * FROM inventario_red_agua');
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

//ZONA GUARDADO DE INVENTARIO

exports.saveInventarioCaldera = async (req, res) => {
    try {
        const pool = await conexiondb();
        const [rows] = await pool.query('INSERT INTO inventario_caldera SET ?', [req.body]);
        res.json({
            id: rows.insertId,
            ...req.body
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

exports.saveInventarioCalefont = async (req, res) => {
    try {
        const pool = await conexiondb();
        const [rows] = await pool.query('INSERT INTO inventario_calefont SET ?', [req.body]);
        res.json({
            id: rows.insertId,
            ...req.body
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

exports.saveInventarioEquipo = async (req, res) => {
    try {
        const pool = await conexiondb();
        const [rows] = await pool.query('INSERT INTO inventario_equipo_electrico SET ?', [req.body]);
        res.json({
            id: rows.insertId,
            ...req.body
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

exports.saveInventarioRedgas = async (req, res) => {
    try {
        const pool = await conexiondb();
        const [rows] = await pool.query('INSERT INTO inventario_red_gas SET ?', [req.body]);
        res.json({
            id: rows.insertId,
            ...req.body
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

exports.saveInventarioRedagua = async (req, res) => {
    try {
        const pool = await conexiondb();
        const [rows] = await pool.query('INSERT INTO inventario_red_agua SET ?', [req.body]);
        res.json({
            id: rows.insertId,
            ...req.body
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

// BORRAR ELEMENTOS DE INVENTARIO

exports.deleteInventarioCaldera = async (req, res) => {
    try {
        const { id } = req.body;
        const pool = await conexiondb();
        const [rows] = await pool.query('DELETE FROM inventario_caldera WHERE id = ?', [id]);
        res.json({
            id: rows.insertId,
            ...req.body
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }

}

exports.deleteInventarioCalefont = async (req, res) => {
    try {
        const { id } = req.body;
        const pool = await conexiondb();
        const [rows] = await pool.query('DELETE FROM inventario_calefont WHERE id = ?', [id]);
        res.json({
            id: rows.insertId,
            ...req.body
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }

}

exports.deleteInventarioEquipo = async (req, res) => {
    try {
        const { id } = req.body;
        const pool = await conexiondb();
        const [rows] = await pool.query('DELETE FROM inventario_equipo_electrico WHERE id = ?', [id]);
        res.json({
            id: rows.insertId,
            ...req.body
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }

}

exports.deleteInventarioRedgas = async (req, res) => {
    try {
        const { id } = req.body;
        const pool = await conexiondb();
        const [rows] = await pool.query('DELETE FROM inventario_red_gas WHERE id = ?', [id]);
        res.json({
            id: rows.insertId,
            ...req.body
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }

}   

exports.deleteInventarioRedagua = async (req, res) => {
    try {
        const { id } = req.body;
        const pool = await conexiondb();
        const [rows] = await pool.query('DELETE FROM inventario_red_agua WHERE id = ?', [id]);
        res.json({
            id: rows.insertId,
            ...req.body
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }

}

// ACTUALIZAR ELEMENTOS DE INVENTARIO

exports.updateInventarioCaldera = async (req, res) => {
    console.log('Cuerpo de la Solicitud:', req.body);
    try {
        const { inv_cal_id } = req.body;
        const { inv_cal_cantidad } = req.body;
        const pool = await conexiondb();
        const [rows] = await pool.query('UPDATE inventario_caldera SET inv_cal_cantidad = ' + inv_cal_cantidad + ' WHERE inv_cal_id = ' + inv_cal_id);
        res.json({
            id: inv_cal_id,
            inv_cal_cantidad,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.updateInventarioCalefont = async (req, res) => {
    console.log('Cuerpo de la Solicitud:', req.body);
    try {
        const { inv_calefont_id } = req.body;
        const { inv_calefont_cantidad } = req.body;
        const pool = await conexiondb();
        const [rows] = await pool.query('UPDATE inventario_calefont SET inv_calefont_cantidad = ' + inv_calefont_cantidad + ' WHERE inv_calefont_id = ' + inv_calefont_id);
        res.json({
            id: inv_calefont_id,
            inv_calefont_cantidad,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.updateInventarioEquipo = async (req, res) => {
    try {
        const { inv_equipo_id } = req.body;
        const { inv_equipo_cantidad } = req.body;
        const pool = await conexiondb();
        const [rows] = await pool.query('UPDATE inventario_equipo_electrico SET inv_equipo_cantidad = ' + inv_equipo_cantidad + ' WHERE inv_equipo_id = ' + inv_equipo_id);
        res.json({
            id: inv_equipo_id,
            inv_equipo_cantidad,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.updateInventarioRedgas = async (req, res) => {
    try {
        const { inv_red_gas_id } = req.body;
        const { inv_red_gas_cantidad } = req.body;
        const pool = await conexiondb();
        const [rows] = await pool.query('UPDATE inventario_red_gas SET inv_red_gas_cantidad = ' + inv_red_gas_cantidad + ' WHERE inv_red_gas_id = ' + inv_red_gas_id);
        res.json({
            id: inv_red_gas_id,
            inv_red_gas_cantidad,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.updateInventarioRedagua = async (req, res) => {
    try {
        const { inv_red_agua_id } = req.body;
        const { inv_red_agua_cantidad } = req.body;
        const pool = await conexiondb();
        const [rows] = await pool.query('UPDATE inventario_red_agua SET inv_red_agua_cantidad = ' + inv_red_agua_cantidad + ' WHERE inv_red_agua_id = ' + inv_red_agua_id);
        res.json({
            id: inv_red_agua_id,
            inv_red_agua_cantidad,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
