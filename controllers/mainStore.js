const Store = require('../models/store');
const Customer = require('../models/customer');


// 한국표준시 세팅
var moment = require('moment-timezone');
moment.tz.setDefault('Asia/Seoul');


exports.get = async function(req, res) {
    console.log('---store---');
    const nickname = req.query.nickname;
    const isLogin = req.session.isLogin;
    const storeId = req.session.storeId;
    const storeName = req.session.storeName;
    var alertMessage = "";
    // mainStore?storeId=${store._id}&storeName=${store.name}`
    try {
        if (nickname) {
            // nickname 파라미터가 있을 경우
            const customer = await Customer.findOne({ nickname : nickname });
            if (customer) {
                // nickname 값을 가진 데이터가 존재할 경우
                console.log('successfully find customer [', nickname, ']');
                if (customer.visitedStore.includes(storeName)) {
                    // 검색한 customer가 가게에 방문한 적이 있는 경우
                    console.log("visited customer");

                    var visitedStoreIndex = customer.visitedStore.indexOf(storeName);
                    var stampNumber = customer.storeStamp[visitedStoreIndex];
                    console.log('stampNumber : ', stampNumber);
                    return res.render('mainStore', { isLogin : isLogin, storeId : storeId, storeName : storeName, nickname : customer.nickname, purchaseHistory : customer.purchaseHistory, stampNumber : stampNumber, alertMessage : "" });
                }
                else {
                    // 검색한 customer가 가게에 방문한 적이 없는 경우
                    console.log("not visied customer");

                    customer.visitedStore.push(storeName);
                    customer.storeStamp.push(0);
                    customer.storeStampComplete.push(0);
                    await customer.save();
                    console.log("customer save success");
                    console.log("customer : ", customer);

                    var visitedStoreIndex = customer.visitedStore.indexOf(storeName);
                    var stampNumber = customer.storeStamp[visitedStoreIndex];
                    console.log('stampNumber : ', stampNumber);

                    return res.render('mainStore', { isLogin : isLogin, storeId : storeId, storeName : storeName, nickname : customer.nickname, purchaseHistory : customer.purchaseHistory, stampNumber : stampNumber, alertMessage : "" });
                }
            } else {
                // nickname 값을 가진 데이터가 존재하지 않을 경우
                console.log('cannot find customer [', nickname, ']');

                return res.redirect('/mainStore');
            }
        }

        // nickname 검색하지 않았을 때 기본 render
        res.render('mainStore', { isLogin : isLogin, storeId : storeId, storeName : storeName, nickname : [], purchaseHistory : [], stampNumber : 0, alertMessage : "" });

    } catch (err) {
        console.error('mainStore page get failed: ', err);
        res.status(500).send('Internal Server Error');
    }
}

exports.stampAdd = async function(req, res) {
    console.log('---store---');
    const nickname = req.query.nickname;
    const isLogin = req.session.isLogin;
    const storeId = req.session.storeId;
    const storeName = req.session.storeName;
    const price = req.query.stampAdd;
    var alertMessage = "";
    try {
        console.log("nickname : ", nickname);
        console.log("isLogin : ", isLogin);
        console.log("storeId : ", storeId);
        console.log("storeName : ", storeName);
        const customer = await Customer.findOne({ nickname : nickname });
        var visitedStoreIndex = customer.visitedStore.indexOf(storeName);
        var stampNumber = customer.storeStamp[visitedStoreIndex];
        
        const store = await Store.findOne({ storeName : storeName });
        console.log("store : ", store);
        const stampMax = store.stampMax;

        console.log('before add stampNumber : ', stampNumber);

        if(stampNumber<stampMax) {
            // 손님의 스탬프가 꽉 차지 않았을 경우
            customer.storeStamp[visitedStoreIndex] += 1;
            stampNumber = customer.storeStamp[visitedStoreIndex];
            customer.purchaseHistory.push({store : storeName, date : moment(), price : price});
            await customer.save();
            console.log('after add stampNumber : ', stampNumber);
            console.log('customer : ', customer);
    
            console.log('stamp add success');
        }
        else {
            // 손님의 스탬프가 꽉 찼을 경우
            customer.storeStamp[visitedStoreIndex] = 0;

            customer.storeStamp[visitedStoreIndex] += 1;
            customer.storeStampComplete[visitedStoreIndex] += 1;
            stampNumber = customer.storeStamp[visitedStoreIndex];
            customer.purchaseHistory.push({store : storeName, date : moment(), price : price});
            await customer.save();
            console.log('after add stampNumber : ', stampNumber);
            console.log('customer : ', customer);
    
            console.log('stamp add success');
        }


        // return res.render('mainStore', { isLogin : isLogin, storeId : storeId, storeName : storeName, nickname : customer.nickname, purchaseHistory : customer.purchaseHistory, stampNumber : stampNumber, alertMessage : "스탬프를 모두 채웠습니다. 혜택을 제공해주세요."});
        // return res.redirect('/mainStore?nickname=' + nickname + '&?alertMessage=' + "스탬프를 모두 채웠습니다. 혜택을 제공해주세요.");
        return res.redirect('/mainStore?nickname=' + nickname);
        
    } catch (err) {
        console.error('mainStore page get failed: ', err);
        res.status(500).send('Internal Server Error');
    }
}