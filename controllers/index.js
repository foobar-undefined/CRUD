function index(req, res){
    res.render("index",{ title: "Songs Projects"});
}

module.exports = {
    index
}