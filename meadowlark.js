var express = require('express');
var fortune = require('./lib/fortune.js');
var app = express();

// Set handlebars view engine
var handlebars = require('express-handlebars')
        .create({ defaultLayout:'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

// Setup the port
app.set('port', process.env.PORT || 3000);

// Setup the static directory
app.use(express.static(__dirname + '/public'));

// Testing middleware
app.use(function(req, res, next){
    res.locals.showTests = app.get('env') !== 'production' &&
        req.query.test === '1';
    next();
});

/**
 * Routes go here..
 */
// Home page
app.get('/', function(req, res){
    res.render('home');
});

// About page
app.get('/about', function(req, res){
    res.render('about', {
        fortune: fortune.getFortune(),
        pageTestScript: '/qa/tests-about.js'
    });
});

// Tours page routes
app.get('/tours/hood-river', function(req, res){
    res.render('tours/hood-river');
});
app.get('/tours/request-group-rate', function(req, res){
    res.render('tours/request-group-rate');
});

// Custom 404 page
app.use(function(req, res){
    res.status(404);
    res.render('404');
});

// Custom 500 page
app.use(function(err, req, res, next){
    console.error(err.stack);
    res.status(500);
    res.render('500');
});

app.listen(app.get('port'), function(){
    console.log( "Express started on http://localhost:" +
        app.get('port') + "; Press Ctrl + C to terminate." );
});
