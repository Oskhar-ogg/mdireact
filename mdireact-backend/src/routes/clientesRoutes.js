const express = require("express");
const router = express.Router();
const { getClientes, saveCliente, deleteCliente } = require('../controllers/clientesControllers');

/**
 * @swagger
 * tags:
 *   name: Clientes
 *   description: Funcionamiento de la ventana de clientes
 */

// Obtener todos los clientes registrados
/**
 * @swagger
 * /clientes:
 *   get:
 *     summary: Obtener todos los clientes registrados
 *     tags: [Clientes]
 *     responses:
 *       200:
 *         description: OK
 */
router.get("/clientes", getClientes);

// Crear un nuevo cliente
/**
 * @swagger
 * /clientes:
 *   post:
 *     summary: Crear un nuevo cliente
 *     tags: [Clientes]
 *     responses:
 *       200:
 *         description: OK
 */
router.post("/clientes", saveCliente);

// Eliminar un cliente
/**
 * @swagger
 * /clientes/{id}:
 *   delete:
 *     summary: Eliminar un cliente
 *     tags: [Clientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID del cliente a eliminar
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */
router.delete("/clientes/:id", deleteCliente);

module.exports = router;
