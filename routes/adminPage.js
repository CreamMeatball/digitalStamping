const express = require('express');
const app = express();
const router = express.Router();
const controller = require('../controllers/adminPage');

router.get('/', controller.get);

router.post('/', controller.post);

module.exports = router;