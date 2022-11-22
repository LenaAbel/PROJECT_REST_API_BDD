const services = require("../services/service");
const chalk = require("chalk");
const validator = require("validator");
const isAscii = require("is-ascii");

exports.getAllLaureatesF1 = (req, res) => {
    services.getAllLaureatesF1((error, results) => {
        console.log(chalk.green("Request for F1 is a success!"));
        if (error) {
            return res.status(400).send({success: 0, data: error});
        }
        return res.status(200).send({success: 1, data: results});
    });
};

exports.getLaureatesByIdF2 = (req, res) => {
    console.log(chalk.green("Request for F2 is a success!"));
    let idLaureate = req.params.idLaureate;
    idLaureate = typeof idLaureate === 'undefined' ? "" : idLaureate;
    // DEBUG
    //console.log(req.params.idLaureate);
    if (validator.isEmpty(idLaureate) || idLaureate === '{idLaureate}' || idLaureate === 'undefined') {
        services.getAllLaureatesF1((error,results)=>{
            if(error){
                console.log(error);
                return res.status(400).send({success:0,data:error});
            }
            return res.status(200).send({success:1,data:results});
        });
    } else if (validator.isInt(idLaureate)) {
        services.getLaureatesByIdF2(idLaureate, (error, results) => {
            if (error) {
                console.log(error);
                return res.status(400).send({success: 0, data: error});
            }
            return res.status(200).send({success: 1, data: results});
        })
    } else {
        return res.status(400).send({success: 0, data: "Bad request"});
    }
};

exports.numberPrizesF3 = (req, res) => {
    services.numberPrizesF3((error, results) => {
        console.log(chalk.green("Request for F3 is a success!"));
        if (error) {
            return res.status(400).send({success: 0, data: error});
        }
        return res.status(200).send({success: 1, data: results});
    });
};

exports.numberLaureatesF4 = (req, res) => {
    services.numberLaureatesF4((error, results) => {
        console.log(chalk.green("Request for F4 is a success!"));
        if (error) {
            return res.status(400).send({success: 0, data: error});
        }
        return res.status(200).send({success: 1, data: results});
    });
};

exports.moreThanOnePrizeF5 = (req, res) => {
    services.moreThanOnePrizeF5((error, results) => {
        console.log(chalk.green("Request for F5 is a success!"));
        if (error) {
            return res.status(400).send({success: 0, data: error});
        }
        return res.status(200).send({success: 1, data: results});
    });
};

exports.getCategoriesF6 = (req, res) => {
    services.getCategoriesF6((error, results) => {
        console.log(chalk.green("Request for F6 is a success!"));
        if (error) {
            return res.status(400).send({success: 0, data: error});
        }
        return res.status(200).send({success: 1, data: results});
    });
    /*res.render("list_categories/list_categories.hbs", ({
        categories: list_categories
    }));*/
}

exports.mostPrizePerCategoryF7 = (req, res) => {
    services.mostPrizePerCategoryF7((error, results) => {
        console.log(chalk.green("Request for F7 is a success!"));
        if (error) {
            return res.status(400).send({success: 0, data: error});
        }
        return res.status(200).send({success: 1, data: results});
    });
};

exports.getNumLaureatesPerYearF8 = (req, res) => {
    services.getNumLaureatesPerYearF8((error, results) => {
        console.log(chalk.green("Request for F8 is a success!"));
        if (error) {
            return res.status(400).send({success: 0, data: error});
        }
        return res.status(200).send({success: 1, data: results});
    });
};

exports.getLaureatesPrizesF9 = (req, res) => {
    console.log(chalk.green("Request for F9 is a success!"));
    let idLaureate = req.params.idLaureate;
    idLaureate = typeof idLaureate === 'undefined' ? "" : idLaureate;
    // DEBUG
    //console.log(req.params.idLaureate);
    if (validator.isEmpty(idLaureate) || idLaureate === '{idLaureate}' || idLaureate === 'undefined') {
        services.getAllLaureatesF1((error,results)=>{
            if(error){
                console.log(error);
                return res.status(400).send({success:0,data:error});
            }
            return res.status(200).send({success:1,data:results});
        });
    } else if (validator.isInt(idLaureate)) {
        services.getLaureatesPrizesF9(idLaureate, (error, results) => {
            if (error) {
                console.log(error);
                return res.status(400).send({success: 0, data: error});
            }
            return res.status(200).send({success: 1, data: results});
        })
    } else {
        return res.status(400).send({success: 0, data: "Bad request!"});
    }
};

