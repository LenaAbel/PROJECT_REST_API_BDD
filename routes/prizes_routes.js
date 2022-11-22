const controller = require("../controllers/controller");
const express = require("express");
var router = express.Router();

// http://localhost:3000/prizes
router.get("/", controller.numberPrizesF3);
/**
 * @swagger
 * /prizes:
 *   get:
 *      description: Get total number of offered prizes (F3)
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

// http://localhost:3000/prizes/superWinners
router.get("/superWinners", controller.moreThanOnePrizeF5);
/**
 * @swagger
 * /prizes/superWinners:
 *   get:
 *      description: Get the number of laureates who received more than one prize (F5)
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

// http://localhost:3000/prizes:idLaureate?
router.get("/:idLaureate?", controller.getLaureatesPrizesF9);
/**
 * @swagger
 * /prizes/{idLaureate}:
 *   get:
 *      description: For a given winner ID, display the prizes won (first name, last name, year, category and motivation) (F9)
 *      tags:
 *          - PRIZES
 *      parameters:
 *          - in: path
 *            name: idLaureate
 *            type: integer
 *            required: false
 *            description: Numeric ID of the laureate to get (Optional)
 *      responses:
 *          '200':
 *              description: Resource added successfully
 *          '500':
 *              description: Internal server error
 *          '400':
 *              description: Bad request
 */

module.exports = router;