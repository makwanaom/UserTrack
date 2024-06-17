const mongoose = require("mongoose");
require('dotenv').config()


const DB = process.env.URI;



mongoose.connect(DB, {

}).then(() => console.log("DataBase Connected")).catch((errr) => {
    console.log(errr);
})