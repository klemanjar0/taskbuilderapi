var express = require('express');
var router = express.Router();

const users = require('./users');
const folders = require('./folders')
router.use('/user', users);
router.use('/folder', folders);

module.exports = router;
