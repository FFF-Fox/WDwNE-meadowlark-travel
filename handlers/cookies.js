exports.cookie = function (req, res) {
    res.cookie('monster', 'nom nom');
    res.send('You just got a cookie!');
};

exports.cookie_del = function (req, res) {
    res.clearCookie('monster');
    res.send('Your cookie is cleared!');
};