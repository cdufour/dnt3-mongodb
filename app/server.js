const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const User = require('./models/user');
var app = express();
const PORT = 3000;

// Middlewares
app.use(bodyParser.json());

var connection = mongoose.connect(
    'mongodb://localhost:27017/test', { useNewUrlParser:true }
);
//mongoose.set('useFindAndModify', false);

connection.then(res => {
    console.log("Mongodb connecté");

    // ROUTES
    app.get('/users', (req, res) => {
        User.find({}, {"_id":0, "__v":0}).then(users => {
            res.send(users);
        })
    })

    app.get('/users/members', (req, res) => {
        User.find({"member":true}, {"_id":0, "__v":0}).then(users => {
            res.send(users);
        })
    })

    app.post('/users', (req, res) => {
        var user = new User(req.body.user);
        user.save().then(newUser => {
            res.status(201).send(newUser._id);
        })
    })

    app.patch('/users/:id', (req, res) => {
        var {member} = req.body.user;
        User.findOneAndUpdate({ _id:req.params.id }, {member})
            .then(() => res.sendStatus(200))
    })


    app.listen(PORT, () => {
        console.log(`Serveur express écoutant le port ${PORT}...`)
    })
})

const insertUsers = () => {
    var users = [
        {firstname: "Abdel", lastname: "Messaoudi", member: true},
        {firstname: "Léa", lastname: "Messaoudi", member: false},
        {firstname: "Paolo", lastname: "Del Priore", member: true},
    ];
    users.forEach(u => {
        var user = new User(u);
        user.save().then(res => console.log("Utilisateur ajouté !"))
    })
}




