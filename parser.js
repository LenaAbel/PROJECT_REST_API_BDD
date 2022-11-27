const {readPrizes} = require("./services/service");
const pool = require("./db");
const queries = require("./queries/queries");
const chalk = require("chalk");

(async () => {
    const prize = await readPrizes();

    let categories = [];
    let laureates = [];

    // Insert categories in database
    async function insertCategories(category) {
        var duplicatedCategory = await categories.find(r => r === category);
        if (!duplicatedCategory) {
            categories.push(category);
            pool.query(`INSERT INTO CATEGORY(nom_category) VALUES ($1)`, [category], (error, results) => {
                if (error) {
                    console.log(error);
                }
            });
            console.log(chalk.green("Category inserted!"));
        } else {
            console.log(chalk.red("Category exist!"));
        }
    }

    // Insert laureates in database
    async function insertLaureates(id, firstname, surname) {
        var duplicatedID = await laureates.find(r => r.id === id);
        if (!duplicatedID) {
            laureates.push({
                id,
                firstname,
                surname
            });
            pool.query(`INSERT INTO LAUREATES(id_laureate,firstname, surname) VALUES ($1, $2, $3)`, [parseInt(id),firstname, surname], (error, results) => {
                if (error) {
                    console.log(error);
                }
            });
            console.log(chalk.green("Laureate inserted!"));
        } else {
            console.log(chalk.red("Laureate exist!"));
        }

    }

    // Get the ID of the given category
    async function getIDCategory(category) {
        const result = await pool.query(`SELECT id_category FROM CATEGORY WHERE nom_category = $1;`, [category]);
        console.log(result.rows[0].id_category);
        return result.rows[0].id_category;
    }

    // Insert prize in database
    async function insertPrizes(year, category) {
        const id_category = await getIDCategory(category);
        pool.query(`INSERT INTO PRIZES(annee, id_category) VALUES ($1, $2)`, [year, id_category], (error, results) => {
            if (error) {
                console.log(error);
            }
        });
        console.log(chalk.green("Prizes inserted!"));
    }

    //
    async function getIdPrize(year, id_category) {
        let result = await pool.query(`SELECT id_prize FROM PRIZES WHERE annee = ($1) AND id_category = ($2)`, [year, id_category]);
        return result.rows[0].id_prize;
    }

    //
    async function insertRemporte(id, year, category, motivation) {
        let id_category = await getIDCategory(category);
        let id_prize = await getIdPrize(year, id_category);
        pool.query(`INSERT INTO REMPORTE(id_laureate, id_prize, motivation) VALUES ($1, $2, $3)`, [id, id_prize, motivation], (error, results) => {
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