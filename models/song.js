const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    title: { type: String, required: true},
    Like: { type: Boolean, defualt: false},
    dislike: { type: Boolean, default: false}
   
}, { timestamps: true });

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
    comments: [commentSchema]

}, { timestamps: true });

module.exports = mongoose.model('Song', songSchema)