const express = require('express');
const router = express.Router();

const users = require('./users');
const folders = require('./folders');
const notes = require('./notes');

router.get('/', (req, res) => {
    res.send('Hello World!')
})

router.use('/user', users);
router.use('/folder', folders);
router.use('/note', notes);

module.exports = router;
