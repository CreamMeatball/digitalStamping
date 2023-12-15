const Store = require('../models/store');

const bcrypt = require('bcrypt');
const saltRounds = 10;

// 한국표준시 세팅
var moment = require('moment-timezone');
moment.tz.setDefault('Asia/Seoul');

// task 나열
exports.get = async function(req, res) {
    var session = req.session;
    console.log('---logoutStore---');
    try {
        if (session.isLogin) {
            await req.session.destroy(function (err) {
                if (err) {
                    console.log("logout attempt error", err);
                }
                else {
                    res.redirect('/mainStore');
                }
            })
        }
    } catch (err) {
        console.error('logoutStore failed', err);
        res.status(500).send('Internal Server Error');
    }
}