const stampingTask = require('../models/stampingTask');

// 한국표준시 세팅
var moment = require('moment-timezone');
moment.tz.setDefault('Asia/Seoul');

// task 나열
exports.get = async function(req, res) {
    console.log('---stampingTask---');
    try {
        const tasks = await stampingTask.find({}).sort({date:-1});
        res.render('stamping', {stampingTasks: tasks});
    } catch (err) {
        console.error('stamping get failed: ', err);
        res.status(500).send('Internal Server Error');
    }
}

exports.write = async function(req, res) {
    try {
        const stampingTask = new stampingTask({
            stampingNumber : 1,
            price : req.body.price, // 추후 price 입력란으로 mapping 필요
            date : moment().format("YYYY-MM-DD HH:mm:ss")
        });
        await stampingTask.save();
        console.log('stampingTask save success');
        console.table([{id: stampingTask._id, stampingNumber: stampingTask.stampingNumber, price: stampingTask.price, date: stampingTask.date}]);
        res.redirect('/stamping');
    } catch(err) {
        console.err('stampingTask save failed');
        res.redirect('/stamping');
    }
}

exports.edit = async function(req, res) {
    const id = req.params.id;
    try {
        const tasks = await stampingTask.find({}).sort({date:-1});
        res.render('stamping-edit', {stampingTasks: tasks, idTask: id});
    } catch (err) {
        console.error('stamping edit failed: ', err);
        res.status(500).send('Internal Server Error');
    }
}

exports.update = async function(req, res) {
    const id = req.params.id;
    try {
        await stampingTask.findByIdAndUpdate(id, { price: req.body.price });
        console.log('stamping update success');
        console.log('id: ' + id + '\nchanged price: ' + req.body.price);
        res.redirect('/stamping');
    } catch (err) {
        console.error('stamping update failed:', err);
        res.status(500).send('Internal Server Error');
    }
};

exports.remove = async function(req, res) {
    const id = req.params.id;
    try {
        await stampingTask.findByIdAndRemove(id);
        console.log('stamping remove success');
        console.log('id: ' + id);
        res.redirect('/stamping');
    } catch (err) {
        console.error('stamping remove error:', err);
        res.status(500).send('Internal Server Error');
    }
};