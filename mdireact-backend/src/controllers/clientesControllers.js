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


// DELETE cliente
exports.deleteCliente = (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM cliente WHERE id = ?';
    conexiondb.query(query, [id], (error, result) => {
        if (error) {
            console.error(error);
            res.status(500).json({ message: 'Error al eliminar el cliente' });
        } else {
            res.status(200).json({ message: 'Cliente eliminado correctamente' });
        }
    });
};
