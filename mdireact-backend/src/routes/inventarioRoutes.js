const express = require("express");
const router = express.Router();
const {
  getInventarioCaldera,
  getInventarioCalefont,
  getInventarioEquipo,
  getInventarioRedagua,
  getInventarioRedgas,
  saveInventarioCaldera,
  saveInventarioCalefont,
  saveInventarioEquipo,
  saveInventarioRedagua,
  saveInventarioRedgas,
  deleteInventarioCaldera,
  deleteInventarioCalefont,
  deleteInventarioEquipo,
  deleteInventarioRedagua,
  deleteInventarioRedgas,
  updateInventarioCaldera,
  updateInventarioCalefont,
  updateInventarioEquipo,
  updateInventarioRedagua,
  updateInventarioRedgas,
} = require("../controllers/inventarioControllers");

/**
 * @swagger
 * tags:
 *   name: Inventario 
 *   description: API para el manejo del inventario de repuestos
 */

/**
 * @swagger
 * /inv_caldera:
 *   get:
 *     summary: Obtener el inventario de calderas
 *     tags: [Inventario]
 *     responses:
 *       200:
 *         description: OK
 */
router.get("/inv_caldera", getInventarioCaldera);

/**
 * @swagger
 * /inv_caldera:
 *   post:
 *     summary: Guardar un nuevo repuesto de caldera
 *     tags: [Inventario]
 *     responses:
 *       200:
 *         description: OK
 */


router.post("/inv_caldera", saveInventarioCaldera);


/**
 * @swagger
 * /inv_caldera/{id}:
 *   patch:
 *     summary: Actualizar un repuesto de caldera
 *     tags: [Inventario]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID del repuesto de caldera a actualizar
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */
router.patch("/inv_caldera/:id", updateInventarioCaldera);

/**
 * @swagger
 * /inv_caldera/{id}:
 *   delete:
 *     summary: Eliminar un repuesto de caldera
 *     tags: [Inventario]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID del repuesto de caldera a eliminar
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */
router.delete("/inv_caldera/:id", deleteInventarioCaldera);


/**
 * @swagger
 * /inv_calefont:
 *   get:
 *     summary: Obtener el inventario de calefont
 *     tags: [Inventario]
 *     responses:
 *       200:
 *         description: OK
 */

router.get("/inv_calefont", getInventarioCalefont);

/**
 * @swagger
 * /inv_calefont:
 *   post:
 *     summary: Guardar un nuevo repuesto de calefont
 *     tags: [Inventario]
 *     responses:
 *       200:
 *         description: OK
 */

router.post("/inv_calefont", saveInventarioCalefont);

/**
 * @swagger
 * /inv_calefont/{id}:
 *   patch:
 *     summary: Actualizar un repuesto de calefont
 *     tags: [Inventario]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID del repuesto de calefont a actualizar
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */
router.patch("/inv_calefont/:id", updateInventarioCalefont);

/**
 * @swagger
 * /inv_calefont/{id}:
 *   delete:
 *     summary: Eliminar un repuesto de calefont
 *     tags: [Inventario]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID del repuesto de calefont a eliminar
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */
router.delete("/inv_calefont/:id", deleteInventarioCalefont);




/**
 * @swagger
 * /inv_equipo:
 *   get:
 *     summary: Obtener el inventario de equipos eléctricos
 *     tags: [Inventario]
  *     responses:
 *       200:
 *         description: OK
 */

router.get("/inv_equipo", getInventarioEquipo);


/**
 * @swagger
 * /inv_equipo:
 *   post:
 *     summary: Guardar un nuevo repuesto de equipo eléctrico
 *     tags: [Inventario]
 *     responses:
 *       200:
 *         description: OK
 */

router.post("/inv_equipo", saveInventarioEquipo);

/**
 * @swagger
 * /inv_equipo/{id}:
 *   patch:
 *     summary: Actualizar un repuesto de equipo eléctrico
 *     tags: [Inventario]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID del repuesto de equipo eléctrico a actualizar
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */
router.patch("/inv_equipo/:id", updateInventarioEquipo);


/**
 * @swagger
 * /inv_equipo/{id}:
 *   delete:
 *     summary: Eliminar un repuesto de equipo eléctrico
 *     tags: [Inventario]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID del repuesto de equipo eléctrico a eliminar
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */
router.delete("/inv_equipo/:id", deleteInventarioEquipo);


/**
 * @swagger
 * /inv_redagua:
 *   get:
 *     summary: Obtener el inventario de red de agua
 *     tags: [Inventario]
 *     responses:
 *       200:
 *         description: OK
 */
  
 
router.get("/inv_redagua", getInventarioRedagua);

/**
 * @swagger
 * /inv_redagua:
 *   post:
 *     summary: Guardar un nuevo repuesto de red de agua
 *     tags: [Inventario]
 *     responses:
 *       200:
 *         description: OK
 */

router.post("/inv_redagua", saveInventarioRedagua);

/**
 * @swagger
 * /inv_redagua/{id}:
 *   patch:
 *     summary: Actualizar un repuesto de red de agua
 *     tags: [Inventario]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID del repuesto de red de agua a actualizar
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */
router.patch("/inv_redagua/:id", updateInventarioRedagua);


/**
 * @swagger
 * /inv_redagua/{id}:
 *   delete:
 *     summary: Eliminar un repuesto de red de agua
 *     tags: [Inventario]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID del repuesto de red de agua a eliminar
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */
router.delete("/inv_redagua/:id", deleteInventarioRedagua);


/**
 * @swagger
 * /inv_redgas:
 *   get:
 *     summary: Obtener el inventario de red de gas
 *     tags: [Inventario]
 *     responses:
 *       200:
 *         description: OK
 */


router.get("/inv_redgas", getInventarioRedgas);


/**
 * @swagger
 * /inv_redgas:
 *   post:
 *     summary: Guardar un nuevo repuesto de red de gas
 *     tags: [Inventario]
 *     responses:
 *       200:
 *         description: OK
 */

router.post("/inv_redgas", saveInventarioRedgas);


/**
 * @swagger
 * /inv_redgas/{id}:
 *   patch:
 *     summary: Actualizar un repuesto de red de gas
 *     tags: [Inventario]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID del repuesto de red de gas a actualizar
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */
router.patch("/inv_redgas/:id", updateInventarioRedgas);

/**
 * @swagger
 * /inv_redgas/{id}:
 *   delete:
 *     summary: Eliminar un repuesto de red de gas
 *     tags: [Inventario]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID del repuesto de red de gas a eliminar
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */
router.delete("/inv_redgas/:id", deleteInventarioRedgas);






module.exports = router;
