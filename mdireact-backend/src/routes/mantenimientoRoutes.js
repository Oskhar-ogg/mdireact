const express = require("express");
const router = express.Router();
const { getMantencionesCalderas, getMantencionesCalefont, getMantenimientoCalderaCliente, getMantenimientoCalefontCliente, saveMantencionesCaldera, saveMantencionesCalefont, updateMantenimientoCaldera, updateMantenimientoCalefont, deleteMantenimientoCaldera, deleteMantenimientoCalefont } = require("../controllers/mantenimientoControllers");

/**
 * @swagger
 * tags:
 *   name: Mantenimiento
 *   description: Funcionalidades de mantenimiento
 */

// Obtener todas las mantenciones de calderas
/**
 * @swagger
 * /mantenciones/calderas:
 *   get:
 *     summary: Obtener todas las mantenciones de calderas
 *     tags: [Mantenimiento]
 *     responses:
 *       200:
 *         description: OK
 */

router.get("/mantenciones/calderas", getMantencionesCalderas);

// Obtener todas las mantenciones de calefont
/**
 * @swagger
 * /mantenciones/calefont:
 *   get:
 *     summary: Obtener todas las mantenciones de calefont
 *     tags: [Mantenimiento]
 *     responses:
 *       200:
 *         description: OK
 */

router.get("/mantenciones/calefont", getMantencionesCalefont);

// Obtener el mantenimiento de caldera de un cliente
/**
 * @swagger
 * /mantenimiento/caldera/{clienteId}:
 *   get:
 *     summary: Obtener el mantenimiento de caldera de un cliente
 *     tags: [Mantenimiento]
 *     parameters:
 *       - in: path
 *         name: clienteId
 *         description: ID del cliente
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

router.get("/mantenimiento/caldera/:id", getMantenimientoCalderaCliente);

// Obtener el mantenimiento de calefont de un cliente
/**
 * @swagger
 * /mantenimiento/calefont/{clienteId}:
 *   get:
 *     summary: Obtener el mantenimiento de calefont de un cliente
 *     tags: [Mantenimiento]
 *     parameters:
 *       - in: path
 *         name: clienteId
 *         description: ID del cliente
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

router.get("/mantenimiento/calefont/:id", getMantenimientoCalefontCliente);

// Guardar una mantención de caldera
/**
 * @swagger
 * /mantenciones/calderas:
 *   post:
 *     summary: Guardar una mantención de caldera
 *     tags: [Mantenimiento]
 *     responses:
 *       200:
 *         description: OK
 */

router.post("/mantenciones/calderas", saveMantencionesCaldera);

// Guardar una mantención de calefont
/**
 * @swagger
 * /mantenciones/calefont:
 *   post:
 *     summary: Guardar una mantención de calefont
 *     tags: [Mantenimiento]
 *     responses:
 *       200:
 *         description: OK
 */

router.post("/mantenciones/calefont", saveMantencionesCalefont);

// Actualizar el mantenimiento de caldera
/**
 * @swagger
 * /mantenimiento/caldera/{id}:
 *   put:
 *     summary: Actualizar el mantenimiento de caldera
 *     tags: [Mantenimiento]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID del mantenimiento de caldera
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

router.put("/mantenimiento/caldera/:id", updateMantenimientoCaldera);

// Actualizar el mantenimiento de calefont
/**
 * @swagger
 * /mantenimiento/calefont/{id}:
 *   put:
 *     summary: Actualizar el mantenimiento de calefont
 *     tags: [Mantenimiento]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID del mantenimiento de calefont
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

router.put("/mantenimiento/calefont/:id", updateMantenimientoCalefont);

// Eliminar el mantenimiento de caldera
/**
 * @swagger
 * /mantenimiento/caldera/{id}:
 *   delete:
 *     summary: Eliminar el mantenimiento de caldera
 *     tags: [Mantenimiento]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID del mantenimiento de caldera
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

router.delete("/mantenimiento/caldera/:id", deleteMantenimientoCaldera);

// Eliminar el mantenimiento de calefont
/**
 * @swagger
 * /mantenimiento/calefont/{id}:
 *   delete:
 *     summary: Eliminar el mantenimiento de calefont
 *     tags: [Mantenimiento]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID del mantenimiento de calefont
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

router.delete("/mantenimiento/calefont/:id", deleteMantenimientoCalefont);

module.exports = router;
