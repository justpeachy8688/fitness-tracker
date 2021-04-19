const express = require("express");
const mongoose = require("mongoose");

//START A SERVER AND LISTEN ON PORT 3000
const PORT = process.env.PORT || 3000

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/fitness_db", {
    useNewUrlParser: true,
    useFindAndModify: false
});
