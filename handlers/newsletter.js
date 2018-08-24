exports.newsletter = function (req, res) {
    res.render('newsletter', { csrf: 'CSRF token here' });
};

exports.process = function (req, res) {
    console.log('Form (from querystring): ' + req.query.form);
    console.log('CSRF (from hidden form field): ' + req.body._csrf);
    console.log('Name (from visible form field): ' + req.body.name);
    console.log('Email (from visible form field): ' + req.body.email);

    if (req.xhr || req.accepts('json,html') === 'json') {
        res.send({ success: true });
    } else {
        res.redirect(303, '/thank-you');
    }
};

exports.thank_you = function (req, res) {
    res.send('Thank you!');
};