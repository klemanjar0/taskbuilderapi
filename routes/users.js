var express = require('express')
var router = express.Router()
const passport = require('passport')
const AuthController = require('../controllers/auth.controller')


router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.get('/me', passport.authenticate('jwt', {session: false}, null), AuthController.me);



module.exports = router;
