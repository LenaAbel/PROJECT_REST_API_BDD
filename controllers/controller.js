const services = require("../services/service");
const chalk = require("chalk");
const validator = require("validator");
const isAscii = require("is-ascii");

exports.getAllLaureatesF1 = (req, res) => {
    services.getAllLaureatesF1((error, results) => {
        console.log(chalk.green("Request for F1 is a success!"));
        if (error) {
            console.log(error);
            res.status(400).send({success: 0, data: error});
        }
        res.status(200).json(results);
    });
};

exports.getLaureatesByIdF2 = (req, res) => {
    const idLaureate = parseInt(req.params.idLaureate);
    console.log("ID = " + req.params.idLaureate);
    services.getLaureatesByIdF2([idLaureate], (error, results) => {
        console.log(chalk.green("Request for F2 is a success!"));
        if (error) {
            console.log(error);
            res.status(400).send({success: 0, data: error});
        }
        res.status(200).json(results);
    });
}


exports.moreThanOnePrizeF3 = (req, res) => {
    services.moreThanOnePrizeF3((error, results) => {
        console.log(chalk.green("Request for F3 is a success!"));
        if (error) {
            console.log(error);
            res.status(400).send({success: 0, data: error});
        }
        res.status(200).json(results);
    });
};


exports.getCategoriesF4 = (req, res) => {
    services.getCategoriesF4((error, results) => {
        console.log(chalk.green("Request for F4 is a success!"));
        if (error) {
            return res.status(400).send({success: 0, data: error});
        }
        return res.status(200).send({success: 1, data: results});
    });
}

exports.mostPrizePerCategoryF5 = (req, res) => {
    services.mostPrizePerCategoryF5((error, results) => {
        console.log(chalk.green("Request for F5 is a success!"));
        if (error) {
            return res.status(400).send({success: 0, data: error});
        }
        return res.status(200).send({success: 1, data: results});
    });
};


exports.getNumLaureatesPerYearF6 = (req, res) => {
    services.getNumLaureatesPerYearF6((error, results) => {
        console.log(chalk.green("Request for F6 is a success!"));
        if (error) {
            return res.status(400).send({success: 0, data: error});
        }
        return res.status(200).send({success: 1, data: results});
    });
};


exports.getYearsWithoutPrizesF7 = (req, res) => {
    services.getYearsWithoutPrizesF7((error, results) => {
        console.log(chalk.green("Request for F8 is a success!"));
        if (error) {
            return res.status(400).send({success: 0, data: error});
        }
        return res.status(200).send({success: 1, data: results});
    });
};


exports.allYearsPrizesSortedF8 = (req, res) => {
    let sort = req.query.sort;
    sort = typeof sort === 'undefined' ? "" : sort;

    console.log(req.query.sort);

    if (validator.isEmpty(sort) || sort === '{sort}' || sort === 'undefined') {
        return res.status(400).send({success: 0, data: error});
    } else if ((sort === "asc_laureates" ) || (sort === "desc_laureates")) {
        services.allYearsPrizesSortedF8(sort,(error, results) => {
            console.log(chalk.green("Request for F8 is a success!"));
            if (error) {
                return res.status(400).send({success: 0, data: error});
            }
            return res.status(200).send({success: 1, data: results});
        });
    } else {
        return res.status(400).send({success: 0, data: "Bad request! You need to specify +laureates or -laureates"});
    }
};


exports.allYearsPrizesSortedF11 = (req, res) => {
    console.log(chalk.green("Request for F11 is a success!"));
    let sort = req.query.sort;
    sort = typeof sort === 'undefined' ? "" : sort;
    // DEBUG
    //  console.log(req.query.sort);
    if (validator.isEmpty(sort) || sort === '{sort}' || sort === 'undefined') {
        return res.status(400).send({success:0,data:error});
    } else if ((sort === "-laureates" ) || (sort === "+laureates")) {
        services.allYearsPrizesSortedF11(sort, (error, results) => {
            if (error) {
                console.log(error);
                return res.status(400).send({success: 0, data: error});
            }
            return res.status(200).send({success: 1, data: results});
        })
    } else {
        return res.status(400).send({success: 0, data: "Bad request! You need to specify +laureates or -laureates"});
    }
};


exports.deleteLaureateF13 = (req, res) => {
    console.log(chalk.green("Request for F13 is a success!"));
    let idLaureate = req.query.idLaureate
    let year = req.query.year;
    let category = req.query.category;

    idLaureate = typeof idLaureate === 'undefined' ? "" : idLaureate;
    year = typeof year === 'undefined' ? "" : year;
    category = typeof category === 'undefined' ? "" : category;
    // DEBUG
    /*console.log("ID: " + id);
    console.log("Year: " + year);
    console.log("Category: " + category);*/
    if (validator.isEmpty(idLaureate) || idLaureate === '{idLaureate}' || idLaureate === 'undefined' ||
        validator.isEmpty(year) || year === '{year}' || year === 'undefined' ||
        validator.isEmpty(category) || category === '{category}' || category === 'undefined') {
            return res.status(400).send({success:0,data: "Bad request. Please specify and ID, year and category."});
    } else if ((validator.isInt(idLaureate) && validator.isInt(year) && !(validator.isEmpty(category)))) {
        services.deleteLaureateF13(idLaureate, year, category, (error, results) => {
            if (error) {
                console.log(error);
                return res.status(400).send({success: 0, data: error});
            }
            return res.status(200).send({success: 1, data: results});
        })
    } else {
        return res.status(400).send({success: 0, data: "Bad request"});
    }
}

exports.updateLaureateF14 = (req, res) => {
    console.log(chalk.green("Request for F14 is a success!"));
    let idLaureate = req.params.idLaureate
    let year = req.params.year;
    let category = req.params.category;
    let motivation = req.body.motivation;

    // DEBUG
    /*
    console.log("ID: " + req.query.idLaureate);
    console.log("Year: " + req.query.year);
    console.log("Category: " + req.query.category);
    console.log("Motiv: " + req.params.motivation);
    */
    idLaureate = typeof idLaureate === 'undefined' ? "" : idLaureate;
    year = typeof year === 'undefined' ? "" : year;
    category = typeof category === 'undefined' ? "" : category;
    motivation = typeof motivation === 'undefined' ? "" : motivation;

    if (validator.isEmpty(idLaureate) || idLaureate === '{idLaureate}' || idLaureate === 'undefined' ||
        validator.isEmpty(year) || year === '{year}' || year === 'undefined' ||
        validator.isEmpty(category) || category === '{category}' || category === 'undefined' ||
        validator.isEmpty(motivation) || motivation === '{motivation}' || motivation === 'undefined'){
            return res.status(400).send({success:0,data: "Bad request. Please specify an ID, year and category to update a motivation."});
    } else if (validator.isInt(idLaureate) && validator.isInt(year) && validator.isAscii(category) && validator.isAscii(motivation)) {
        services.updateLaureateF14(idLaureate, year, category, motivation, (error, results) => {
            if (error) {
                console.log(error);
                return res.status(400).send({success: 0, data: error});
            }
            return res.status(200).send({success: 1, data: results});
        })
    } else {
        return res.status(400).send({success: 0, data: "Bad request"});
    }
}