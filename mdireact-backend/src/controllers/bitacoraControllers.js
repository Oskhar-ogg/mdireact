const { conexiondb } = require('../libs/db_connect');

exports.getBitacora = async (req, res) => {
    try {
        const db = conexiondb();
        const [rows] = await db.query('SELECT * FROM bitacora');
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

 exports.saveBitacora = async (req, res) => {

    try {
      console.log(req.body); // Agregar esta línea para verificar los datos recibidos
      const connect = conexiondb();
      const fechaParts = req.body.bitacora_fecha.split('-'); // Suponiendo que el formato original es 'DD/MM/YYYY'
      const formattedFecha = `${fechaParts[2]}-${fechaParts[1]}-${fechaParts[0]}`;
      req.body.bitacora_fecha = formattedFecha;
      const [results] = await connect.query(
        'INSERT INTO bitacora  (bitacora_title, bitacora_description, bitacora_trabajo ,bitacora_estado, bitacora_valor_cobrado, bitacora_fecha, tecnico_id) VALUES ( ?, ?, ?, ?, ?, ?, ?)',
        [req.body.bitacora_title, req.body.bitacora_description, req.body.bitacora_trabajo, req.body.bitacora_estado, req.body.bitacora_valor_cobrado, req.body.bitacora_fecha, req.body.tecnico_id]
      );
      
      res.json({
        id: results.insertId,
        ...req.body,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

exports.deleteBitacora = async (req, res) => {
    try {
        const db = conexiondb();
        const { id } = req.params;
        const [rows] = await db.query('DELETE FROM bitacora WHERE bitacora_id = ?', [id]);
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.getBitacoraById = async (req, res) => {
    try{
        const db = conexiondb();
        const { id } = req.params;
        const [rows] = await db.query('SELECT * FROM bitacora WHERE bitacora_id = ?', [id]);
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
