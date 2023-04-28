const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const userSchema = new Schema({
    name:{type: String},
    googleID:{
        type: String, 
        required: true, 
        unique: true
    }, 
    email: {type: String, required: true, unique: true},         
    avatar: {type: String} ,
    songAdded: [{
        type: Schema.Types.ObjectId,
        ref: 'Song'
    }],
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);

