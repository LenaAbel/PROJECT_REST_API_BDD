const fs = require('fs')
const chalk = require('chalk')
const queries = require("../queries/queries")
const categories_queries = require("../queries/categories_queries")
const prizes_queries = require("../queries/prizes_queries")
const year_queries = require("../queries/year_queries")

const pool = require("../db");

/**
 * Reads the file 'prize.json'
 * @returns {*[]|any}
 */
const readPrizes = () => {
    try {
        const dataBuffer = fs.readFileSync('prize.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (e) {
        return []
    }
}

const getAllLaureatesF1 = (callback) => {
    try {
        pool.query(queries.getAllLaureates, (error, results) => {
            if (error) {
                console.log("F1: error service", error);
                return callback("Error retrieving laureates.");
            }
            return callback(null, results.rows)
        });
    } catch (e) {
        console.log(e);
        return callback([]);
    }
};

/**
 * Retrieve laureates by their Id and pass the result to a callback.
 *   Laureates are returned as an array of {id, firstname, surname, numberOfPrizes}:
 *
 * @param {int} id: the user id to be used.
 * @param {function} callback: called upon success.
 */
const getLaureatesByIdF2 = (idLaureate, callback) => {
    try {
        pool.query(queries.getLaureatesById, idLaureate, (error, results) => {
            if (error) {
                console.log("F2: error service", error);
                return callback("Error retrieving laureates with id = " + idLaureate);
            }
            return callback(null, results.rows)
        });
    } catch (e) {
        console.log(e);
        return callback("Error retrieving laureates with id = " + idLaureate);
    }
}


/**
 * Get the number of laureates who received more than one prize
 * @param callback
 */
const moreThanOnePrizeF3 = (callback) => {
    try {
        pool.query(prizes_queries.moreThanOnePrize, (error, results) => {
            if (error) {
                console.log("F3: error service", error);
                return callback("Error retrieving laureates who received more than one prize.");
            }
            return callback(null, results.rows)
        });
    } catch (e) {
        console.log(e);
        return callback([]);
    }
};

const getCategoriesF4 = (callback) => {
    try {
        pool.query(categories_queries.getCategories, (error, results) => {
            if (error) {
                console.log("F4: error service", error);
                return callback("Error retrieving categories.");
            }
            return callback(null, results.rows)
        });
    } catch (e) {
        console.log(e);
        return callback([]);
    }
};


const mostPrizePerCategoryF5 = (callback) => {
    try {
        pool.query(categories_queries.mostPrizePerCategory, (error, results) => {
            if (error) {
                console.log("F5: error service", error);
                return callback("Error retrieving the category with the most prizes.");
            }
            return callback(null, results.rows)
        });
    } catch (e) {
        console.log(e);
        return callback([]);
    }
}

const getNumLaureatesPerYearF6 = (callback) => {
    try {
        pool.query(year_queries.getNumLaureatesPerYear, (error, results) => {
            if (error) {
                console.log("F6: error service", error);
                return callback("Error retrieving the number of laureates per year.");
            }
            return callback(null, results.rows)
        });
    } catch (e) {
        console.log(e);
        return callback([]);
    }
}

const getYearsWithoutPrizesF7 = (callback) => {
    try {
        pool.query(year_queries.getYearsWithoutPrizes, (error, results) => {
            if (error) {
                console.log("F7: error service", error);
                return callback("Error retrieving the years without prizes.");
            }
            return callback(null, results.rows)
        });
    } catch (e) {
        console.log(e);
        return callback([]);
    }
}

const allYearsPrizesSortedF8 = (sort, callback) => {
    try {
        // If parameters is asc_laureate
        if (sort === "asc_laureates") {
            pool.query(year_queries.allYearsPrizesSortedASC, (error, results) => {
                if (error) {
                    console.log("F8: error service", error);
                    return callback("Error retrieving the years with prizes sorted by number of laureates ASC.");
                }
                return callback(null, results.rows)
            });
            // Else if desc_laureate
        } else if (sort === "desc_laureates") {
            pool.query(year_queries.allYearsPrizesSortedDESC, (error, results) => {
                if (error) {
                    console.log("F8: error service", error);
                    return callback("Error retrieving the years with prizes sorted by number of laureates DESC.");
                }
                return callback(null, results.rows)
            });
        }
    } catch (e) {
        console.log(e);
        return callback("Error retrieving the years with prizes sorted by number of laureates.");
    }
}


const deleteLaureateF9 = (id, callback) => {
    try {
        pool.query(queries.getLaureatesById, id, (error, results) => {
            if (results.rowCount === 0) {
                return callback("Laureate doesn't exist!");
            }
            pool.query(queries.deleteLaureate, id, (error, results) => {
                if (error) {
                    console.log("F9: error service", error);
                    return callback("Error deleting laureate.");
                }
                return callback(null, results.rows)
            })
        });
    } catch (e) {
        console.log(e);
        return callback([]);
    }
}

const updateLaureateF10 = (id, annee, category, motivation, callback) => {
    try {
        pool.query(queries.updateMotivation, [annee, category, parseInt(id), motivation], (error, results) => {
            if (error) {
                console.log("F10: error service", error);
                return callback("Error updating laureate.");
            }
            return callback(null, results.rows)
        });
    } catch (e) {
        console.log(e);
        return callback("Error updating laureate.");
    }
}

module.exports = {
    getAllLaureatesF1: getAllLaureatesF1,
    getLaureatesByIdF2: getLaureatesByIdF2,
    moreThanOnePrizeF3: moreThanOnePrizeF3,
    getCategoriesF4: getCategoriesF4,
    mostPrizePerCategoryF5: mostPrizePerCategoryF5,
    getNumLaureatesPerYearF6: getNumLaureatesPerYearF6,
    getYearsWithoutPrizesF7: getYearsWithoutPrizesF7,
    allYearsPrizesSortedF8: allYearsPrizesSortedF8,
    deleteLaureateF9: deleteLaureateF9,
    updateLaureateF10: updateLaureateF10,
    readPrizes: readPrizes
}