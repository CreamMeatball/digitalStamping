const express = require('express');
const app = express();
const router = express.Router();
const controller = require('../controllers/registerStore');

router.get('/', controller.get);

router.post('/', controller.register);

module.exports = router;