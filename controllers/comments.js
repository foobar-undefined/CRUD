const Song = require('../models/song');
const User = require('../models/user');

async function create(req, res) {
    try {
        const foundSong = await Song.findById(req.params.id);
        req.body.user = req.user._id;
        req.body.userName = req.user.name;
        req.body.userAvatar = req.user.avatar;
        foundSong.comments.push(req.body);
        await foundSong.save()
        res.redirect(`/songs/${foundSong._id}`);
        console.log('im here')
    } catch (error) {
        console.log(error);
        res.render('error', {title: 'Uh, O! Something happened'});
    }
}

async function deleteComment(req, res) {
    try {
        const song = await Song.findOne({ 'comments._id': req.params.id, 'comments.user': req.user._id });
        if (!song) return res.redirect('/songs');
        song.comments.remove(req.params.id);
        await song.save()
        res.redirect(`/songs/${song._id}`);
    } catch (error) {
        console.log(error);
        res.render('error', {title: 'Uh O! Something went wrong'});
    }
}

async function editComment(req, res){
    try{
        const song = await Song.findOne({"comments._id": req.params.id}).populate('comments.user'); // make sure to send the comment id through req.params instead of the song id
        const commentToEdit = song.comments.id(req.params.id);
        res.render('songs/edit',{
           title: 'All songs',
           commentToEdit
    });
    }catch(error){
        console.log(error);
        res.render('error', {title: "ruh Oh! Here's a scooby snack!"});
    }
}

async function updateComment(req, res){
    try{
        const song = await Song.findOne({"comments._id": req.params.id}); // make sure to send the comment id through req.params instead of the song id
        const commentToUpdate = song.comments.id(req.params.id);
        commentToUpdate.set(req.body);
        // commentToUpdate.text = req.body.text
        await song.save();
        res.redirect(`/songs/${song._id}`)
    }catch(error){
        console.log(error);
        res.render('error', {title: "ruh Oh! Here's a scooby snack!"});
    }
};

module.exports = {
    create,
    edit: editComment,
    update: updateComment,
    delete: deleteComment
};
