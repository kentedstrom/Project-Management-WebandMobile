var express = require('express');
var router = express.Router();

var Budget = require('../models/budgetModel');



//return a list of all budgets

router.get('/', function(req, res, next) {
    Budget.find(function(err, budgetController) {
        if (err) { return next(err); }
        res.json({'tasks': budgetController});
    });
});


//creates a new budget
router.post('/', function(req, res, next) {
    var budget = new Budget(req.body);
    budget.save(function(err) {
        if (err) { return next(err); }
        res.status(201).json(budget);
    });
});



//updates the budget with a certain name (not needed)
/*
router.put('/:id', function(req, res) {
    var id = req.params.name;
    var updated_task = {

        "name": req.body.name,
        "due date": req.body.description,
        "status": req.body.status
    }
    res.json(updated_task);
});
*/












module.exports = router;