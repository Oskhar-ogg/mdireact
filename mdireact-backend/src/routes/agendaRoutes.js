const express = require("express");
const router = express.Router();
const { getAgenda, saveAgenda, deleteAgenda } = require("../controllers/agendaControllers");

/**
 * @swagger
 * tags:
 *   name: Agenda
 *   description: Funcionamiento de la agenda calendario
 */

// Obtener todos los eventos de la agenda
/**
 * @swagger
 * /agenda:
 *   get:
 *     summary: Obtener todos los eventos de la agenda
 *     tags: [Agenda]
 *     responses:
 *       200:
 *         description: OK
 */

router.get("/agenda", getAgenda);

// Crear un nuevo evento en la agenda
/**
 * @swagger
 * /agenda:
 *   post:
 *     summary: Crear un nuevo evento en la agenda
 *     tags: [Agenda]
 *     responses:
 *       200:
 *         description: OK
 */

router.post("/agenda", saveAgenda);

// Eliminar un evento de la agenda
/**
 * @swagger
 * /agenda/{id}:
 *   delete:
 *     summary: Eliminar un evento de la agenda
 *     tags: [Agenda]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID del evento a eliminar
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

router.delete("/agenda/:id", deleteAgenda);

module.exports = router;
