const Song = require('../models/song');

async function create(req, res) {
    req.body.user = req.user._id;
    req.body.userName = req.user.name;
    req.body.userAvatar = req.user.avatar;

    try {
        const foundSong = await Song.findById(req.params.id);
        foundSong.comments.push(req.body);
        await foundSong.save()
        res.redirect(`/songs/${foundSong._id}`);

    } catch (error) {
        console.log(error);
        res.render('error', {title: 'Uh, O! Something happened'});
    }
}

async function deleteComment(req, res) {
    try {
        const song = await Song.findOne({ 'comments._id': req.params.id, 'comments.user': req.user._id });
        if (!song) return res.redirect('/songs');
        song.comments.remove(req.body);
        await song.save()
        res.redirect(`/comments/${song._id}`);

    } catch (error) {
        console.log(error);
        res.render('error', {title: 'Uh O! Something went wrong'});
    }
}

module.exports = {
    create,
    delete: deleteComment
};