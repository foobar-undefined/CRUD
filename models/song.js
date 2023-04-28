const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    title: { type: String, required: true},
    Like: { type: Boolean, defualt: false},
    dislike: { type: Boolean, default: false},
    user: { type: Schema.Types.ObjectId, ref: "User", required: true},
    userName: {type: String},
    userAvatar: {type: String},
}, { timestamps: true });

const songSchema = new Schema ({
    song: {
        type: String,
        required: true
    },
    artist: {
        type: String,
        required: true
    },
    genre: {
        type: String, 
        enum: ['pop', 'rock', 'edm', 'hip-hop', 'rap'],
    },
    image:{ type: String, required: true
    },
    comments: [commentSchema]

}, { timestamps: true });

module.exports = mongoose.model('Song', songSchema)