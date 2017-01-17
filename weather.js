// Dependencies
var express = require('express');
var bodyParser = require('body-parser');

// Express server
var app = express();

// body-parser middleware to handle http json data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Route for the API
app.use('/api', require('./scripts/routes/route.js'));

// Routes for static resources
app.use('/lib', express.static(__dirname + '/app/lib'));
app.use('/js', express.static(__dirname + '/app/js'));
app.use('/partials', express.static(__dirname + '/app/partials'));

// Route for root context, picks /app/index.html as default home page
app.use('/', express.static(__dirname + '/app'));

// Application runs on a user input port or defaulted to 8000
var PORT = Number(process.argv[2]) || 8000;

// Start server
app.listen(PORT);
console.log('Ready to get you weather on http://localhost:' + PORT);

