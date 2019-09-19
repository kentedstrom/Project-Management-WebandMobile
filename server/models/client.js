var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var clientSchema = new Schema({
    name: {type: String},
    contactDetails: { type: String }
});

module.exports = mongoose.model('clients', clientSchema);
