const Song = require("../models/song");

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
        res.render('error',{title: "Something went horribly wrong"});
    }
}

async function create(req, res){
    try{
        const song = await Song.create(req.body)
        res.redirect('songs');
        
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