// customer Schema 생성

const mongoose = require('mongoose');

const customerSchema = mongoose.Schema({
    nickname : String,
    password : {type : String, min : 6, max : 20},
    address : String,
    age : Number,
    visitedStore : [String],
    storeStamp : [Number],
    storeStampComplete : [Number],
    purchaseHistory : [{store : String, date : String, price : Number }]
});

module.exports = mongoose.model('customer', customerSchema);