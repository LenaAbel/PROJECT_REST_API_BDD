const fs = require('fs')
const chalk = require('chalk')

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
    } catch(e) {
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
            if((prize.year === year && prize.year != null) && (prize.category === category && prize.category != null)) {
                if (prize.laureates) {
                    prize["laureates"].forEach((l) => {
                        if((l.firstname === firstname && l.firstname != null) &&
                            (l.surname === surname && l.surname != null)) {
                            laureate["id"] =  l["id"];
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

/**
 * Retrieve all the laureates and pass the result to a callback.
 *   Laureates are returned as an array of {id, firstname, surname}:
 *
 * @param {function} callback: called upon success.
 */
const getAllLaureatesF1 = (callback) => {
    const file = readPrizes();
    const laureatesList = [];
    if (file.length > 0) {
        file.forEach(prize => {
            if (prize.laureates) {
                prize["laureates"].forEach((laureate) => {
                    var duplicatedID = laureatesList.find((l) => l.id === laureate["id"]);
                    if (!duplicatedID) {
                        laureatesList.push({
                            id: laureate["id"],
                            firstname: laureate["firstname"],
                            surname: laureate["surname"]
                        });
                    }
                });
            }
        });
    }
    if (laureatesList !== []) {
        laureatesList.sort((a, b) => a.id - b.id);
        return callback(null, laureatesList);
    } else {
        return callback();
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
    const file = readPrizes();
    let res = null;
    let numberOfPrize = 0;
    file.forEach(prize => {
        if (prize.laureates) {
            prize["laureates"].forEach((laureate) => {
                if(laureate["id"] === id.toString()) {
                    numberOfPrize++;
                    res = {id: laureate["id"],firstname: laureate["firstname"], surname: laureate["surname"]};
                }
            })
        }
    });
    if (res !== null) {
        res["numberOfPrize"] = numberOfPrize;
        return callback(null, res);
    } else {
        return callback([]);
    }
};

/**
 * Get the total number of offered prizes
 * @param callback
 * @returns res, the number of prize if exist else callback(0)
 */
const numberPrizesF3 = (callback) => {
    const file = readPrizes();
    let res = 0;
    file.forEach(prize => {
        // If laureates exist and is not empty -> ++
        if(prize.laureates && prize.laureates.length > 0) {
            res++;
        }
    });
    if(res !== 0) {
        return callback(null, res);
    } else {
        return callback(0);
    }
};

/**
 * Get number of laureates who received prizes
 * @param callback[] if error, otherwise callback with results.length
 */
const numberLaureatesF4 = (callback) => {
    // F1 : list all laureates so number of laureates is the length of results
    getAllLaureatesF1((error, results) => {
        if(error) {
            return callback([]);
        } else {
            return callback(null, results.length);
        }
    })
};

/**
 * Get the number of laureates who received more than one prize
 * @param callback
 */
const moreThanOnePrizeF5 = (callback) => {
    let laureatesList = [];
    getAllLaureatesF1((error, results) => {
        if(error) {
            return callback([]);
        } else {
            results.forEach(prize => {
                getLaureatesByIdF2(prize["id"], (err, res) => {
                    if(err) {
                        return callback([]);
                    } else {
                        if(res["numberOfPrize"] > 1) {
                            laureatesList.push(res);
                        }
                    }
                });
            });
            return callback(null, laureatesList);
        }
    });
};

/**
 * Get all categories
 * @param callback
 * @returns {*} the categories
 */
const getCategoriesF6 = (callback) => {
    const file = readPrizes();
    let categories = [];
    file.forEach(prize => {
        // Find the duplicated categories
        var duplicatedCategory = categories.find((category) => category === prize["category"]);
        if (!duplicatedCategory) {
            categories.push(prize["category"]);
        }
    });
    if(categories !== []) {
        return callback(null, categories);
    } else {
        return callback([]);
    }
};

/**
 * Get the category who received the most prizes
 * @param callback
 */
const mostPrizePerCategoryF7 = (callback) => {
    const file = readPrizes();
    let mostCategories = [];
    getCategoriesF6((error, results) => {
        if (error) {
            return callback([]);
        } else {
            results.forEach(obj => {
                let count = 0;
                file.forEach((prize) => {
                    if((obj === prize["category"]) && prize.laureates) {
                        prize["laureates"].forEach(obj2 => {
                            count++;
                        })
                    }
                });
                mostCategories.push({category: obj, count: count});
            });
            if(mostCategories !== []) {
                mostCategories.sort((a,b) => b.count - a.count);
                return callback(null, mostCategories[0]);
            } else {
                return callback([]);
            }
        }
    })
};

/**
 * Get the number of laureates who received a prize each year
 * @param callback
 * @returns {*}
 */
const getNumLaureatesPerYearF8 = (callback) => {
    const file = readPrizes();
    let mostLaureates = [];
    let years = [];
    file.forEach(prize => {
        if(years.indexOf(prize["year"]) < 0) {
            years.push(prize["year"]);
        }
    });
    if(years !== []) {
        years.forEach(data => {
            let count = 0;
            file.forEach((prize) => {
                if ((data === prize["year"]) && prize.laureates) {
                    prize["laureates"].forEach(obj2 => {
                        count++;
                    })
                }
            });
            mostLaureates.push({year: data, laureates: count});
        });
    } else {
        return callback([]);
    }
    if(mostLaureates !== []) {
        // Sort by highest number of laureates
        mostLaureates.sort((a,b) => b.laureates - a.laureates);
        return callback(null, mostLaureates);
    } else {
            return callback([]);
    }
};

/**
 * For a given winner ID, display the prizes won (first name, last name, year, category and motivation)
 * @param id of the laureate
 * @param callback
 * @returns {*} an array with the results
 */
const getLaureatesPrizesF9 = (id, callback) => {
    const file = readPrizes();
    let res = [];
    let dataLaureate = [];
    let prizes = [];
    file.forEach(prize => {
        if (prize.laureates) {
            prize["laureates"].forEach((laureate) => {
                if(laureate["id"] === id.toString()) {
                    dataLaureate = {firstname: laureate["firstname"], surname: laureate["surname"]};
                    prizes.push({year: prize["year"], category: prize["category"], motivation: laureate["motivation"]});
                }
            })
        }
    });
    if (dataLaureate !== [] && prizes !== []) {
        res.push(dataLaureate);
        res.push(prizes);
        return callback(null, res);
    } else {
        return callback([]);
    }
};

/**
 * Get all years in which no Nobel Prize was awarded been awarded.
 * @param callback
 */
const getYearsWithoutPrizesF10 = (callback) => {
    let yearsWithoutPrize = [];
    getNumLaureatesPerYearF8((error, results) => {
        if(error) {
            return callback([]);
        } else {
            results.forEach(prize => {
                if(prize["laureates"] === 0) {
                    yearsWithoutPrize.push(prize);
                }
            });
            if (yearsWithoutPrize !== []) {
                return callback(null, yearsWithoutPrize)
            } else {
                return callback([]);
            }
        }
    });
}

/**
 * Get all years of Nobel Prizes sorted by number of ascending/descending laureates
 * @param id of the laureate
 * @param callback
 */
const allYearsPrizesSortedF11 = (id, callback) => {
    getNumLaureatesPerYearF8((error, results) => {
        if(error) {
            return callback([]);
        } else {
            // Excludes years when no Nobel Prizes were awarded
            while(results.find(prize => prize.laureates === 0)) {
                results.splice(results.indexOf(results.find(obj => obj.laureates === 0)), 1)
            }
            // If parameters is -laureates
            if (id.charAt(0) === "-") {
                return callback(null, results)
                // Else if +laureates
            } else if (id.charAt(0) === "+") {
                return callback(null, results.sort((a, b) => a.laureates - b.laureates));
            }
        }
    });
}

/**
 * Get laureates who match filter
 * @param firstname of a laureate
 * @param surname of a laureate
 * @param category A given category
 * @param callback
 * @returns {*} The results of the filter
 */
const laureatesWhoMatchFilterF12 = (firstname, surname, category, callback) => {
    let resFilter = [];
    var file = readPrizes();

    if (file.length > 0) {
        file.forEach(prize => {
            if (prize.laureates) {
                prize["laureates"].forEach((laureate) => {
                    // Test if the firstname or surname or category matches the given filters
                    if((laureate.firstname === firstname && laureate.firstname != null) ||
                        (laureate.surname === surname && laureate.surname != null) ||
                        (prize.category === category && prize.category != null)) {
                        resFilter.push({id: laureate["id"], firstname: laureate["firstname"], surname: laureate["surname"], year: prize["year"]});
                    }
                })
            }
        });
    }
    if (resFilter !== []) {
        return callback(null, resFilter);
    } else {
        return callback([]);
    }
}

/**
 * Delete a laureate with a given ID in a year given and a given category
 * @param id ID of laureate
 * @param year
 * @param category
 * @param callback called upon a success
 */
const deleteLaureateF13 = (id, year, category, callback) => {
    const file = readPrizes();
    let res = [];
    file.forEach(prize => {
        if(prize.laureates && year === prize.year && category === prize.category && prize.laureates.length > 0) {
            prize.laureates.forEach((laureate) => {
                if(id === laureate.id) {
                    console.log(laureate);
                    res.push(file[file.indexOf(prize)].laureates[file[file.indexOf(prize)].laureates.indexOf(laureate)]);
                    file[file.indexOf(prize)].laureates.splice(file[file.indexOf(prize)].laureates.indexOf(prize), 1);
                    savePrizes(file);
                }
                console.log(chalk.green("Laureate: " + laureate.firstname + " " + laureate.surname + " in : " + prize.category +  " has been deleted."))
            });
        }
    });
    if(res.length > 0) {
        return callback(null, res);
    } else {
        return callback(chalk.red("ERROR/LAUREATE DOESNT EXIST"), []);
    }
}

/**
 * Update a laureate's motivation with a given ID, year and category
 * @param id ID of laureate
 * @param year [REQUIRED] The year that corresponds to the laureates
 * @param category [REQUIRED] The category that corresponds to the laureate
 * @param motivation [REQUIRED] The motivation to update
 * @param callback
 * @returns {*}
 */
const updateLaureateF14 = (id, year, category, motivation, callback) => {
    const file = readPrizes();
    let res = [];
    // DEBUG
    /*
    console.log("ID: " + id);
    console.log("Year: " + year);
    console.log("Category: " + category);
    */
    file.forEach(prize => {
        if(prize.laureates && year === prize.year && category === prize.category && prize.laureates.length > 0) {
            prize.laureates.forEach((laureate) => {
                if(id === laureate.id) {
                    file[file.indexOf(prize)].laureates[file[file.indexOf(prize)].laureates.indexOf(laureate)].motivation = motivation;
                    res.push(file[file.indexOf(prize)].laureates[file[file.indexOf(prize)].laureates.indexOf(laureate)]);
                    console.log("Laureate: " + laureate.firstname + " " + laureate.surname + " in : " + prize.category + " / Motivation: " + laureate.motivation + " has been updated.");
                    savePrizes(file);
                }
            });
        }
    });
    if(res.length === 0) {
        return callback(chalk.red("ERROR"));
    } else {
        return callback(null, "Laureate updated successfully!");
    }
}

/**
 * Add a new laureate for a given year and a given category
 * @param year [REQUIRED]
 * @param category [REQUIRED]
 * @param firstname
 * @param surname
 * @param motivation
 * @param callback
 * @returns {*}
 */
const addLaureateF15 = (year, category, firstname, surname, motivation, callback) => {
    const file = readPrizes();
    let added = false;

    laureate = findLaureate(firstname, surname, year, category);
    if(Object.keys(laureate).length === 0) {
        file.forEach(prize => {
            if (prize.year === year && prize.category === category) {
                maxId = getMaxId() + 1;
                prize.laureates.push({
                    id: maxId.toString(),
                    firstname: firstname,
                    surname: surname,
                    motivation: motivation
                });
                added = true;
            }
        });
        savePrizes(file);
        if(!added) {
            return callback(chalk.red("COULD NOT INSERT NEW LAUREATE"));
        } else {
            return callback(null, "Laureate added successfully!");
        }
    } else {
        updateLaureateF14(laureate.id, year, category, motivation, (error, results) => {
            if(error) {
                return callback([]);
            } else {
                return callback(null, results);
            }
        })
    }
}


module.exports = {
    getAllLaureatesF1: getAllLaureatesF1,
    getLaureatesByIdF2: getLaureatesByIdF2,
    numberPrizesF3: numberPrizesF3,
    numberLaureatesF4: numberLaureatesF4,
    moreThanOnePrizeF5: moreThanOnePrizeF5,
    getCategoriesF6: getCategoriesF6,
    mostPrizePerCategoryF7: mostPrizePerCategoryF7,
    getNumLaureatesPerYearF8: getNumLaureatesPerYearF8,
    getLaureatesPrizesF9: getLaureatesPrizesF9,
    getYearsWithoutPrizesF10: getYearsWithoutPrizesF10,
    allYearsPrizesSortedF11: allYearsPrizesSortedF11,
    laureatesWhoMatchFilterF12: laureatesWhoMatchFilterF12,
    deleteLaureateF13: deleteLaureateF13,
    updateLaureateF14: updateLaureateF14,
    addLaureateF15: addLaureateF15,
    readPrizes: readPrizes,
    findLaureate: findLaureate,
    savePrizes: savePrizes
}