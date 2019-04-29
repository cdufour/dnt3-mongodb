const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// définition d'un schéma
const UserSchema = new Schema({
    firstname: String,
    lastname: String,
    member: Boolean
});

const User = mongoose.model('user', UserSchema);

module.exports = User;