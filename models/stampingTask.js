// stamping schema

const mongoose = require('mongoose');

const stampingTaskSchema = mongoose.Schema({
    stampingNumber : Number,
    price : Number,
    date : String
});

module.exports = mongoose.model('stampingTask', stampingTaskSchema);