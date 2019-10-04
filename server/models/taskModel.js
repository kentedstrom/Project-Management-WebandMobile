


var mongoose = require('mongoose');
var Schema = mongoose.Schema;



var taskSchema = new Schema({
    name: {type: String},
    dueDate: {type: Date},
    description: {type: String},
    completed: {type: Boolean}
})

module.exports = mongoose.model('taskController', taskSchema);