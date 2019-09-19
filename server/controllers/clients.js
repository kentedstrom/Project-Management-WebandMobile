var express = require('express');
var router = express.Router();
var Client = require('../models/client');

// Return a list of all clients
router.get('/', function(req, res, next) {
    Client.find(function(err, clients) {
        if (err) { return next(err); }
        res.json({'clients': clients});
    });
});

// Create a new client
router.post('/', function(req, res, next) {
    var client = new Client(req.body);
    client.save(function(err) {
        if (err) { return next(err); }
        res.status(201).json(client);
    });
});


router.put('/:id', function(req, res) {
    var id = req.params.id;
    var updated_client = {
        "name": req.body.name,
        "contactDetails": req.body.contactDetails
    }
    res.json(updated_client);
});


// Return the client with the given ID
router.get('/:id', function(req, res, next) {
    var id = req.params.id;
    Client.findById(id, function(err, client) {
        if (err) { return next(err); }
        if (client === null) {
            return res.status(404).json({'message': 'Client not found'});
        }
        res.json(client);
    });
});

router.get('/:name', function(req, res, next) {
    var id = req.params.id;
    Client.findById(id, function(err, client) {
        if (err) { return next(err); }
        if (client === null) {
            return res.status(404).json({'message': 'Client not found'});
        }
        res.json(client[req.params.name]);
    });
});


// Delete the client with the given ID
router.delete('/:id', function(req, res, next) {
    var id = req.params.id;
    Client.findOneAndDelete({_id: id}, function(err, client) {
        if (err) { return next(err); }
        if (client === null) {
            return res.status(404).json({'message': 'Client not found'});
        }
        res.json(client);
    });
});

module.exports = router;
