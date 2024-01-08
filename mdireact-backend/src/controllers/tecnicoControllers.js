const path = require('path');
const { conexiondb } = require('../libs/db_connect');
const { readFile, writeFile } = require('fs').promises;

 exports.getTecnico = async (req, res) => {
        try {
            const pool = conexiondb();
            const [tecnico] = await pool.query("SELECT * FROM tecnico");
            res.json(tecnico);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error al obtener el técnico" });
        }
    };

exports.updateProfileImage = async (req, res) => {
    try {
        const imageFile = req.file;
        if (!imageFile) {
            return res.status(400).json({ message: "No se ha enviado ninguna imagen" });
        }

        const imagePath = path.join(__dirname, '..', 'images', 'tecnico', 'profile.jpg');
        const imageBuffer = await readFile(imageFile.path);
        await writeFile(imagePath, imageBuffer);

        res.json({ message: "Imagen de perfil actualizada correctamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al actualizar la imagen de perfil" });
    }
};

exports.updateQRCode = async (req, res) => {
    try {
        const imageFile = req.file;
        if (!imageFile) {
            return res.status(400).json({ message: "No se ha enviado ninguna imagen" });
        }

        const imagePath = path.join(__dirname, '..', 'images', 'tecnico', 'qr_sec.png');
        const imageBuffer = await readFile(imageFile.path);
        await writeFile(imagePath, imageBuffer);

        res.json({ message: "Imagen actualizada correctamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al actualizar la imagen" });
    }
};
