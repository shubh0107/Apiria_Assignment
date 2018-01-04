var mongoose = require('mongoose');

var schema = new mongoose.Schema(
     mongoose.Schema.Types.Mixed
,{strict: false});


/*
var schema = new mongoose.Schema({
    EMPLOYEE_ID: Number,
    FIRST_NAME: String,
    LAST_NAME: String,
    JOB_ID: String,
});*/



module.exports = mongoose.model('File', schema);