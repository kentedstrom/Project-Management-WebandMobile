var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var staffMemberSchema = new Schema({
    name: {type: String},
    salaryPerHour: {type: Number},
    email: {type: String}
});

module.exports = mongoose.model('staffMembers', staffMemberSchema);