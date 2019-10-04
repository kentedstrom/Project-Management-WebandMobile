var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var taskModel = require('../models/taskModel')

var projectSchema = new Schema({
    name: {type: String},
    description: {type: String},
    status: {type: Boolean},
    startDate: {type: Date},
    projectedEndDate: {type: Date},
    actualEndDate: {type: Date},
    tasks: [{ type: Schema.Types.ObjectId, ref: 'tasks' }]
});
//goes in controller
/*
router.post('/api/users/:id/pictures', function(req,res,next){
    var user = req.params.id;
    var picture = new Picutre(req.body)
    User.findById(user,function(err,foundUser){
        if (er) return er;
        picture.save(function(err,savedPic){
            foundUser.pictures.push(savedPic._id);
        }
    }
}
 */
var taskSchema = new Schema({
    name: {type: String},
    dueDate: {type: Date},
    description: {type: String},
    completed: {type: Boolean}
})

var task = mongoose.model('tasks', taskSchema);

module.exports = mongoose.model('projects', projectSchema);
//module.exports += task;