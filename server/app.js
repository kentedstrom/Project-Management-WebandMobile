var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var morgan = require('morgan');
var path = require('path');
var cors = require('cors');
var history = require('connect-history-api-fallback');
//const path = './Project.js';


var clientsController = require('./controllers/clients');

var projectsController = require('./controllers/projects');
var staffMembersController = require('./controllers/staffMembers');

var tasksController = require('./controllers/taskController');


var requirementsController = require('./controllers/requirementsController');

var budgetsController = require('./controllers/budgetController');



// Variables
var mongoURI = 'mongodb+srv://jocke:bananasmoothie@cluster0-h5f88.mongodb.net/projectManagementDB?retryWrites=true&w=majority'|| process.env.MONGODB_URI || 'mongodb://localhost:27017/projectManagementDB';
var port = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true }, function(err) {
    if (err) {
        console.error(`Failed to connect to MongoDB with URI: ${mongoURI}`);
        console.error(err.stack);
        process.exit(1);
    }
    console.log(`Connected to MongoDB with URI: ${mongoURI}`);
});

// Create Express app
var app = express();
// Parse requests of content-type 'application/json'
app.use(bodyParser.json());
// HTTP request logger
app.use(morgan('dev'));
// Enable cross-origin resource sharing for frontend must be registered before api
app.options('*', cors());
app.use(cors());

// Define routes
app.get('/api', function(req, res) {
    res.json({'message': 'Welcome to your DIT341 backend ExpressJS project!'});
});

app.delete('/api/clients', function(req, res){
    mongoose.connection.dropCollection("clients", function(err, result){
        if(err){
            res.json({"message": "failed"});
        }else{
            res.json({"message": "success"});
        }
    })
});

app.delete('/api/projects', function(req, res){
    mongoose.connection.dropCollection("projects", function(err, result){
        if(err){
            res.json({"message": "failed"});
        }else{
            res.json({"message": "success"});
        }
    })
});
app.delete('/api/staffmembers', function(req, res){
    mongoose.connection.dropCollection("staffmembers", function(err, result){
        if(err){
            res.json({"message": "failed"});
        }else{
            res.json({"message": "success"});
        }
    })
});

app.use('/api/clients', clientsController);

app.use('/api/projects', projectsController);

app.use('/api/staffMembers', staffMembersController);


// use tasks
app.use('/api/tasks',tasksController);

// use requirements
app.use('/api/requirements',requirementsController);

// use requirements
app.use('/api/budgets',budgetsController);

/*
app.get('/api/projects', function(req, res){
    res.json({"projects": projects});
});*/


// Catch all non-error handler for api (i.e., 404 Not Found)
app.use('/api/*', function (req, res) {
    res.status(404).json({ 'message': 'Not Found' });
});

// Configuration for serving frontend in production mode
// Support Vuejs HTML 5 history mode
app.use(history());
// Serve static assets
var root = path.normalize(__dirname + '/..');
var client = path.join(root, 'client', 'dist');
app.use(express.static(client));

// Error handler (i.e., when exception is thrown) must be registered last
var env = app.get('env');
// eslint-disable-next-line no-unused-vars
app.use(function(err, req, res, next) {
    console.error(err.stack);
    var err_res = {
        'message': err.message,
        'error': {}
    };
    if (env === 'development') {
        err_res['error'] = err;
    }
    res.status(err.status || 500);
    res.json(err_res);
});

app.listen(port, function(err) {
    if (err) throw err;
    console.log(`Express server listening on port ${port}, in ${env} mode`);
    console.log(`Backend: http://localhost:${port}/api/`);
    console.log(`Frontend (production): http://localhost:${port}/`);
});

module.exports = app;
