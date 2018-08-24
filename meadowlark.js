var express = require('express');
var fortune = require('./lib/fortune.js');
var credentials = require('./credentials');
var app = express();

// Set handlebars view engine
var hbs_sections = require('express-handlebars-sections');
var handlebars = require('express-handlebars')
    .create({ defaultLayout: 'main' });

hbs_sections(handlebars);
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

// Setup the port
app.set('port', process.env.PORT || 3000);

// Setup the static directory
app.use(express.static(__dirname + '/public'));

// Testing middleware
app.use(function (req, res, next) {
    res.locals.showTests = app.get('env') !== 'production' &&
        req.query.test === '1';
    next();
});

// Body parser
app.use(require('body-parser').urlencoded({ extended: true }));

// Cookie middleware
app.use(require('cookie-parser')(credentials.cookieSecret));

/**
 * Database connection
 */
var mongoose = require('mongoose');
var opts = {
    server: {
        socketOptions: { keepAlive: 1 }
    }
};
switch (app.get('env')) {
    case 'development':
        mongoose.connect(credentials.mongo.development.connectionString, opts);
        break;
    case 'production':
        mongoose.connect(credentials.mongo.production.connectionString, opts);
        break;
    default:
        throw new Error('Unknown execution environment: ' + app.get('env'));
}

/**
 * Routes go here..
 */
// Home page
app.get('/', function (req, res) {
    res.render('home');
});

// About page
app.get('/about', function (req, res) {
    res.render('about', {
        fortune: fortune.getFortune(),
        pageTestScript: '/qa/tests-about.js'
    });
});

// Tours page routes
app.get('/tours/hood-river', function (req, res) {
    res.render('tours/hood-river');
});
app.get('/tours/request-group-rate', function (req, res) {
    res.render('tours/request-group-rate');
});

// Display the headers
app.get('/headers', function (req, res) {
    res.set('Content-Type', 'text/plain');
    var s = '';
    for (var name in req.headers) s += name + ': ' + req.headers[name] + '\n';
    res.send(s);
});

// Newsletter
app.get('/newsletter', function (req, res) {
    res.render('newsletter', { csrf: 'CSRF token here' });
});
app.post('/process', function (req, res) {
    console.log('Form (from querystring): ' + req.query.form);
    console.log('CSRF (from hidden form field): ' + req.body._csrf);
    console.log('Name (from visible form field): ' + req.body.name);
    console.log('Email (from visible form field): ' + req.body.email);

    if (req.xhr || req.accepts('json,html') === 'json') {
        res.send({ success: true });
    } else {
        res.redirect(303, '/thank-you');
    }
});
app.get('/thank-you', function (req, res) {
    res.send('Thank you!');
});

// Cookies for everyone!
app.get('/cookie', function (req, res) {
    res.cookie('monster', 'nom nom');
    res.send('You just got a cookie!');
});
app.get('/cookie-del', function (req, res) {
    res.clearCookie('monster');
    res.send('Your cookie is cleared!');
});

// Custom 404 page
app.use(function (req, res) {
    res.status(404);
    res.render('404');
});

// Custom 500 page
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500);
    res.render('500');
});

app.listen(app.get('port'), function () {
    console.log("Express started on http://localhost:" +
        app.get('port') + "; Press Ctrl + C to terminate.");
});
