const Song = require("../models/song");
const User = require("../models/user")


function newSong(req, res){
    res.render("songs/new",{
        title: "Enter you're favorite Song!"
    })
}

async function index(req, res){
    try{
        const allSongs = await Song.find({});
        res.render("songs/index", {
            songs: allSongs, 
            title: 'All songs',
        });
        
    }catch(error){
        console.log(error)
        res.render('error',{title: "Did you forget something?"});
    }
}

async function create(req, res){
    try{
        const newSong = await Song.create(req.body); 
        const updatedUser = await User.findOne({_id: req.user._id})
        console.log(updatedUser.songAdded)
        updatedUser.songAdded.push(newSong);
        await updatedUser.save()
        res.redirect('/songs');
        
    }catch(error){
        console.error(error);
        res.render("error", {
            title: "What did you break?"})
    }
}

async function show(req, res){
    try{
        const foundSong = await Song.findById(req.params.id);
        res.render("songs/show",{
            song: foundSong, 
            title: 'See your favorite song'
        });
        
    }catch(error){
        console.error(error);
        res.render('error', {
            title: "Crap hit the fan"});
    }
}

module.exports = {
    new: newSong,
    index, 
    create, 
    show
}