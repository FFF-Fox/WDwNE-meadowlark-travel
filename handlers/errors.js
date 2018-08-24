exports._404 = function (req, res) {
    res.status(404);
    res.render('404');
};

exports._500 = function (err, req, res, next) {
    console.error(err.stack);
    res.status(500);
    res.render('500');
};