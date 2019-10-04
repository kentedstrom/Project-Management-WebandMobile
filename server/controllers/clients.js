var express = require('express');
var router = express.Router();
var Client = require('../models/client');


// returns all clients with pagination
router.get('/', function(req, res, next){
    let perPage = 4;
    let page = parseInt(req.query.page) || 0;
    let pages = 0;
    let nextUrl = '';
    let prevUrl = '';
    Client.countDocuments().exec(function(err, count){
        Client.find().limit(perPage).skip(perPage * page).exec(function(err, clients){
            pages = Math.floor(count / perPage);
            if(page === 0){
                res.json({
                    clients,
                    currentPage: page,
                    pages,
                    count,
                    prevUrl: ``,
                    nextUrl: `http://localhost:3000/api/clients?page=${page + 1}`
                })
            } else if(page === pages - 1){
                res.json({
                    clients: clients,
                    currentPage: page,
                    pages,
                    count,
                    prevUrl: `http://localhost:3000/api/clients?page=${page - 1}`,
                    nextUrl: ``
                })
            } else if(page > 0 && page < pages){
                res.json({
                    clients: clients,
                    currentPage: page,
                    pages,
                    count,
                    prevUrl: `http://localhost:3000/api/clients?page=${page - 1}`,
                    nextUrl: `http://localhost:3000/api/clients?page=${page + 1}`
                })
            } else{
                res.redirect('/clients')
            }
        });
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

router.post('/:id', function(req, res){
   res.status(405).json({"message": "method not allowed"});
});

// replace client with given id
router.put('/:id', function(req, res) {
    var id = req.params.id;
    Client.findById(id, function(err, client){
        if(err){
            return next(err);
        }
        if(client == null){
            return res.status(404).json({"message": "Client not found"});
        }
        client.name = req.body.name;
        client.contactDetails = req.body.contactDetails;
        client.save();
        res.json(client);
    });
});

router.patch('/:id', function(req, res){
    var id = req.params.id;
    Client.findById(id, function(err, client){
        if(err){
            return next(err);
        }
        if(client == null){
            return res.status(404).json({"message": "Client not found"});
        }
        client.name = (req.body.name || client.name);
        client.contactDetails = (req.body.contactDetails || client.contactDetails);
        client.save();
        res.json(client);
    });
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
