const Store = require('../models/store');
const Customer = require('../models/customer');





// 한국표준시 세팅
var moment = require('moment-timezone');
moment.tz.setDefault('Asia/Seoul');

// task 나열
// exports.get = async function(req, res) {
//     console.log('---store---');
//     try {
//         // const store = await store.find({});
//         res.render('mainStore', { purchaseHistory : [] });
//     } catch (err) {
//         console.error('mainStore page get failed: ', err);
//         res.status(500).send('Internal Server Error');
//     }
// }

exports.get = async function(req, res) {
    console.log('---store---');
    const nickname = req.query.nickname;
    try {
        if (nickname) {
            const customer = await Customer.findOne({ nickname : nickname });
            if (customer) {
                console.log('successfully find customer [', nickname, ']');
                return res.render('mainStore', { purchaseHistory : customer.purchaseHistory });
            } else {
                console.log('cannot find customer [', nickname, ']');
            }
        }

        res.render('mainStore', { purchaseHistory : [] });

    } catch (err) {
        console.error('mainStore page get failed: ', err);
        res.status(500).send('Internal Server Error');
    }
}

// exports.findCustomer = async function(req, res) {
//     console.log('---mainStore find Customer---');
//     const nickname = req.body.nickname;
//     try {
//         const customer = await Customer.findOne({ nickname });
//         if (customer) {
//             console.log('find customer data success');
//             res.render('mainStore', { purchaseHistory : customer.purchaseHistory });
//         }
//         else {
//             console.log('find customer data failed - cant find customer who has that nickname');
//             res.render('mainStore', { purchaseHistory : [] });
//         }
//     } catch (err) {
//         console.error('find customer failed at all : ', err);
//         res.status(500).send('Internal Server Error');
//     }
// };

exports.stampAdd = async function(req, res) {
    // try {
    //     const stampingTask = new stampingTask({
    //         stampingNumber : 1,
    //         price : req.body.price, // 추후 price 입력란으로 mapping 필요
    //         date : moment().format("YYYY-MM-DD HH:mm:ss")
    //     });
    //     await stampingTask.save();
    //     console.log('stampingTask save success');
    //     console.table([{id: stampingTask._id, stampingNumber: stampingTask.stampingNumber, price: stampingTask.price, date: stampingTask.date}]);
    //     res.redirect('/stamping');
    // } catch(err) {
    //     console.err('stampingTask save failed');
    //     res.redirect('/stamping');
    // }
    console.log('---store---');
    try {
        // const store = await store.find({});
        res.render('mainStore');
    } catch (err) {
        console.error('mainStore page get failed: ', err);
        res.status(500).send('Internal Server Error');
    }
}