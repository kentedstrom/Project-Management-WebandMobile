var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var budgetSchema = new Schema({
    costs: { type: Number},
    income: { type: Number }
});

module.exports = mongoose.model('budgetController', budgetSchema);
