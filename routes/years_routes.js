const controller = require("../controllers/controller");
const express = require("express");
var router = express.Router();


// http://localhost:3000/years
router.get("/", controller.allYearsPrizesSortedF8);
/**
 * @swagger
 * /years:
 *   get:
 *      description:  Used to display all years of Nobel Prizes sorted by number of ascending/descending laureates. (F8)
 *      tags:
 *          - YEARS
 *      parameters:
 *          - in: query
 *            name: sort
 *            type: string
 *            required: false
 *            example: asc_laureates, desc_laureates
 *      responses:
 *          '200':
 *              description: Resource found successfully
 *          '500':
 *              description: Internal server error
 *          '400':
 *              description: Bad request
 */

// http://localhost:3000/years/winners
router.get("/winners", controller.getNumLaureatesPerYearF6);
/**
 * @swagger
 * /years/winners:
 *   get:
 *      description: Used to get the number of laureates who received a prize each year (F6)
 *      tags:
 *          - YEARS
 *      responses:
 *          '200':
 *              description: Resource added successfully
 *          '500':
 *              description: Internal server error
 *          '400':
 *              description: Bad request
 */

// http://localhost:3000/years/noPrizes
router.get("/noPrizes", controller.getYearsWithoutPrizesF7);
/**
 * @swagger
 * /years/noPrizes:
 *   get:
 *      description: Used to get all years in which no Nobel Prize was awarded been awarded. (F7)
 *      tags:
 *          - YEARS
 *      responses:
 *          '200':
 *              description: Resource added successfully
 *          '500':
 *              description: Internal server error
 *          '400':
 *              description: Bad request
 */

module.exports = router;