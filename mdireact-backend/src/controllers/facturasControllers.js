// Importar las dependencias necesarias
const conexiondb = require('../libs/db_connect');
const upload = require('../middlewares/subir_factura');

// Controlador para subir una factura al servidor
exports.saveFactura = (req, res) => {
    // Utilizar el middleware multer para subir la imagen de la factura
    upload(req, res, (err) => {
        if (err) {
            // Manejar el error de subida de la imagen
            return res.status(500).json({ error: 'Error al subir la imagen de la factura' });
        }

        // Obtener la URL de la imagen subida
        const imageUrl = req.file.path;

        // Obtener el monto y la fecha de la factura desde el cliente
        const { monto, fecha } = req.body;

        // Guardar la URL de la imagen, el monto y la fecha en la base de datos
        conexiondb.guardarFactura(imageUrl, monto, fecha)
            .then(() => {
                // Enviar una respuesta exitosa al cliente
                res.status(200).json({ message: 'Factura subida exitosamente' });
            })
            .catch((error) => {
                // Manejar el error al guardar la factura en la base de datos
                res.status(500).json({ error: 'Error al guardar la factura en la base de datos' });
            });
    });
};

// Controlador para obtener una factura del servidor
exports.getFactura = (req, res) => {
    // Obtener el ID de la factura desde el cliente
    const facturaId = req.params.id;

    // Obtener la factura desde la base de datos utilizando el ID
    conexiondb.obtenerFactura(facturaId)
        .then((factura) => {
            // Verificar si la factura existe
            if (!factura) {
                return res.status(404).json({ error: 'Factura no encontrada' });
            }

            // Enviar la factura al cliente
            res.status(200).json(factura);
        })
        .catch((error) => {
            // Manejar el error al obtener la factura desde la base de datos
            res.status(500).json({ error: 'Error al obtener la factura desde la base de datos' });
        });
};

// Controlador para eliminar una factura del servidor
exports.deleteFactura = (req, res) => {
    // Obtener el ID de la factura desde el cliente
    const facturaId = req.params.id;

    // Eliminar la factura de la base de datos utilizando el ID
    conexiondb.eliminarFactura(facturaId)
        .then(() => {
            // Enviar una respuesta exitosa al cliente
            res.status(200).json({ message: 'Factura eliminada exitosamente' });
        })
        .catch((error) => {
            // Manejar el error al eliminar la factura desde la base de datos
            res.status(500).json({ error: 'Error al eliminar la factura desde la base de datos' });
        });
};
