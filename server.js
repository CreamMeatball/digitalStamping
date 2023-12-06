// express server

const express = require('express');
const app = express();

app.listen(8080, function() {
    console.log('enter in 8080');
});

app.use(express.static(__dirname + '/public'));

app.get('/mainStore', function(request, response) {
    response.sendFile(__dirname + '/public' + '/mainStore.html')
})

// mongodb

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/testDB', {
    useNewUrlParser: true } );

var db = mongoose.connection;

// db.on('error', console.error.bind(console, 'connection error'));
// db.once('open', function callback() {
//     console.log("mongo db is connected");
// });

// 연결 실패 시
db.on('error', function() {
    console.log('Connection Failed!');
});

// 연걸 성공 시
db.once('open', function() {
    console.log('Connection Successful!');
});

// Schema 생성
var customer = mongoose.Schema({
    name : 'string',
    address : 'string',
    age : 'number'
});

// 정의된 Schema를 model로 컴파일
var Customer = mongoose.model('Schema', customer);

// model Structure로 새로운 객체 생성
var newCustomer = new Customer({name:'Park Cheol Hyun', address: '서울특별시 강동구 상일동', age:'24'});

// 데이터 저장
newCustomer.save()
.then(data => {
    console.log('Save complete!');
})
.catch(error => {
    console.log(error);
})

