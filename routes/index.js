var express = require('express');
var router = express.Router();

const users = require('./users');

router.use('/user', users);


module.exports = router;
