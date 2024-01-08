const express = require("express");
const router = express.Router();
const { getBitacora, getBitacoraById, saveBitacora, deleteBitacora } = require("../controllers/bitacoraControllers");
const multer = require("multer");

/**
 * @swagger
 * tags:
 *   name: Bitácora
 *   description: Funcionamiento de la bitácora
 */

// Obtener todas las entradas de la bitácora
/**
 * @swagger
 * /bitacora:
 *   get:
 *     summary: Obtener todas las entradas de la bitácora
 *     tags: [Bitácora]
 *     responses:
 *       200:
 *         description: OK
 */

router.get("/bitacora", getBitacora);

/**
 * @swagger
 * /bitacora:
 *   get:
 *     summary: Obtener todas las entradas de la bitácora
 *     tags: [Bitácora]
 *     responses:
 *       200:
 *         description: OK
 */

router.get("/bitacora/:id", getBitacoraById);


router.post('/bitacora', saveBitacora);

// Eliminar una entrada de la bitácora
/**
 * @swagger
 * /bitacora/{id}:
 *   delete:
 *     summary: Eliminar una entrada de la bitácora
 *     tags: [Bitácora]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID de la entrada a eliminar
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

router.delete("/bitacora/:id", deleteBitacora);

module.exports = router;
