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
        const deleteComment = await Comment.findById(req.params.id);
        deleteComment.comments.remove(req.body);
        await deleteComment.save()
        res.redirect(`/comments/${deleteComment._id}`);

    } catch (error) {
        console.log(error);
        res.render('error', {title: 'Uh O! Something went wrong'});
    }
}

module.exports = {
    create,
    delete: deleteComment
};