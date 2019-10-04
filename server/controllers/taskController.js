var express = require('express');
var router = express.Router();
var tasks = require('express').Router();
var Task  = require('../models/taskModel');



//return a list of all tasks

router.get('/', function(req, res, next) {
    Task.find(function(err, taskController) {
        if (err) { return next(err); }
        res.json({'tasks': taskController});
    });
});


//creates a new task
router.post('/', function(req, res, next) {
    var task = new Task(req.body);
    task.save(function(err) {
        if (err) { return next(err); }
        res.status(201).json(task);
    });
});

//updates the task with a certain id


router.put('/:id', function(req, res) {
    var id = req.params.id;

    Task.findById(id, function (err, newTask) {
        if (err) {
            return next(err);
        }
        if (newTask === null) {
            return res.status(404).json({"message": 'task not found'});
        }

        newTask.name = req.body.name;
        newTask.dueDate = req.body.dueDate;
        newTask.description = req.body.description;
        newTask.completed = req.body.completed;

        newTask.save();
        res.json(newTask);
    });
});


// Return the task with the given ID
    router.get('/:id', function (req, res, next) {
        var id = req.params.id;
        Task.findById(id, function (err, task) {
            if (err) {
                return next(err);
            }
            if (task === null) {
                return res.status(404).json({'message': 'Task not found'});
            }
            res.json(task);
        });
    });

// get task via album id

    router.get('/tasks', function (req, res, next) {
        var projectId = req.params.projectId;
        console.log("we are here");
        var trackId = req.params.trackId;
        Task.findById(trackId, function (err, tasks) {
            if (err) {
                return next(err);
            }
            if (trackId === null) {
                return res.status(404).json({'message': 'track not found'});
            }
            res.json({'tasks for this project:': tasks});
        })
    });

//find task by name

    router.get('/:name', function (req, res, next) {
        var id = req.params.id;
        Task.findById(id, function (err, task) {
            if (err) {
                return next(err);
            }
            if (task === null) {
                return res.status(404).json({'message': 'Task not found'});
            }
            res.json(task[req.params.name]);
        });
    });

// Delete the task with the given ID
    router.delete('/:id', function (req, res, next) {
        var id = req.params.id;
        Task.findOneAndDelete({_id: id}, function (err, task) {
            if (err) {
                return next(err);
            }
            if (task === null) {
                return res.status(404).json({'message': 'Task not found'});
            }
            res.json(task);
        });
    });
    router.patch('/:id', function (req, res, next) {
        var id = req.params.id;
        Task.findById(id, function (err, taskmodel) {
            if (err) {
                return next(err);
            }
            if (taskmodel == null) {
                return res.status(404).json(
                    {"message": "Staffmember not found"});
            }
            taskmodel.name = (req.body.name || taskmodel.name);
            taskmodel.dueDate = (req.body.dueDate || taskmodel.dueDate);
            taskmodel.description = (req.body.description || taskmodel.description);
            taskmodel.completed = (req.body.completed || taskmodel.completed);
            taskmodel.save();
            res.json(taskmodel);
        });
    });




module.exports = router;