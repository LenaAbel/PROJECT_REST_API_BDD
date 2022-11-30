const controller = require("../controllers/controller");
const express = require("express");
var router = express.Router();
const {validateLaureates} = require("../middlewares/add.middlewares.js");

// http://localhost:3000/laureates
router.get("/laureates", controller.getAllLaureatesF1);
/**
 * @swagger
 * /laureates:
 *   get:
 *      description: Get all laureates (F1)
 *      tags:
 *          - LAUREATES
 *      responses:
 *          '200':
 *              description: Resource added successfully
 *          '500':
 *              description: Internal server error
 *          '400':
 *              description: Bad request
 */

// http://localhost:3000/laureates/:idLaureate?
router.get("/laureates/:idLaureate?", controller.getLaureatesByIdF2);
/**
 * @swagger
 * /laureates/{idLaureate}:
 *   get:
 *      description: Get a laureate by ID (F2)
 *      tags:
 *          - LAUREATES
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


// http://localhost:3000/laureates/:idLaureate/:year/:category
router.put("/laureates/:idLaureate", controller.updateLaureateF10);
/**
 * @swagger
 * /laureates/{idLaureate}:
 *   put:
 *      description: Used to update a laureate's motivation with a given ID, year and category (F14)
 *      tags:
 *          - LAUREATES
 *      parameters:
 *          - in: path
 *            name: idLaureate
 *            type: integer
 *            required: true
 *            example: 6
 *          - in: body
 *            name: year
 *            type: string
 *            required: true
 *            example: 1911
 *          - in: body
 *            name: category
 *            type: string
 *            required: true
 *            example: chemistry
 *          - in: body
 *            name: motivation
 *            schema:
 *              type: object
 *              required: true
 *              properties:
 *                  motivation:
 *                      type: string
 *            example: "for their discoveries concerning signal transduction in the nervous system"
 *      responses:
 *          '200':
 *              description: Resource updated successfully
 *          '500':
 *              description: Internal server error
 *          '400':
 *              description: Bad request
 */

http://localhost:3000/laureates?idLaureate=6
router.delete("/laureates",controller.deleteLaureateF9);
/**
 * @swagger
 * /laureates:
 *   delete:
 *      description:  Used to delete a laureate (F13)
 *      tags:
 *          - LAUREATES
 *      parameters:
 *          - in: query
 *            name: idLaureate
 *            type: string
 *            required: true
 *            example: 6
 *      responses:
 *          '200':
 *              description: Resource found successfully
 *          '500':
 *              description: Internal server error
 *          '400':
 *              description: Bad request
 */

module.exports = router;