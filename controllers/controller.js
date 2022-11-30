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
        res.status(200).json(results);
    });
}

exports.mostPrizePerCategoryF5 = (req, res) => {
    services.mostPrizePerCategoryF5((error, results) => {
        console.log(chalk.green("Request for F5 is a success!"));
        if (error) {
            return res.status(400).send({success: 0, data: error});
        }
        res.status(200).json(results);
    });
};


exports.getNumLaureatesPerYearF6 = (req, res) => {
    services.getNumLaureatesPerYearF6((error, results) => {
        console.log(chalk.green("Request for F6 is a success!"));
        if (error) {
            return res.status(400).send({success: 0, data: error});
        }
        res.status(200).json(results);
    });
};


exports.getYearsWithoutPrizesF7 = (req, res) => {
    services.getYearsWithoutPrizesF7((error, results) => {
        console.log(chalk.green("Request for F7 is a success!"));
        if (error) {
            return res.status(400).send({success: 0, data: error});
        }
        res.status(200).json(results);
    });
};


exports.allYearsPrizesSortedF8 = (req, res) => {
    let sort = req.query.sort;
    sort = typeof sort === 'undefined' ? "" : sort;

    console.log("Sort: " + req.query.sort);

    // Check if sort is empty or undefined
    if (validator.isEmpty(sort) || sort === '{sort}' || sort === 'undefined') {
        return res.status(400).send({success: 0, data: error});
    } else if ((sort === "asc_laureates" ) || (sort === "desc_laureates")) {
        // Check if sort is asc or desc
        services.allYearsPrizesSortedF8(sort,(error, results) => {
            console.log(chalk.green("Request for F8 is a success!"));
            if (error) {
                return res.status(400).send({success: 0, data: error});
            }
            res.status(200).json(results);
        });
    } else {
        return res.status(400).send({success: 0, data: "Bad request! You need to specify asc_laureates or desc_laureates!"});
    }
};


exports.deleteLaureateF9 = (req, res) => {
    console.log(chalk.green("Request for F9 is a success!"));
    let idLaureate = req.query.idLaureate

    idLaureate = typeof idLaureate === 'undefined' ? "" : idLaureate;

    /*console.log("ID: " + id);*/
    if (validator.isEmpty(idLaureate) || idLaureate === '{idLaureate}' || idLaureate === 'undefined') {
            return res.status(400).send({success:0,data: "Bad request. Please specify an ID."});
    } else if ((validator.isInt(idLaureate))) {
        services.deleteLaureateF9([idLaureate], (error, results) => {
            console.log(chalk.green("Request for F9 is a success!"));
            if (error) {
                return res.status(400).send({success: 0, data: error});
            }
            res.status(200).json(results);
        });
    } else {
        return res.status(400).send({success: 0, data: "Bad request"});
    }
}

exports.updateLaureateF10 = (req, res) => {
    console.log(chalk.green("Request for F10 is a success!"));
    let idLaureate = req.params.idLaureate;
    let year = req.body.year;
    let category = req.body.category;
    let motivation = req.body.motivation;

    console.log("ID: " + idLaureate + " Year: " + year + " Category: " + category + " Motivation: " + motivation);

    idLaureate = typeof idLaureate === 'undefined' ? "" : idLaureate;
    year = typeof year === 'undefined' ? "" : year;
    category = typeof category === 'undefined' ? "" : category;
    motivation = typeof motivation === 'undefined' ? "" : motivation;

    if (validator.isEmpty(idLaureate) || idLaureate === '{idLaureate}' || idLaureate === 'undefined' ||
        validator.isEmpty(year) || year === '{year}' || year === 'undefined' ||
        validator.isEmpty(category) || category === '{category}' || category === 'undefined' ||
        validator.isEmpty(motivation) || motivation === '{motivation}' || motivation === 'undefined'){
            console.log("pass pas good")
            return res.status(400).send({success:0,data: "Bad request. Please specify an ID, year and category to update a motivation."});

    } else if (validator.isInt(idLaureate) && validator.isInt(year) && validator.isAscii(category) && validator.isAscii(motivation)) {
        services.updateLaureateF10(idLaureate, year, category, motivation, (error, results) => {
            if (error) {
                console.log(error);
                return res.status(400).send({success: 0, data: error});
            }
            return res.status(200).json(results);
        })
    } else {
        return res.status(400).send({success: 0, data: "Bad request"});
    }
}