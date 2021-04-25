const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
require("dotenv").config();

//START A SERVER AND LISTEN ON PORT 3000
const PORT = process.env.PORT || 3000

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// console.log(`Connection: ${process.env.MONGODB_URI}`)
mongoose.connect(//process.env.MONGODB_URI || 
    "mongodb://localhost/workout", {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});

mongoose.connection.on('connected', () =>
    console.log('Connected to MongoDB Endpoint')
);

mongoose.connection.on('error', (err) =>
    console.log(`Mongoose default connection error: ${err}`)
);

// routes
app.use(require("./routes/api.js"));
app.use(require("./routes/htmlRoutes.js"));

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});