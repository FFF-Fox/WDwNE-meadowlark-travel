var express = require('express');

var app = express();

// Set handlebars view engine
var handlebars = require('express-handlebars')
        .create({ defaultLayout:'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);

// Home page
app.get('/', function(req, res){
    res.render('home');
});

// About page
app.get('/about', function(req, res){
    res.render('about');    
});

// Custom 404 page
app.use(function(req, res){
    res.status(404);
    res.render('404');
});

// Custom 500 page
app.use(function(err, req, res, next){
    console.error(err.stack);
    res.statues(500);
    res.render('500');
});

app.listen(app.get('port'), function(){
    console.log( "Express started on http://localhost:" +
        app.get('port') + "; Press Ctrl + C to terminate." );
});
