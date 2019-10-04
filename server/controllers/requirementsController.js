var express = require('express');
var router = express.Router();
var Requirement = require('../models/requirement');

// Return a list of all requirements
router.get('/', function(req, res, next) {
    Requirement.find(function(err, requirements) {
        if (err) { return next(err); }
        res.json({'requirements': requirements});
    });
});

// Create a new requirement
router.post('/', function(req, res, next) {
    var requirement = new Requirement(req.body);
    requirement.save(function(err) {
        if (err) { return next(err); }
        res.status(201).json(requirement);
    });
});

router.post('/:id', function(req, res){
   res.status(405).json({"message": "method not allowed"});
});

// replace requirement with given id
router.put('/:id', function(req, res) {
    var id = req.params.id;
    Requirement.findById(id, function(err, requirement){
        if(err){
            return next(err);
        }
        if(requirement == null){
            return res.status(404).json({"message": "Client not found"});
        }
        requirement.title = req.body.title;
        requirement.description = req.body.description;
        requirement.save();
        res.json(requirement);
    });
});

router.patch('/:id', function(req, res){
    var id = req.params.id;
    Requirement.findById(id, function(err, requirement){
        if(err){
            return next(err);
        }
        if(requirement == null){
            return res.status(404).json({"message": "Requirement not found"});
        }
        requirement.title = (req.body.title || requirement.title);
        requirement.description = (req.body.description || requirement.description);
        requirement.save();
        res.json(requirement);
    });
});

// Return the requirement with the given ID
router.get('/:id', function(req, res, next) {
    var id = req.params.id;
    Requirement.findById(id, function(err, requirement) {
        if (err) { return next(err); }
        if (requirement === null) {
            return res.status(404).json({'message': 'Requirement not found'});
        }
        res.json(requirement);
    });
});

router.get('/:title', function(req, res, next) {
    var id = req.params.id;
    Requirement.findById(id, function(err, requirement) {
        if (err) { return next(err); }
        if (requirement === null) {
            return res.status(404).json({'message': 'Requirement not found'});
        }
        res.json(requirement[req.params.title]);
    });
});


// Delete the client with the given ID
router.delete('/:id', function(req, res, next) {
    var id = req.params.id;
    Requirement.findOneAndDelete({_id: id}, function(err, requirement) {
        if (err) { return next(err); }
        if (requirement === null) {
            return res.status(404).json({'message': 'Requirement not found'});
        }
        res.json(requirement);
    });
});

module.exports = router;
