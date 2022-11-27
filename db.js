const Pool = require("pg").Pool

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "tp_note1",
    password: "0310",
    port: 5432

});

module.exports = pool;