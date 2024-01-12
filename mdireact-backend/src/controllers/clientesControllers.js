const { conexiondb } = require('../libs/db_connect');

// GET clientes
exports.getClientes = async (req, res) => {
    try{
    const db = conexiondb();
    const [rows] = await db.query('SELECT * FROM cliente JOIN comuna ON cliente.comuna_id = comuna.comuna_id');
        res.json(rows);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({error: 'Internal Server Error'});
    }
}

exports.saveCliente = async (req, res) => {
    try {
        const db = conexiondb();
        await db.query('INSERT INTO cliente SET ?', [req.body]);
        res.json({message: 'Cliente guardado correctamente'});
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Internal Server Error'});
    }
    } 


    exports.deleteCliente =  async (req, res) => {
        console.log('DELETE cliente', req.params);
        const pool = conexiondb();
        const { id } = req.params;
        const borrarcliente = await pool.query('DELETE FROM `cliente` WHERE `cliente`.`cliente_id` = ?', [id]);
        res.json({message: 'Cliente eliminado correctamente'});
    }
    
       