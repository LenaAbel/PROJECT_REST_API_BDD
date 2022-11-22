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

// http://localhost:3000/laureates/total
router.get("/laureates/total", controller.numberLaureatesF4);
/**
 * @swagger
 * /laureates/total:
 *   get:
 *      description: Get number of laureates who received prizes (F4)
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

// http://localhost:3000/laureates
// Didn't find a solution to name it only /laureates or else SWAGGER thinks its F1
router.get("/laureates/filter", controller.laureatesWhoMatchFilterF12);
/**
 * @swagger
 * /laureates/filter:
 *   get:
 *      description:  Used to display laureates who match filter (F12)
 *      tags:
 *          - LAUREATES
 *      parameters:
 *          - in: query
 *            name: firstname
 *            type: string
 *            required: false
 *            example: firstname
 *          - in: query
 *            name: surname
 *            type: string
 *            required: false
 *            example: surname
 *          - in: query
 *            name: category
 *            type: string
 *            required: false
 *            example: category
 *      responses:
 *          '200':
 *              description: Resource found successfully
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
router.put("/laureates/:idLaureate/:year/:category", controller.updateLaureateF14);
/**
 * @swagger
 * /laureates/{idLaureate}/{year}/{category}:
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
 *          - in: path
 *            name: year
 *            type: integer
 *            required: true
 *            example: 1911
 *          - in: path
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

// http://localhost:3000/laureates
router.post("/laureates", controller.addLaureateF15);
/**
 * @swagger
 * /laureates:
 *   post:
 *      description: Add a new laureate for a given year and a given category (F15)
 *      tags:
 *          - LAUREATES
 *      parameters:
 *          - in: query
 *            name: year
 *            type: integer
 *            required: true
 *            example: 1911
 *          - in: query
 *            name: category
 *            type: string
 *            required: true
 *            example: chemistry
 *          - in: query
 *            name: firstname
 *            schema:
 *              type: object
 *              required: true
 *              properties:
 *                  firstname:
 *                      type: string
 *            example: "Alain"
 *          - in: query
 *            name: surname
 *            schema:
 *              type: object
 *              required: true
 *              properties:
 *                  surname:
 *                      type: string
 *            example: "Aspect"
 *          - in: query
 *            name: motivation
 *            schema:
 *              type: object
 *              required: true
 *              properties:
 *                  motivation:
 *                      type: string
 *            example: "for their experiments in entangled photons"
 *      responses:
 *          '200':
 *              description: Resource updated successfully
 *          '500':
 *              description: Internal server error
 *          '400':
 *              description: Bad request
 */

/*
// http://localhost:3000/filteredLaureatesF12
router.get("/filteredLaureatesF12", controller.filteredLaureatesF12);
*/

// http://localhost:3000/laureates
router.delete("/laureates",controller.deleteLaureateF13);
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
 *          - in: query
 *            name: year
 *            type: integer
 *            required: true
 *            example: 1911
 *          - in: query
 *            name: category
 *            type: string
 *            required: true
 *            example: chemistry
 *      responses:
 *          '200':
 *              description: Resource found successfully
 *          '500':
 *              description: Internal server error
 *          '400':
 *              description: Bad request
 */

router.get("/list_categories", controller.list_categories);

router.post("/list_categories", controller.list_categories);

router.get("/add_laureates", controller.add_laureates);

router.post("/add_laureates", validateLaureates, controller.new_laureates);

router.put("/add_laureates", validateLaureates, controller.new_laureates);

module.exports = router;