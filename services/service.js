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

const savePrizes = (prizes) => {
    try {
        const dataJSON = JSON.stringify(prizes);
        fs.writeFileSync('prize.json', dataJSON);
    } catch (e) {
        console.log("Error: " + e);
    }
}

/**
 * Find laureate by firstname, surname, year and category
 * @param firstname
 * @param surname
 * @returns the object laureate if found
 */
const findLaureate = (firstname, surname, year, category) => {
    let laureate = {};
    var file = readPrizes();

    if (file.length > 0) {
        file.forEach(prize => {
            if ((prize.year === year && prize.year != null) && (prize.category === category && prize.category != null)) {
                if (prize.laureates) {
                    prize["laureates"].forEach((l) => {
                        if ((l.firstname === firstname && l.firstname != null) &&
                            (l.surname === surname && l.surname != null)) {
                            laureate["id"] = l["id"];
                            laureate["firstname"] = l["firstname"];
                            laureate["surname"] = l["surname"];
                            laureate["motivation"] = l["motivation"];
                        }
                    })
                }
            }
        });
    }
    return laureate;
}

/**
 * Return max(id) as an integer
 * @returns {number}
 */
const getMaxId = () => {
    const file = readPrizes();
    let maxId = 0;
    if (file.length > 0) {
        file.forEach(prize => {
            if (prize.laureates) {
                prize["laureates"].forEach((laureate) => {
                    if (parseInt(laureate.id) > maxId) {
                        maxId = parseInt(laureate.id);
                        console.log("maxid = " + maxId)
                    }
                });
            }
        });
    }
    return maxId;
}

/**
 * Return all the prizes for a given year and given category
 * @param year
 * @params category
 * @returns {*}
 */
const getPrizes = (year, category) => {
    const file = readPrizes();
    let prizes = [];
    file.forEach(prize => {
        let laureates = [];
        if (prize.year === year && prize.category === category) {
            prize["laureates"].forEach((laureate) => {
                laureates.push({
                    id: laureate["id"],
                    firstname: laureate["firstname"],
                    surname: laureate["surname"],
                    motivation: laureate["motivation"]
                });
            });
            prizes.push(laureates);
        }
    });
    return prizes;
};

const getAllLaureatesF1 = (callback) => {
    try {
        pool.query(queries.getAllLaureates, (error, results) => {
            if (error) {
                console.log("F1: error service", error);
                return callback([]);
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


const getLaureatesByIdF2 = (id, callback) => {
    try {
        pool.query(queries.getAllLaureatesById, id, (error, results) => {
            if (error) {
                console.log("F2: error service", error);
                return callback([]);
            }
            return callback(null, results.rows)
        });
    } catch (e) {
        console.log(e);
        return callback([]);
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
                return callback([]);
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
                return callback([]);
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
                return callback([]);
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
                return callback([]);
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
                return callback([]);
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
        if (sort.charAt(0) === "a") {
            pool.query(year_queries.allYearsPrizesSortedASC, (error, results) => {
                if (error) {
                    console.log("F8: error service", error);
                    return callback([]);
                }
                return callback(null, results.rows)
            });
            // Else if desc_laureate
        } else if (sort.charAt(0) === "d") {
            pool.query(year_queries.allYearsPrizesSortedDESC, (error, results) => {
                if (error) {
                    console.log("F8: error service", error);
                    return callback([]);
                }
                return callback(null, results.rows)
            });
        }
    } catch (e) {
        console.log(e);
        return callback([]);
    }
}

const deleteLaureateF9 = (id, callback) => {}

const updateLaureateF10 = (id, firstname, surname, motivation, callback) => {}

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





    readPrizes: readPrizes,
    findLaureate: findLaureate,
    savePrizes: savePrizes,


}