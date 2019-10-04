var express = require('express');
var router = express.Router();
var StaffMember = require('../models/staffMember');

// Return a list of all Staff Members
router.get('/', function(req, res, next) {
    StaffMember.find(function(err, staffMembers) {
        if (err) { return next(err); }
        res.json({'staffMembers': staffMembers});
    });
});

// Create a new Staff Member
router.post('/', function(req, res, next) {
    var staffMember = new StaffMember(req.body);
    staffMember.save(function(err) {
        if (err) { return next(err); }
        res.status(201).json(staffMember);
    });
});

// Return the Staff Member with the given ID
router.get('/:id', function(req, res, next) {
    var id = req.params.id;
    StaffMember.findById(id, function(err, staffMember) {
        if (err) { return next(err); }
        if (staffMember === null) {
            return res.status(404).json({'message': 'Staffmember not found'});
        }
        res.json(staffMember);
    });
});

//Put for all Staff Members
router.put('/', function(req, res, next) {
    StaffMember.find(function(err, staffMember) {
    if (err) { return next(err); }
    if (staffMember == null) {
    return res.status(404).json({"message": "Staffmember not found"});
    }
    staffMember.name = req.body.name;
    staffMember.salaryPerHour = req.body.salaryPerHour;
    staffMember.email = req.body.email;
    staffMember.save();
    res.json(staffMember);
    });
    });

/* Doesn't work. But will we ever delete all staff members at once?
router.delete('/', function(req, res, next) {
StaffMember.find({function(err, staffMember) {
if (err) { return next(err); }
if (staffMember == null) {
return res.status(404).json(
{"message": "staffMember not found"});
}
staffMember.delete();
res.json(staffMember);
});
});
*/

//Updates the staffMember with a certain ID
router.put('/:id', function(req, res) {
    var id = req.params.id;
    var updated_staffMember = {

        "name": req.body.name,
        "salaryPerHour": req.body.salaryPerHour,
        "email": req.body.email
    }
   // projects[id] = updated_project;
    res.json(updated_staffMember);
});


// Delete the staffMember with the given ID
router.delete('/:id', function(req, res, next) {
    var id = req.params.id;
    StaffMember.findOneAndDelete({_id: id}, function(err, staffMember) {
        if (err) { return next(err); }
        if (staffMember === null) {
            return res.status(404).json({'message': 'Staffmember not found'});
        }
        res.json(staffMember);
    });
});

router.patch('/:id', function(req, res, next) {
    var id = req.params.id;
    StaffMember.findById(id, function (err, staffMember) {
        if (err) {
            return next(err);
        }
        if (staffMember == null) {
            return res.status(404).json(
                {"message": "Staffmember not found"});
        }
        staffMember.name = (req.body.name || staffMember.name);
        staffMember.salaryPerHour = (req.body.salaryPerHour || staffMember.salaryPerHour);
        staffMember.email = (req.body.email || staffMember.email);
        staffMember.save();
        res.json(staffMember);
    });
})
/*
 */
/*
(a) POST /camels - DONE
(b) GET /camels - DONE
(c) PUT /camels - DONE
(d) DELETE /camels - Doesnt work, but will we ever delete all staff members?
(e) GET /camels/:id - DONE
(f) PUT /camels/:id - DONE
(g) PATCH /camels/:id - DONE
(h) DELETE /camels/:id - DONE
*/

/*





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
*/

module.exports = router;