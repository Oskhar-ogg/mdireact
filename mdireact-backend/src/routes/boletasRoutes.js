const express = require("express");
const router = express.Router();
const upload = require("../middlewares/subir_boleta");
const { getBoleta, saveBoleta} = require("../controllers/boletasControllers");

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
router.post("/boletas", upload.single('file'), saveBoleta, (req, res) => {
    console.log('Datos en la boleta...', req.file, req.body);
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }
    res.status(201).send('File uploaded successfully');
});
module.exports = router;