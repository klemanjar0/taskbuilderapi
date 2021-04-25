const NoteService = require('../services/note.service')

class NoteController {
    async create(req, res) {
        try {
            const data = (await NoteService.create(req.body));
            try {
                res.status(200).json(data)
            }
            catch (e) {
                console.log(e)
            }
        }
        catch(e) {
            res.status(422).json(e);
        }
    }
    async editTitle(req, res) {
        try {
            const data = (await NoteService.editTitle(req.body));
            try {
                res.status(200).json(data)
            }
            catch (e) {
                console.log(e)
            }
        }
        catch(e) {
            res.status(422).json(e);
        }
    }
    async editBody(req, res) {
        try {
            const data = (await NoteService.editBody(req.body));
            try {
                res.status(200).json(data)
            }
            catch (e) {
                console.log(e)
            }
        }
        catch(e) {
            res.status(422).json(e);
        }
    }
    async delete(req, res) {
        try {
            const data = (await NoteService.delete(req.body.id));
            try {
                res.status(200).json(data)
            }
            catch (e) {
                console.log(e)
            }
        }
        catch(e) {
            res.status(422).json(e);
        }
    }
    async getById(req, res) {
        try {
            const data = await NoteService.getById(req.body.id);
            try {
                res.status(200).json(data)
            }
            catch (e) {
                console.log(e)
            }
        }
        catch(e) {
            res.status(422).json(e);
        }
    }
    async getAllById(req, res) {
        try {
            const data = await NoteService.getAllByFolderId(req.body.id);
            try {
                res.status(200).json(data)
            }
            catch (e) {
                console.log(e)
            }
        }
        catch(e) {
            res.status(422).json(e);
        }
    }
    async verifyCreateAccess(req, res, next) {
        try {
            if(await NoteService.verifyCreateAccess(req.body.folderId, req.user.id)) next();
        }
        catch (e) {
            if(e.status){
                res.status(e.status).json(e.message);
            }
            else{
                res.status(500).json(undefined);
            }
        }
    }
    async verifyAccess(req, res, next) {
        try {
            if(await NoteService.verifyCreateAccess(req.body.id, req.user.id)) next();
        }
        catch (e) {
            if(e.status){
                res.status(e.status).json(e.message);
            }
            else{
                res.status(500).json(undefined);
            }
        }
    }
}

module.exports = new NoteController();