exports.getYearsWithoutPrizesF10 = (req, res) => {
    services.getYearsWithoutPrizesF10((error, results) => {
        console.log(chalk.green("Request for F10 is a success!"));
        if (error) {
            return res.status(400).send({success: 0, data: error});
        }
        return res.status(200).send({success: 1, data: results});
    });
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

exports.laureatesWhoMatchFilterF12 = (req, res) => {
    console.log(chalk.green("Request for F12 is a success!"));
    const firstname = req.query.firstname;
    const surname = req.query.surname;
    const category = req.query.category;

    services.laureatesWhoMatchFilterF12(firstname, surname, category, (error, results) => {
        console.log(chalk.green("Request for F12 is a success!"));
        if (error) {
            return res.status(400).send({success: 0, data: error});
        }
        return res.status(200).send({success: 1, data: results});
    });
};

exports.filteredLaureatesF12 = (req, res) => {
    filter = req.query.filter;
    filter = typeof filter === 'undefined' ? "" : filter;
    // DEBUG
    console.log("req.query.filter=" + req.query.filter);
    if (validator.isEmpty(filter) || filter === '{filter}' || filter === 'undefined') {
        return res.status(400).send({success:0, data:"Bad request!"});
    } else if (validator.isAscii(filter)) {
        console.log(chalk.green("F12 - Request is a success!"));
        services.filteredLaureatesF12(filter, (error, results) => {
            if (error) {
                console.log("F12 - " + error);
                return res.status(400).send({success: 0, data: error});
            }
            console.log(chalk.green("F12 - Done with the processing of the request."));
            return res.status(200).send({success: 1, data: results});
        });
    } else {
        return res.status(400).send({success: 0, data: "F12 - Bad request!"});
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

exports.addLaureateF15 = (req, res) => {
    console.log(chalk.green("Request for F15 is a success!"));
    let year = req.query.year;
    let category = req.query.category;
    let firstname = req.query.firstname;
    let surname = req.query.surname;
    let motivation = req.query.motivation;

    // DEBUG

    console.log("Year: " +year);
    console.log("Category: " + category);
    console.log("firstname: " + firstname);
    console.log("surname: " + surname);
    console.log("Motiv: " + motivation);

    year = typeof year === 'undefined' ? "" : year;
    category = typeof category === 'undefined' ? "" : category;
    firstname = typeof firstname === 'undefined' ? "" : firstname;
    surname = typeof surname === 'undefined' ? "" : surname;
    motivation = typeof motivation === 'undefined' ? "" : motivation;

    if (validator.isEmpty(year) || year === '{year}' || year === 'undefined' ||
        validator.isEmpty(category) || category === '{category}' || category === 'undefined' ||
        validator.isEmpty(firstname) || firstname === '{firstname}' || firstname === 'undefined' ||
        validator.isEmpty(surname) || surname === '{surname}' || surname === 'undefined' ||
        validator.isEmpty(motivation) || motivation === '{motivation}' || motivation === 'undefined'){
        return res.status(400).send({success:0,data: "Bad request. Please specify a year, category, firstname, surname and motivation to add a laureate."});
    } else if (validator.isInt(year) && validator.isAscii(category) && validator.isAscii(firstname) && validator.isAscii(surname) && validator.isAscii(motivation)) {
        services.addLaureateF15(year, category, firstname, surname, motivation, (error, results) => {
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

exports.list_categories = (req, res) => {
    console.log(chalk.green("Request for listing categories is a success!"));
    console.log("Category: " + req.body.categories);

    res.render("partials/list_categories.hbs", ({
        categories: services.getCategoriesF6((error, results) => {
            if (error) return error
            else return results
        }),
        category: req.body.categories,
        laureates: services.laureatesWhoMatchFilterF12(null, null, req.body.categories, (error, results) => {
            if(error) return error;
            else return results;
        })
    }));
}

exports.add_laureates = (req, res) => {
    console.log(chalk.green("Request to add laureate is a success!"));
    res.render("partials/add_laureate.hbs", ({
        categories: services.getCategoriesF6((error, results) => {
            if (error) return error
            else return results
        })
    }))
}

exports.new_laureates = (req, res) => {
    console.log(chalk.green("Request for adding a laureate after validation is a success!"));
    let year = req.body.year;
    let category = req.body.categories;
    let firstname = req.body.firstname;
    let surname = req.body.surname;
    let motivation = req.body.motivation;
    console.log("Year: " + year + " Category: " + category + " Firstname: " + firstname + " Surname: " + surname + " Motivation " + motivation);
    res.render("partials/add_laureate.hbs", ({
        categories: services.getCategoriesF6((error, results) => {
            if (error) return error
            else return results
        }),
        laureates: services.addLaureateF15(year, category, firstname, surname, motivation, (error, results) => {
            if(error) return error;
            else return results;
        })
    }));
}