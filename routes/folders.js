var express = require('express')
var router = express.Router()
const passport = require('passport')
const FolderController = require('../controllers/folder.controller')


router.post('/create', FolderController.create);
router.delete('/delete', FolderController.delete);
router.put('/edit_title', FolderController.editTitle);
router.get('/get_one', FolderController.getById);
router.get('/get_all', FolderController.getAllById);

module.exports = router;
