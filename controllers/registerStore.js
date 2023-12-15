const Store = require('../models/store');

const bcrypt = require('bcrypt');
const saltRounds = 10;

// 한국표준시 세팅
var moment = require('moment-timezone');
moment.tz.setDefault('Asia/Seoul');

// task 나열
exports.get = async function(req, res) {
    console.log('---registerStore---');
    try {
        // const store = await Store.find({});
        return res.render('registerStore');
    } catch (err) {
        console.error('registerStore failed', err);
        res.status(500).send('Internal Server Error');
    }
}

exports.register = async function(req, res) {
    console.log('register attempt');
    try {
        const id = req.body.id;
        const password = req.body.password;
        const storeName = req.body.storeName;
        const storeLogo = req.body.storeLogo;
        const storeAddress = req.body.storeAddress;
        const stampMax = req.body.stampMax;
        const stampEvent = req.body.stampEvent;
        const stampImage = req.body.Image;

        const hashedPassword = await bcrypt.hash(password, 10);

        let store = await Store.findOne({ id : id });
        if (store) {
            console.log("ID already exists");
            return res.redirect('/registerStore');
        }

        let store2 = await Store.findOne({ storeName : storeName });
        if (store2) {
            console.log("storeName already exists");
            return res.redirect('/registerStore');
        }

        store = new Store({
            id: id,
            password: hashedPassword,
            storeName: storeName,
            storeLogo: storeLogo,
            storeAddress: storeAddress,
            stampMax: stampMax,
            stampEvent: stampEvent,
            stampImage: stampImage,
        });

        await store.save()
        .then(() => console.log("register success"))
        .catch(err => console.log('register failed', err))

        return res.redirect('/loginStore');

    } catch (err) {
        console.error('register Attempt failed', err);
        res.status(500).send('Internal Server Error');
    }
}