const express = require('express');
const app = express();
const router = express.Router();
const controller = require('../controllers/loginStore');

router.get('/', controller.get);

router.post('/login', controller.login);

module.exports = router;