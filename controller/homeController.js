const path = require('path');
const express = require("express");
const csv =  require("csvtojson");
const csvArray = [];
let uniqueCSV = [];
let JsonObj = [];

module.exports.home = function (req, res) {

    return res.render("home", {
        title: "Home Page",
        ExArray: uniqueCSV,
        jsonobj: JsonObj
    });



}




module.exports.csvUpload = function (req, res) {

    console.log("File uploaded");

    const testFolder = path.join(__dirname, "../csv/");
    const fs = require('fs');
    // console.log(testFolder);
    fs.readdir(testFolder, (err, files) => {
        if (err) {
            console.log(err);
        }

        files.forEach(file => {
            csvArray.push(file.toString());

        });

        //looking for duplicates---------

        
        csvArray.forEach((c) => {
            if (!uniqueCSV.includes(c)) {
                uniqueCSV.push(c);
            }
        });
        
        //-------------------------------

    });


    res.redirect("back");

}



module.exports.showCSV = async function(req, res){

    // console.log(req.params.id);
    //getting csv folders location
    const csvFolder = path.join(__dirname, `../csv/${req.params.id}`);

    //converting CSV --> JSON
    JsonObj = await csv().fromFile(csvFolder);
    // console.log(JsonObj);

    return res.redirect("/");

}