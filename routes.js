var main = require('./handlers/main.js');
var tours = require('./handlers/tours.js');
var newsletter = require('./handlers/newsletter');
var cookies = require('./handlers/cookies');
var vacations = require('./handlers/vacations.js');

var errors = require('./handlers/errors.js');

module.exports = function(app) {
    /**
     * Routes go here..
     */
    // Home page
    app.get('/', main.home);

    // About page
    app.get('/about', main.about);

    // Tours page routes
    app.get('/tours/hood-river', tours.hood_river);
    app.get('/tours/request-group-rate', tours.request_group_rate);

    // Display the headers
    app.get('/headers', function (req, res) {
        res.set('Content-Type', 'text/plain');
        var s = '';
        for (var name in req.headers) s += name + ': ' + req.headers[name] + '\n';
        res.send(s);
    });

    // Newsletter
    app.get('/newsletter', newsletter.newsletter);
    app.post('/process', newsletter.process);
    app.get('/thank-you', newsletter.thank_you);

    // Cookies for everyone!
    app.get('/cookie', cookies.cookie);
    app.get('/cookie-del', cookies.cookie_del);

    // Vacations page.
    app.use('/vacations', vacations.vacations);

    // Custom 404 page
    app.use(errors._404);

    // Custom 500 page
    app.use(errors._500);

};