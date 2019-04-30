const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user');
const eventRoutes = require('./routes/event');
var app = express();
const PORT = 3000;

// Middlewares
app.use(bodyParser.json());

var connection = mongoose.connect(
    'mongodb://localhost:27017/test', { useNewUrlParser:true }
);

connection.then(res => {
    console.log("Mongodb connecté");

    // routes
    userRoutes(app);
    eventRoutes(app);

    app.listen(PORT, () => {
        console.log(`Serveur express écoutant le port ${PORT}...`)
    })
})




