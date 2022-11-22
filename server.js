// Import
const express = require("express");
const hbsEngine = require("express-handlebars");
const chalk = require("chalk");
const app = express();
const dotenv = require("dotenv");
const bodyParser = require("body-parser");

// Routes constants
const routes = require("./routes/routes");
const years_routes = require("./routes/years_routes");
const prizes_routes = require("./routes/prizes_routes");
const categories_routes = require("./routes/categories_routes");

// SWAGGER
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express")

// Environment configuration / PORT
dotenv.config();
const port = process.env.PORT;

// Path to CSS, JS, IMG
app.use(express.static(__dirname + "/public"));

// Define view motor
app.engine('hbs', hbsEngine.engine({
    //Route au layout
    layoutsDir: './views/layouts',
    defaultLayout: 'main',
    extname: '.hbs'
}));
app.set("view engine", 'hbs');
app.set("views", "./views");


const hbs = hbsEngine.create({});
hbs.handlebars.registerHelper('equals', function (v1, operator, v2, options) {
    switch (operator) {
        case '===':
            return (v1 === v2) ? options.fn(this) : options.inverse(this);
        default:
            return options.inverse(this);
    }
});

/** Swagger Initialization - START */
const swaggerOption = {
    swaggerDefinition: (swaggerJsdoc.Options = {
        info: {
            title: "REST API BY ABEL LENA",
            description: "API documentation",
            contact: {
                name: "ABEL",
            },
            servers: ["http://localhost:3000/"],
        },
    }),
    apis: ["server.js", "./routes/*.js"],
};


const swaggerDocs = swaggerJsdoc(swaggerOption);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Middlewares
app.use((req, res, next) => {
    next();
});

app.use("/", routes);
app.use("/years", years_routes);
app.use("/prizes", prizes_routes);
app.use("/categories", categories_routes);


// Home page
app.get("/", (req, res) => {
    console.log(chalk.inverse.grey.bgGreen("Server : ")+chalk.inverse.grey.bgBlack("Réception et envoi d'une requete / ."));
    res.render("home.hbs");
});


app.use("*", (req, res, next) => {
    const err = new Error("Not found !");
    err.status = 404;
    next(err);
});


// Display "Error 404: Not Found"
app.use((err, req, res, next) => {
    //console.error(chalk.inverse.grey.bgRed.bold(err.stack));
    res.render("error404.hbs");
});


// Listen to the port
app.listen(port, () => {
    console.log(chalk.bold("Le serveur écoute sur port " + port));
});
