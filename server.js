// express server

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const router = require('./routes/index'); // ./routes/index.js 에서 정의되어 exports된 router를 사용
app.use(router);


app.listen(8080, function() {
    console.log('enter in 8080');
});

app.get('/mainStore', function(req, res) {
    res.sendFile(__dirname + '/public' + '/mainStore.html')
})

// mongodb

mongoose.connect('mongodb://localhost:27017/stamping', {
    useNewUrlParser: true } );

var db = mongoose.connection;

// 연결 실패 시
db.on('error', function() {
    console.log('Connection Failed!');
});

// 연걸 성공 시
db.once('open', function() {
    console.log('Connection Successful!');
});


// test DB input

// nickname : String,
// password : {type : String, min : 6, max : 20},
// address : String,
// age : Number,
// visitedStore : [String],
// storeStamp : [Number],
// storeStampComplete : [Number],
// purchaseHistory : [{date : String, price : Number }]

const Customer = require('./models/customer');

const testData = [
    {
      nickname: 'test1',
      password: 'testpassword1',
      address: 'Test Address 1',
      age: 25,
      visitedStore: ['Store1', 'Store2'],
      storeStamp: [1, 2],
      storeStampComplete: [3, 4],
      purchaseHistory: [
        { store: 'Store1', date: '2023-01-01', price: 50 },
        { store: 'Store2', date: '2023-02-01', price: 75 }
      ]
    },
    {
      nickname: 'test2',
      password: 'testpassword2',
      address: 'Test Address 2',
      age: 30,
      visitedStore: ['Store3', 'Store4'],
      storeStamp: [1, 2],
      storeStampComplete: [3, 4],
      purchaseHistory: [
        { store: 'Store3', date: '2023-03-01', price: 100 },
        { store: 'Store4', date: '2023-04-01', price: 125 }
      ]
    },
    {
        nickname: 'test3',
        password: 'testpassword3',
        address: 'Test Address 3',
        age: 23,
        visitedStore: ['Store2', 'Store3'],
        storeStamp: [2, 1],
        storeStampComplete: [4, 3],
        purchaseHistory: [
          { store: 'Store2', date: '2023-03-02', price: 90 },
          { store: 'Store3', date: '2023-04-02', price: 160 }
        ]
      }
];

// Insert test data into the database
async function insertTestData() {
    try {
      await Customer.insertMany(testData);
      console.log('Test data inserted successfully');
    } catch (error) {
      console.error('Error inserting test data:', error);
    }
    // finally {
    //   // Close the database connection after inserting data
    //   mongoose.connection.close();
    // }
}
  
// Call the function to insert test data
insertTestData();



// // customer Schema 생성
// const customer = mongoose.Schema({
//     nickname : String,
//     password : {type : String, min : 6, max : 20},
//     address : String,
//     age : Number,
//     visitedStore : [String],
//     storeStamp : [Number],
//     storeStampComplete : [Number],
//     purchaseHistory : [{date : { type : Date, default : Date.now }, price : Number }]
// });

// // store Schema 생성
// const store = mongoose.Schema({
//     id : String,
//     password : {type : String, min : 6, max : 20},
//     storeName : String,
//     storeLogo : String,
//     storeAddress : String,
//     stampMax : Number,
//     stampEvent : String,
//     stampImage : [String],
// })

// // customer Schema를 통해 model로 컴파일
// const Customer = mongoose.model('Customer', customer);

// // model Structure로 새로운 customer 객체 생성
// var newCustomer1 = new Customer({
//     name:'Park Cheol Hyun',
//     password: '1234',
//     address: '서울특별시 강동구 상일동',
//     age: 24,
//     visitedStore : ['강동 에그타르트', '카페 482'],
//     storeStamp : [3, 5],
//     storeStampComplete : [1, 2],
//     purchaseHistory : [{price : 35000}, {price : 24000}]
// });

// // customer 데이터 저장
// newCustomer1.save()
// .then(data => {
//     console.log('Save complete!', data);
// })
// .catch(error => {
//     console.log('Error occurred!', error);
// })

// // store Schema를 통해 model로 컴파일
// const Store = mongoose.model('Store', store);

// // model Structure로 새로운 store 객체 생성
// var newStore1 = new Store({
//     id : 'store1',
//     password : '1234',
//     storeName : '강동 에그타르트',
//     storeLogo : 'Logo1',
//     storeAddress : '서울특별시 강동구 상일로 123',
//     stampMax : 8,
//     stampEvent : '결제 시 5000원 할인!',
//     stampImage : ['stampImage1', 'stampImage2'],
// })


// // customer 데이터 저장
// newStore1.save()
// .then(data => {
//     console.log('Save complete!', data);
// })
// .catch(error => {
//     console.log('Error occurred!', error);
// })