const controller = require("../controllers/controller");
const express = require("express");
var router = express.Router();


// http://localhost:3000/prizes/superWinners
router.get("/superWinners", controller.moreThanOnePrizeF3);
/**
 * @swagger
 * /prizes/superWinners:
 *   get:
 *      description: Get the number of laureates who received more than one prize (F3)
 *      tags:
 *          - PRIZES
 *      responses:
 *          '200':
 *              description: Resource added successfully
 *          '500':
 *              description: Internal server error
 *          '400':
 *              description: Bad request
 */


module.exports = router;