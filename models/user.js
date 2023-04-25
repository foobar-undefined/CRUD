const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    userName:{
        type: String, 
        require: true,
        unique: true
    }, password:{type: String,         
        require: true,
        unique: true
    }, 
    songAdded: [{
        type: Schema.Types.ObjectId,
        ref: 'Song'
    }],
}, {timestamps: true});

module.exports = mongoose.model('User', userSchema);

