var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var projectSchema = new Schema({
    name: {type: String},
    description: {type: String},
    status: {type: Boolean}
})

module.exports = mongoose.model('projects', projectSchema);