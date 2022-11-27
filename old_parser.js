const fs = require('fs')
const {readPrizes} = require("./services/service");
const pool = require("./db");
const queries = require("./queries/queries");
const chalk = require("chalk");

let laureates = [];
let year = [];
let categories = [];
let remporte = [];

var prize = readPrizes();
// DEBUG
//console.log(prize);

for (let i = 0; i < prize.length; i++) {
    // Push in categories array if not duplicated
    var duplicatedCategory = categories.find((category) => category === prize[i]["category"]);
    if (!duplicatedCategory) {
        categories.push(prize[i]["category"]);
    }
    // Push in year array if not duplicated
    var duplicatedYear = year.find((year) => year === prize[i]["year"]);
    if (!duplicatedYear) {
        year.push(prize[i]["year"]);
    }
    // Travel through laureates
    if (prize[i].laureates) {
        for (let obj of prize[i].laureates) {
            // Find duplicated ID
            var duplicatedID = laureates.find((laureate) => laureate.id_laureate === obj["id"]);
            if (!duplicatedID) {
                // Push in laureates array if not duplicate
                laureates.push({
                    id_laureate: obj["id"],
                    firstname: obj["firstname"],
                    surname: obj["surname"]
                });
                // Push in remporte array
                remporte.push({
                    id_laureate: obj["id"],
                    id_prize: i,
                    motivation: obj["motivation"]
                });
                console.log("Inserted laureate: ("+ obj.id +")" );
            } else {
                console.log("ID:" + obj["id"]+ " already exist.");
            }
        }
    }


}

// All categories
// console.log(categories);

// All laureates
//console.log(laureates.sort((a,b)=> a.id_laureate - b.id_laureate));

// All years
//console.log(year);


// Insert laureates in database
async function insertLaureates() {
    for (const i of laureates) {
        //console.log(i);
        pool.query(`INSERT INTO LAUREATES(id_laureate,firstname, surname) VALUES ($1, $2, $3)`, [parseInt(i.id_laureate),i.firstname, i.surname], (error, results) => {
            if (error) {
                console.log(error);
            }
        });
    }
    console.log(chalk.green("Laureates inserted!"));
}

// Insert categories in database
async function insertCategories() {
    for (const i of categories) {
        //console.log("Category:" + i);
        pool.query(`INSERT INTO CATEGORY(nom_category) VALUES ($1)`, [i], (error, results) => {
            if (error) {
                console.log(error);
            }
        });
    }
    console.log(chalk.green("Categories inserted!"));
}


async function getIDCategory(category) {
    let result = await pool.query(`SELECT id_category FROM CATEGORY WHERE nom_category=($1)`, [category]);
    return result.rows[0].id_category;
    /*pool.query(`SELECT id_category FROM CATEGORY WHERE nom_category=($1)`, [category], (error, results) => {
        if (error) {
            throw error;
            console.log(error);
        }
        //console.log(results.rows[0].id_category);
        return results.rows[0].id_category;
    });*/
}

async function insertPrizes() {
    for (const i of prize) {
        let category = await getIDCategory(i.category);
        //console.log(category);
        pool.query(`INSERT INTO PRIZES(annee, id_category) VALUES ($1, $2)`, [i.year, category], (error, results) => {
            if (error) {
                console.log(error);
            }
        });
    }
    console.log(chalk.green("Prizes inserted!"));
}

async function getIdLaureate(id_laureate) {
    let result = await pool.query(`SELECT id_laureate FROM LAUREATES WHERE id_laureate=($1)`, [id_laureate]);
    return result.rows[0].id_laureate;
}

async function getIdPrize(annee) {
    let result = await pool.query(`SELECT id_prize FROM PRIZES WHERE annee=($1)`, [annee]);
    return result.rows[0].id_prize;
}

async function insertRemporte() {
    for(const i of remporte) {
        let id_laureate = await getIdLaureate(i.id_laureate);
        //lookout for annee ? let id_prize = await getIdPrize(i.id_prize);
        pool.query(`INSERT INTO REMPORTE(id_laureate, id_prize, motivation) VALUES ($1, $2, $3)`, [id_laureate, id_prize, i.motivation], (error, results) => {
            if (error) {
                console.log(error);
            }
        });
    }
    console.log(chalk.green("Remporte inserted!"));
}


insertLaureates().then(r =>  insertCategories().then(r => insertPrizes().then(r =>insertRemporte().then(r => console.log(chalk.green("All inserted!"))))));

