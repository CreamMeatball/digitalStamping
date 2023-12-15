const bcrypt = require('bcrypt');
const saltRounds = 10;

const Customer = require('../models/customer');
const Store = require('../models/store');

// 한국표준시 세팅
var moment = require('moment-timezone');
moment.tz.setDefault('Asia/Seoul');

// task 나열
exports.get = async function(req, res) {
    console.log('---mainCustomer---');
    const nickname = req.query.nickname;
    const storeName = req.query.storeName;
    try {
        if (nickname && nickname.length>0) {
            const customer = await Customer.findOne({ nickname : nickname });
            if (customer) {
                console.log('successfully find customer [', nickname, ']');
                const store = await Store.findOne({ storeName : storeName });
                if (store) {
                    // 검색한 store가 있을 경우
                    if (customer.visitedStore.includes(storeName)) {
                        // 검색한 store가 방문한 적이 있는 store인 경우
                        console.log('visited store');

                        console.log("customer : ", customer);
                        var visitedStoreIndex = customer.visitedStore.indexOf(storeName);
                        var stampNumber = customer.storeStamp[visitedStoreIndex];
                        console.log('stampNumber : ', stampNumber);
                        return res.render('mainCustomer', { nickname : customer.nickname, alertMessage : [], stampNumber : stampNumber });
                    }
                    else {
                        console.log('not visited store');
                        // 검색한 store가 있긴하나, 방문한 적이 없는 store인 경우
                        customer.visitedStore.push(storeName);
                        customer.storeStamp.push(0);
                        customer.storeStampComplete.push(0);
                        await customer.save();
                        console.log("customer save success");
                        console.log("customer : ", customer);

                        var visitedStoreIndex = customer.visitedStore.indexOf(storeName);
                        var stampNumber = customer.storeStamp[visitedStoreIndex];
                        console.log('stampNumber : ', stampNumber);
                        return res.render('mainCustomer', { nickname : customer.nickname, alertMessage : [], stampNumber : stampNumber });
                    }
                }
                else {
                    // 검색한 store가 없을 경우
                    console.log('cannot find store [', storeName, ']');
                    return res.render('mainCustomer', { nickname : [], alertMessage : [], stampNumber : 0 });
                }

            } else {
                console.log('cannot find customer [', nickname, ']');
                return res.render('mainCustomer', { nickname : nickname, alertMessage: "Cannot find nickname. Do you want to create a new user?", stampNumber : 0 });
            }
        }

        res.render('mainCustomer', { nickname : [], alertMessage : [], stampNumber : 0 });
    } catch (err) {
        console.error('mainCustomer failed', err);
        res.status(500).send('Internal Server Error');
    }
}

exports.registerCustomer = async function(req, res) {
    console.log('--- register new Customer ---');

    console.log('register customer attempt');
    const nickname = req.query.nickname;
    console.log('attempt with nickname : ', nickname);
    try {
        const nickname = req.query.nickname;
        const password = "123456";
        const address = "default address";
        const age = -1;
        const visitedStore = [];
        const storeStamp = [];
        const storeStampComplete = [];
        const purchaseHistory = [];

        const hashedPassword = await bcrypt.hash(password, 10);

        let customer = await Customer.findOne({ nickname : nickname });
        if (customer) {
            console.log("Nickname already exists");
            return res.redirect('/mainCustomer');
        }

        customer = new Customer({
            nickname: nickname,
            password: hashedPassword,
            address: address,
            age: age,
            visitedStore: visitedStore,
            storeStamp: storeStamp,
            storeStampComplete: storeStampComplete,
            purchaseHistory: purchaseHistory,
        });

        await customer.save()
        .then(() => console.log("register customer success"))
        .catch(err => console.log('register customer failed', err))

        return res.redirect('/mainCustomer');

    } catch (err) {
        console.error('register customer Attempt failed', err);
        res.status(500).send('Internal Server Error');
    }
    // res.redirect('/mainCustomer');
}