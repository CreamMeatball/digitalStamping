const express = require('express');
const app = express();
const router = express.Router();
const controller = require('../controllers/mainCustomer');

router.get('/', controller.get);

router.get('/registerCustomer', controller.registerCustomer);

module.exports = router;