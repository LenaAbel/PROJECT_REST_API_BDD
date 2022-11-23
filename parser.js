const fs = require('fs')
const {readPrizes} = require("./services/service");
const pool = require("./db");
const queries = require("./queries/queries");

let laureates = [];
let firstname = [];
let surname = [];
let year = [];
let categories = [];

var prize = readPrizes();
// DEBUG
// console.log(prize);

for(let i = 0; i < prize.length; i++) {
    var duplicatedCategory = categories.find((category) => category === prize[i]["category"]);

    if (!duplicatedCategory) {
        categories.push(prize[i]["category"]);
    }

    if (prize[i].laureates) {
        for (let l = 0; l < prize[i].laureates.length; l++) {
            var duplicatedID = laureates.find((laureate) => laureate.id_laureate === prize[i].laureates[l]["id"]);
            if (!duplicatedID) {
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

/*
// Insert categories in database
for(const i of categories) {
    console.log(i);
    pool.query(`INSERT INTO CATEGORY(nom_category) VALUES(i)`, (error, results) => {
        if(error) {
            console.log(error);
        }
    })
}
*/