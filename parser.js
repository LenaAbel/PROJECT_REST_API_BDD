const {readPrizes} = require("./services/service");
const pool = require("./db");
const queries = require("./queries/queries");
const chalk = require("chalk");

(async () => {
    const prize = await readPrizes();

    let categories = [];
    let laureates = [];

    /**
     * Insert categories in database
     * @param category
     * @returns {Promise<void>}
     */
    async function insertCategories(category) {
        let res;
        var duplicatedCategory = await categories.find(r => r === category);
        if (!duplicatedCategory) {
            categories.push(category);
            res=await pool.query(`INSERT INTO CATEGORY(nom_category) VALUES ($1)`, [category]);
            return console.log(chalk.green("Category inserted! res: "+res));
        } else {
            console.log(chalk.red("Category exist!"));
        }
    }

    /**
     * Insert laureates in database
     * @param id of the laureate
     * @param firstname of the laureate
     * @param surname of the laureate
     * @returns {Promise<void>}
     */
    async function insertLaureates(id, firstname, surname) {
        var duplicatedID = await laureates.find(r => r.id === id);
        if (!duplicatedID) {
            laureates.push({
                id,
                firstname,
                surname
            });
            await pool.query(`INSERT INTO LAUREATES(id_laureate,firstname, surname) VALUES ($1, $2, $3)`, [parseInt(id),firstname, surname], (error, results) => {
                if (error) {
                    console.log(error);
                }
            });
            console.log(chalk.green("Laureate inserted!"));
        } else {
            console.log(chalk.red("Laureate exist!"));
        }

    }

    /**
     * Get the ID of the given category
     * @param id_category of the category
     * @returns {Promise<*>}
     */
    async function getIDCategory(category) {
        let result = await pool.query(`SELECT id_category FROM CATEGORY WHERE nom_category = $1;`, [category]);
        //console.log(result.rows[0].id_category);
        return result.rows[0].id_category;
    }

    /**
     * Insert prize in database
     * @param year of the prize
     * @param category  of the prize
     * @returns {Promise<void>}
     */
    async function insertPrizes(year, category) {
        let res;
        let id_category = await getIDCategory(category);
        res = await pool.query(`INSERT INTO PRIZES(annee, id_category) VALUES ($1, $2)`, [year, id_category]);
        console.log(chalk.green("Prizes inserted!"));
    }

    /**
     * Get the ID of the given prize
     * @param year of the prize
     * @param id_category of the prize
     * @returns {Promise<number>}
     */
    async function getIdPrize(year, id_category) {
        let result = await pool.query(`SELECT id_prize FROM PRIZES WHERE annee = ($1) AND id_category = ($2)`, [year, id_category]);
        return result.rows[0].id_prize;
    }

    /**
     * Get the ID of the given laureate
     * @param id of the laureate
     * @param year of the prize
     * @param category of the prize
     * @param motivation of the laureate
     * @returns {Promise<void>}
     */
    async function insertRemporte(id, year, category, motivation) {
        let id_category = await getIDCategory(category);
        let id_prize = await getIdPrize(year, id_category);
        await pool.query(`INSERT INTO REMPORTE(id_laureate, id_prize, motivation) VALUES ($1, $2, $3)`, [id, id_prize, motivation], (error, results) => {
            if (error) {
                console.log(error);
            }
        });
        console.log(chalk.green("Remporte inserted!"));
    }

    for (let i of prize){
        await insertCategories(i.category);

        const validateLaureate = i.laureates && i.laureates.length > 0;
        if (validateLaureate){
            for (let j of i.laureates){
                await insertLaureates(j.id, j.firstname, j.surname);

                await insertPrizes(i.year, i.category);

                await insertRemporte(j.id, i.year, i.category, j.motivation);
            }
        } else {
            await insertPrizes(i.year, i.category);
        }
    }
})();