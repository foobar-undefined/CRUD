const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const songSchema = new Schema ({
    song: {
        type: String,
        require: true
    },
    artist: {
        type: String,
        require: true
    },
    genre: {
        type: String, 
        enum: ['pop', 'rock', 'edm', 'hip-hop', 'rap'],
    },

}, { timestamps: true});

module.exports = mongoose.model('Song', songSchema)