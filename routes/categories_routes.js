const controller = require("../controllers/controller");
const express = require("express");
var router = express.Router();


// http://localhost:3000/categories
router.get("/", controller.getCategoriesF4);
/**
 * @swagger
 * /categories:
 *   get:
 *      description: Used to get all categories (F4)
 *      tags:
 *          - CATEGORIES
 *      responses:
 *          '200':
 *              description: Resource added successfully
 *          '500':
 *              description: Internal server error
 *          '400':
 *              description: Bad request
 */

// http://localhost:3000/categories/winners
router.get("/winners", controller.mostPrizePerCategoryF5);
/**
 * @swagger
 * /categories/winners:
 *   get:
 *      description: Used to get the category who received the most prizes (F5)
 *      tags:
 *          - CATEGORIES
 *      responses:
 *          '200':
 *              description: Resource added successfully
 *          '500':
 *              description: Internal server error
 *          '400':
 *              description: Bad request
 */


module.exports = router;