const chalk = require("chalk");
const validator = require("validator");
const isAscii = require("is-ascii");
const fs = require("fs");
const {readPrizes, findLaureate} = require("../services/service");
const services = require("../services/service");


const validateLaureates = (req, res, next) => {
    let year = req.body.year;
    let category = req.body.categories;
    let firstname = req.body.firstname;
    let surname = req.body.surname;
    let motivation = req.body.motivation;
    let isValid = true;
    console.log(chalk.inverse.grey.bgRed("Middlewares : ")+chalk.inverse.grey.bgBlack("Request for adding a laureate after validation is a success!"));

    if (validator.isEmpty(year) || !verifyYearCategory(year, category) || validator.isEmpty(category) ||
        firstname.length < 3 || surname.length < 3 ||
        validator.isEmpty(motivation) || motivation === 'undefined') {
        console.log("Year: " + year + " Category: " + category + " Firstname: " + firstname + " Surname: " + surname + " Motivation: " + motivation);
        isValid = false;
    }
    if (isValid) {
        next();
    } else {
        res.render("partials/add_laureate.hbs", ({
            categories: services.getCategoriesF6((error, results) => {
                if (error) return error
                else return results
            }),
            table: [{error: "ERROR"}]
        }))
    }
}

const verifyYearCategory = (year, category) => {
    const file = services.readPrizes();
    isValid = false;
    file.forEach(prize => {
        if (prize.year === year && prize.category === category) {
            isValid = true;
        }
    });
    if(isValid) {
        console.log(chalk.green("Year and category found."))
        return isValid;
    } else {
        console.log(chalk.green("Year not found."))
        return isValid;
    }
}
module.exports = {
    validateLaureates: validateLaureates
}