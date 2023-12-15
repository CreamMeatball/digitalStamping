const express = require('express');
const app = express();
const router = express.Router();
const controller = require('../controllers/logoutStore');

router.get('/', controller.get);

module.exports = router;