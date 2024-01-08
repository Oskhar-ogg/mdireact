const express = require("express");
const router = express.Router();
const upload = require("../middlewares/subir_boleta");
const { getBoleta, saveBoleta, deleteBoleta } = require("../controllers/boletasControllers");

/**
 * @swagger
 * tags:
 *  name: Boletas
 *  description: Funcionamiento de las boletas
 */

// Obtener todas las boletas
/**
 * @swagger
 * /boletas:
 *  get:
 *    summary: Obtener todas las boletas
 *    tags: [Boletas]
 *    responses:
 *      200:
 *        description: OK
 */
router.get("/boletas", getBoleta);

// Crear una nueva boleta
/**
 * @swagger
 * /boletas:
 *  post:
 *    summary: Crear una nueva boleta
 *    tags: [Boletas]
 *    responses:
 *      200:
 *        description: OK
 */
router.post("/boletas", upload.single('file'), saveBoleta, (req, res, ) => {
    // Check if a file was provided
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }
    res.send('File uploaded successfully');
});
module.exports = router;