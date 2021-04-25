const express = require('express')
const router = express.Router()
const FolderController = require('../controllers/folder.controller')
const passport = require('passport');

router.post('/create', passport.authenticate('jwt', {session: false}, null), FolderController.create);
router.delete('/delete', passport.authenticate('jwt', {session: false}, null), FolderController.verifyAccess, FolderController.delete);
router.put('/edit_title', passport.authenticate('jwt', {session: false}, null), FolderController.verifyAccess, FolderController.editTitle);
router.get('/get_one', passport.authenticate('jwt', {session: false}, null), FolderController.verifyAccess, FolderController.getById);
router.get('/get_all', passport.authenticate('jwt', {session: false}, null), FolderController.verifyAccess, FolderController.getAllById);

module.exports = router;
