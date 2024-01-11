const express = require("express");
const router = express.Router();
const { getMontoTotal, getMontoMes, getGastoMesFacturas, getGastoMesBoletas} = require("../controllers/tarjetaControllers");

/**
 * @swagger
 * tags:
 *      name: Tarjeta Inicio
 *      description: Datos de la tarjeta
 */

/**
 * @swagger
 * /tarjeta/montoTotal:
 *   get:
 *     summary: Ingresos totales de la pyme
 *     tags: [Tarjeta Inicio]
 *     responses:
 *       200:
 *          description: OK
 */

router.get("/tarjeta/montoTotal", getMontoTotal);

/**
 * @swagger
 * /tarjeta/montoMes:
 *   get:
 *     summary: Ingreso mensual hasta la fecha
 *     tags: [Tarjeta Inicio]
 *     responses:
 *       200:
 *          description: OK
 */



router.get("/tarjeta/montoMes", getMontoMes);

/**
 * @swagger
 * /tarjeta/gastoMesFacturas:
 *   get:
 *     summary: Obtener el gasto total de las facturas en el mes
 *     tags: [Tarjeta Inicio]
 *     responses:
 *       200:
 *          description: OK
 */



router.get("/tarjeta/gastomesfacturas", getGastoMesFacturas);

/**
 * @swagger
 * /tarjeta/gastoMesBoletas:
 *   get:
 *     summary: Obtener el gasto total de las boletas en el mes
 *     tags: [Tarjeta Inicio]
 *     responses:
 *       200:
 *          description: OK
 */

router.get("/tarjeta/gastomesboletas", getGastoMesBoletas);

module.exports = router;