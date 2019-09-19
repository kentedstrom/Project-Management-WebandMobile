var express = require('express');
var router = express.Router();

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



//updates the task with a certain name

router.put('/:id', function(req, res) {
    var id = req.params.name;
    var updated_task = {

        "name": req.body.name,
        "due date": req.body.description,
        "status": req.body.status
    }
    res.json(updated_task);
});


// Return the task with the given ID
router.get('/:id', function(req, res, next) {
    var id = req.params.id;
    Task.findById(id, function(err, task) {
        if (err) { return next(err); }
        if (task === null) {
            return res.status(404).json({'message': 'Task not found'});
        }
        res.json(task);
    });
});



//find task by name

router.get('/:name', function(req, res, next) {
    var id = req.params.id;
    Task.findById(id, function(err, task) {
        if (err) { return next(err); }
        if (task === null) {
            return res.status(404).json({'message': 'Task not found'});
        }
        res.json(task[req.params.name]);
    });
});

// Delete the task with the given ID
router.delete('/:id', function(req, res, next) {
    var id = req.params.id;
    Task.findOneAndDelete({_id: id}, function(err, task) {
        if (err) { return next(err); }
        if (task === null) {
            return res.status(404).json({'message': 'Task not found'});
        }
        res.json(task);
    });
});

module.exports = router;