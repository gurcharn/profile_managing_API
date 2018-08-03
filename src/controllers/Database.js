const mysql = require('mysql');

const database = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "pms_API"
});

database.connect(function(err) {
    if (err) console.log("Database Not Connected \n"+err);
    else console.log("Database Connected");
});

module.exports = database