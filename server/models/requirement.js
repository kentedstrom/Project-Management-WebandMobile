var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var requirementSchema = new Schema({
    title: {type: String},
    description: { type: String }
});

module.exports = mongoose.model('requirements', requirementSchema);
