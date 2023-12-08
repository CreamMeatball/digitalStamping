// store Schema 생성

const mongoose = require('mongoose');

const storeSchema = mongoose.Schema({
    id : String,
    password : {type : String, min : 6, max : 20},
    storeName : String,
    storeLogo : String,
    storeAddress : String,
    stampMax : Number,
    stampEvent : String,
    stampImage : [String],
});

module.exports = mongoose.model('store', storeSchema);