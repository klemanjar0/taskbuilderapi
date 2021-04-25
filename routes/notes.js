const express = require('express')
const router = express.Router()
const NoteController = require('../controllers/note.controller')

router.post('/create', NoteController.create);
router.delete('/delete', NoteController.delete);
router.put('/edit_title', NoteController.editTitle);
router.put('/edit_body', NoteController.editBody);
router.get('/get_one', NoteController.getById);
router.get('/get_all', NoteController.getAllById);

module.exports = router;
