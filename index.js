const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const path = require("path");
// mongodb required------------------
const db = require("./config/mongoose.js");
const mongoose = require("mongoose");
//-----------------------------------
const sassMiddleware = require("node-sass-middleware");



let port = 3000;
let app = express();



//using sass as a middleware
app.use(sassMiddleware({
    src: "./assets/scss",
    dest: "./assets/css",
    // debug: true,
    outputStyle: "extended",
    prefix: "/css"
}));



//telling express where the statics files are.
app.use(express.static("./assets"));


//using and setting expess layouts to seperate style, scripts and body from sub pages.
app.use(expressLayouts);
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);


//setting view engine
app.set("view engine", "ejs");
app.set("views", "views");
app.set("csv", path.join(__dirname, "csv"));




app.use("/", require("./router/index"));




app.listen(port, function(err){
    if(err){
        console.log("Error in starting the Server");
        return;
    }
    console.log("Sever is up and running at:  http://localhost:3000");
    return;
})


