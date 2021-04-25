const express = require('express')
const router = express.Router()
const passport = require('passport')
const AuthController = require('../controllers/auth.controller')

router.get('/', (req, res) => {
    res.send('User test success')
})
router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.get('/me', passport.authenticate('jwt', {session: false}, null), AuthController.me);



module.exports = router;
