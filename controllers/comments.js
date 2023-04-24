const Song = require('../models/song');

async function create(req, res) {
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

module.exports = {
    create
};