const fs = require('fs')
const {readPrizes} = require("./services/service");
const pool = require("./db");
const queries = require("./queries/queries");

let laureates = [];
let year = [];
let categories = [];

var prize = readPrizes();
// DEBUG
// console.log(prize);

for(let i = 0; i < prize.length; i++) {
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
        for (let l = 0; l < prize[i].laureates.length; l++) {
            // Find duplicated ID
            var duplicatedID = laureates.find((laureate) => laureate.id_laureate === prize[i].laureates[l]["id"]);
            if (!duplicatedID) {
                // Push in laureates array if not duplicated
                laureates.push({
                    id_laureate: prize[i].laureates[l]["id"],
                    firstname: prize[i].laureates[l]["firstname"],
                    surname: prize[i].laureates[l]["surname"]
                });
            }
        }
    }
}

// All categories
// console.log(categories);

// All laureates
console.log(laureates.sort((a,b)=> a.id_laureate - b.id_laureate));

// All years
//console.log(year);


// Insert laureates in database
async function insertLaureates() {
    for(const i of laureates) {
        //console.log(i);
        pool.query(`INSERT INTO LAUREATES(firstname, surname) VALUES($1,$2)`, [i.firstname, i.surname], (error, results) => {
            if(error) {
                console.log(error);
            }
        });
    }
}

// Insert categories in database
async function insertCategories() {
    for(const i of categories) {
        //console.log("Category:" + i);
        pool.query(`INSERT INTO CATEGORY(nom_category) VALUES($1)`, [i], (error, results) => {
            if(error) {
                console.log(error);
            }
        });
    }
}
/*
async function insertPrizes() {
    for(const i of prize) {
        //console.log(i);
        pool.query(`INSERT INTO PRIZES(annee, id_category) VALUES($1,$2)`, [i.annee, i.id_category], (error, results) => {
            if(error) {
                console.log(error);
            }
        });
    }
}*/

insertLaureates();
insertCategories();




