const express = require('express');
const app = express();
const router = express.Router();
const controller = require('../controllers/mainStore');

router.get('/', controller.get);

// router.get('/findCustomer', controller.findCustomer);

router.get('/stampAdd', controller.stampAdd);

module.exports = router;