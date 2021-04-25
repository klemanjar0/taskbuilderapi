const express = require('express')
const router = express.Router()
const NoteController = require('../controllers/note.controller')
const passport = require('passport');

router.post('/create', passport.authenticate('jwt', {session: false}, null), NoteController.verifyCreateAccess, NoteController.create);
router.delete('/delete', passport.authenticate('jwt', {session: false}, null), NoteController.verifyAccess, NoteController.delete);
router.put('/edit_title', passport.authenticate('jwt', {session: false}, null), NoteController.verifyAccess, NoteController.editTitle);
router.put('/edit_body', passport.authenticate('jwt', {session: false}, null), NoteController.verifyAccess, NoteController.editBody);
router.get('/get_one', passport.authenticate('jwt', {session: false}, null), NoteController.verifyAccess, NoteController.getById);
router.get('/get_all', passport.authenticate('jwt', {session: false}, null), NoteController.verifyAccess, NoteController.getAllById);

module.exports = router;
