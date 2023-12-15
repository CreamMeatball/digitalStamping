const Store = require('../models/store');

const bcrypt = require('bcrypt');
const saltRounds = 10;

// 한국표준시 세팅
var moment = require('moment-timezone');
moment.tz.setDefault('Asia/Seoul');

// task 나열
exports.get = async function(req, res) {
    const isLogin = req.session.isLogin;
    const storeId = req.session.storeId;
    const storeName = req.session.storeName;
    console.log('---adminPage---');
    var alertMessage = "";
    try {
        if (isLogin) {
            // 로그인 돼있을 경우
            const store = await Store.find({storeName : storeName});
            console.log('store : ', store);
            var storeNameNow = store.storeName;
            console.log('storeNameNow : ', storeNameNow);
            var storeLogo = store.storeLogo;
            var storeAddress = store.storeAddress;
            var stampMax = store.stampMax;
            var stampEvent = store.stampEvent;
            var stampImage = store.stampImage;
            return res.render('adminPage', { storeNameNow : storeNameNow, storeLogo : storeLogo, storeAddress : storeAddress, stampMax : stampMax, stampEvent : stampEvent, stampImage : stampImage, alertMessage : "" } );
        }
        else {
            // 로그인 안 돼있을 경우
            return res.redirect('/loginStore');
        }

    } catch (err) {
        console.error('adminPage failed', err);
        res.status(500).send('Internal Server Error');
    }
}

exports.post = async function(req, res) {
    console.log('edit attempt');
    try {
        const storeId = req.session.storeId;

        const storeNameNow = req.body.storeName;
        const storeLogo = req.body.storeLogo;
        const storeAddress = req.body.storeAddress;
        const stampMax = req.body.stampMax;
        const stampEvent = req.body.stampEvent;
        const stampImage = req.body.Image;

        let store = await Store.findOne({ storeName : storeNameNow });
        if (store) {
            console.log("storeName already exists");
            return res.redirect('/adminPage');
        }

        let store2 = await Store.findOne({ id : storeId });
        console.log('store : ', store2);
        store2.storeName = storeNameNow;
        store2.storeLogo = storeLogo;
        store2.storeAddress = storeAddress;
        store2.stampMax = stampMax;
        store2.stampEvent = stampEvent;
        store2.stampImage = stampImage;

        await store2.save()
        .then(() => console.log("edit success. store : ", store))
        .catch(err => console.log('edit failed', err))

        return res.redirect('/mainStore');

    } catch (err) {
        console.error('edit Attempt failed', err);
        res.status(500).send('Internal Server Error');
    }
}