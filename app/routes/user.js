const User = require('./../models/user');

// Routes concernant l'entité User
module.exports = (app) => {
    app.get('/users', (req, res) => {
        User.find({}, {"_id":0, "__v":0}).then(users => {
            res.send(users);
        })
    })
    
    app.get('/members', (req, res) => {
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
        User.findOneAndUpdate({ _id: req.params.id }, {member})
            .then(() => res.sendStatus(200))
    })
    
    app.delete('/users/:id', (req, res) => {
        User.findOneAndDelete({ _id: req.params.id })
            .then((result) => {
                // si user trouvé on renvoie 200, sinon 404
                var statusCode = result ? 200 : 404;
                res.sendStatus(statusCode)   
            })
    })
}
