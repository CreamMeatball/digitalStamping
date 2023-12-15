const Store = require('../models/store');

const bcrypt = require('bcrypt');
const saltRounds = 10;

// 한국표준시 세팅
var moment = require('moment-timezone');
moment.tz.setDefault('Asia/Seoul');

// task 나열
exports.get = async function(req, res) {
    console.log('---loginStore---');
    var alertMessage = "";
    try {
        const store = await Store.find({});
        return res.render('loginStore', { store : store, alertMessage : "" } );
    } catch (err) {
        console.error('loginStore failed', err);
        res.status(500).send('Internal Server Error');
    }
}

exports.login = async function(req, res) {
    console.log('---loginTrying---');
    try {
        const store = await Store.findOne({ id : req.body.id });

        if (!store) {
            console.log('Id not correct');
            return res.redirect('/loginStore');
        }
        else {
            // const hashedPassword = await bcrypt.hash(req.body.password, 10);
            const validPassword = await bcrypt.compare(req.body.password, store.password);
            if (validPassword) {
                req.session.isLogin = true;
                req.session.storeId = store.id;
                req.session.storeName = store.storeName;
                console.log("login success");
                console.log("session : ", req.session);
                return res.redirect('/mainStore');
            }
            else {
                console.log('password incorrect');
                return res.redirect('/loginStore');
            }
        }

    } catch (err) {
        console.error('login attempt failed: ', err);
        res.status(500).send('Internal Server Error');
    }
}