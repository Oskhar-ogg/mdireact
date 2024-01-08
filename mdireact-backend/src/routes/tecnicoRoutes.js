const express = require("express");
const router = express.Router();
const {getTecnico, uploadProfileImage, uploadQRCode} = require("../controllers/tecnicoControllers");

/**
 * @swagger
 * tags:
 *   name: Técnico
 *   description: Modificación y obtención de datos del técnico
 */

/**
 * @swagger
 * /tecnico:
 *   get:
 *     summary: Obtener la información del técnico desde el servidor
 *     tags: [Técnico]
 *     responses:
 *       200:
 *         description: OK
 */
router.get("/tecnico", getTecnico);

module.exports = router;
