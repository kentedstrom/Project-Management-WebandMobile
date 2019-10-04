var express = require('express');
var router = express.Router();
var Project = require('../models/project');
var projects = require('express').Router();
var tasks = require('../controllers/taskController');
var Task = require('../models/taskModel');
var mongoClient = require('mongodb').MongoClient;
var mongoose = require('mongoose');
var db = mongoose.connection;



// return all the tasks of a certain project


router.get('/:id/tasks', function(req,res,next){
    var projectId = req.params.id;
    Project.findById(projectId, function(err,project){
        if (err){
            return next(err);
        }
        if (project === null){
            return res.status(404).json({"message": "Project not found"});
        }
        project.save();
        res.json(project.tasks);
    })
});

router.get('/:project_id/tasks/:task_id', function(req, res, next){
    var project_id = req.params.project_id;
    var task_id = req.params.task_id;
    Project.findById(project_id, function(err, project){
        if(err){
            return next(err);
        }
        if(project === null){
            return res.status(404).json({"message": "Project not found"});
        }
        Task.findById(task_id, function(err, task){
            if(err){
                return next(err);
            }
            if(task === null){
                return res.status(404).json({"message": "Task not found"});
            }
            res.json(task);
        })
    })
})
// Return a list of all projects

router.get('/', function(req, res, next) {
    Project.find(function(err, projects) {
        if (err) { return next(err); }
        res.json({'projects': projects});
    });
});
/*
router.get('/', function(req, res, next) {
    Project.find(function(err, projects) {
        if (err) { return next(err); }
        res.json({'projects': projects});
    });
});*/

// Create a new project
router.post('/', function(req, res, next) {
    var project = new Project(req.body);
    project.save(function(err) {
        if (err) { return next(err); }
        res.status(201).json(project);
    });
});

router.delete('/', function (req,res){

    var dbo = db.db("mydb");
    dbo.collection("projects").deleteMany({});
})
//add a task to a project

router.patch('/:id', function(req, res){
    var projectId = req.params.id;
    Project.findById(projectId, function(err, project){
        if(err){
            return next(err);
        }
        if(project == null){
            return res.status(404).json({"message": "Project not found"});
        }
        project.name = (req.body.name || project.name);
        project.description =(req.body.description || project.description);
        project.status = (req.body.status || project.status );
        project.startDate =(req.body.startDate || project.startDate);
        project.projectedEndDate = (req.body.projectedEndDate || project.projectedEndDate);
        project.actualEndDate = (req.body.actualEndDate || project.actualEndDate);
        project.tasks = (req.body.tasks || projects.tasks);
        project.save();
        res.json(project);



    });
});
// get all the tasks pertaining to a certain project




//updates the project with a certain ID

router.put('/:id', function(req, res) {
    var id = req.params.id;
    Project.findById(id, function(err, project){
        if(err){
            return next(err);
        }
        if(project == null){
            return res.status(404).json({"message": "Project not found"});
        }
        project.name = req.body.name;
        project.description = req.body.description;
        project.status = req.body.status;
        project.startDate = req.body.startDate;
        project.projectedEndDate = req.body.projectedEndDate;
        project.actualEndDate = req.body.actualEndDate;
        project.save();
        res.json(project);
    });
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

//creates a task pertaining to a particular project

router.post('/:id/tasks', function (req, res, next){
    var projectId = req.params.id;
    var task = new Task(req.body);
    Project.findById(projectId,function(err,foundProject){
        if (err){
            return next (err);
        }
        if (foundProject === null){
            return res.status(404).json({"message":'Project not found'});
        }
        task.save(function(err,savedTask){
            if (err){
                return next (err);
            }
            foundProject.tasks.push(savedTask._id);
            foundProject.save();
            return res.status(201).json({savedTask});
        });
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

router.delete('/:id/tasks/:task_id', function(req, res, next){
    var project_id = req.params.id;
    var task_id = req.params.task_id;
    Project.findByIdAndUpdate(project_id,{$pull: {"tasks": task_id}}, {safe: false, upsert: false},
        function(err, project){
        if(err){
            return next(err);
        }
        res.json({"message": "task deleted"});
        });
});

// patch

router.patch('/:id', function(req, res,next) {
    var id = req.params.id;
    Project.findById(id, function (err, project) {
        if (err) {
            return next(err);
        }
        if (project == null) {
            return res.status(404).json(
                {"message": "Project not found"});
        }
        project.name = (req.body.name || project.name);
        project.description = (req.body.description || project.description);
        project.status = (req.body.status || project.status);
        project.startDate = (req.body.startDate || project.startDate);
        project.projectedEndDate = (req.body.projectedEndDate || project.projectedEndDate);
        project.actualEndDate = (req.body.actualEndDate || project.actualEndDate);
        project.save();
        res.json(project);
    });
});


module.exports = router;
