const Event = require('../models/event');
const User = require('../models/user');

module.exports = (app) => {

    app.post('/events', (req, res) => {
        var event = new Event(req.body.event);
        event.save().then(result => {
            console.log(result);
            res.sendStatus(201);
        })

    })

    app.get('/events', (req, res) => {
        // Dans cette version le champ users
        // est un tableau d'identifiants
        // Event.find({}).then(events => {
        //     res.send(events)
        // })

        // Ici le champ user est alimenté par la totalité
        // des infos concernant l'utilisateur
        // (populate = jointure en SQL)
        Event.find({})
        .populate({ path: 'users', model: User })
        .then(events => {
            res.send(events)
        })

    })

    app.patch('/events/:id', (req, res) => {
        var userId = req.body.userId;
        Event.findOneAndUpdate(
            { _id: req.params.id },
            //{ users: [userId] },
            { $push: { users: userId } },
            { new: false } // la requête renverra l'élément après patch
        ).then(result => {
            console.log(result);
            res.sendStatus(200);
        })
    })

}