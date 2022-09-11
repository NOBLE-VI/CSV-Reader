const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/csv_files_db");

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Error connecting to database"));

db.once("open", function(){

    console.log("Conbnected to database");

})

module.exports = db;