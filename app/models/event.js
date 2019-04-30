const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = new Schema({
    date: { type: Date, default: Date.now() },
    name: { type: String, required: true },
    users: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
    ]
})
 
const Event = mongoose.model('event', EventSchema);

module.exports = Event;