// All Routers Exports

/*
If new router index created, this index.js manage all router together
ex)
const newRouter = require('./new');
router.use('/new', newRouter);
*/

const express = require('express');
const app = express();
const router = express.Router();

// ./stamping.js 의 router를 이용
const stampingRouter = require('./stamping');
// refactoring
router.use('/stamping', stampingRouter);
// localhost:8080/stamping 으로 라우팅

const mainStoreRouter = require('./mainStore');
router.use('/mainStore', mainStoreRouter);

const loginStoreRouter = require('./loginStore');
router.use('/loginStore', loginStoreRouter);

const logoutStoreRouter = require('./logoutStore');
router.use('/logoutStore', logoutStoreRouter);

const registerStoreRouter = require('./registerStore');
router.use('/registerStore', registerStoreRouter);

const mainCustomerRouter = require('./mainCustomer');
router.use('/mainCustomer', mainCustomerRouter);

const adminPageRouter = require('./adminPage');
router.use('/adminPage', adminPageRouter);

module.exports = router;
// exports 하여 server.js에서 사용.