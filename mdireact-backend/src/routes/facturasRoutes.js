const express = require("express");
const router = express.Router();
const upload = require("../middlewares/subir_factura");
const { getFactura, saveFactura} = require("../controllers/facturasControllers");

/**
 * @swagger
 * tags:
 *   name: Facturas
 *   description: Funcionamiento de las facturas
 */

// Obtener todas las facturas
/**
 * @swagger
 * /facturas:
 *  get:
 *    summary: Obtener todas las facturas
 *    tags: [Facturas]
 *    responses:
 *      200:
 *        description: OK
 */
router.get("/facturas", getFactura);

// Crear una nueva factura
/**
 * @swagger
 * /facturas:
 *  post:
 *    summary: Crear una nueva factura
 *    tags: [Facturas]
 *    responses:
 *      200:
 *        description: OK
 */
router.post("/facturas", upload.single("file"), saveFactura, (req, res) =>{
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }
    res.status(201).send('File uploaded successfully');
});

module.exports = router;