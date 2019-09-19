var express = require('express');
var router = express.Router();
var Project = require('../models/project');

// Return a list of all projects
router.get('/', function(req, res, next) {
    Project.find(function(err, projects) {
        if (err) { return next(err); }
        res.json({'projects': projects});
    });
});

// Create a new project
router.post('/', function(req, res, next) {
    var project = new Project(req.body);
    project.save(function(err) {
        if (err) { return next(err); }
        res.status(201).json(project);
    });
});

//updates the project with a certain ID


router.put('/:id', function(req, res) {
    var id = req.params.id;
    var updated_project = {

        "name": req.body.name,
        "description": req.body.description,
        "status": req.body.status
    }
   // projects[id] = updated_project;
    res.json(updated_project);
});

// Return the project with the given ID
router.get('/:id', function(req, res, next) {
    var id = req.params.id;
    Project.findById(id, function(err, project) {
        if (err) { return next(err); }
        if (project === null) {
            return res.status(404).json({'message': 'Project not found'});
        }
        res.json(project);
    });
});


//find project by name

router.get('/:name', function(req, res, next) {
    var id = req.params.id;
    Project.findById(id, function(err, project) {
        if (err) { return next(err); }
        if (project === null) {
            return res.status(404).json({'message': 'Project not found'});
        }
        res.json(project[req.params.name]);
    });
});

// Delete the project with the given ID
router.delete('/:id', function(req, res, next) {
    var id = req.params.id;
    Project.findOneAndDelete({_id: id}, function(err, project) {
        if (err) { return next(err); }
        if (project === null) {
            return res.status(404).json({'message': 'Project not found'});
        }
        res.json(project);
    });
});

module.exports = router;