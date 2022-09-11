let express = require("express");
let homeController = require("../controller/homeController");



const router = express.Router();

router.get("/", homeController.home);

//using multer to upload files on server--------------------
const whitelist = [
    'text/csv',
  ]
const multer = require("multer");

const storageEngine = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, "./csv")
    },
    filename: (req, file, cb) =>{
        cb(null, file.originalname)
    }
});

const upload = multer({
    storage: storageEngine,

    fileFilter: (req, file, cb) => {
        if (!whitelist.includes(file.mimetype)) {
           return cb(new Error("UPLOAD CSV FILES ONLY !!"));
        }
        cb(null, true);
    }
});


router.post("/uploadcsv", upload.array("csv", 100), homeController.csvUpload);
//-----------------------------------------------------------


router.get("/showCSV/:id", homeController.showCSV);

module.exports = router;