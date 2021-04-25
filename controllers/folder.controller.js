const FolderService = require('../services/folder.service')

class FolderController {
    async create(req, res) {
        try {
            const data = (await FolderService.create(req.body, req.user.id));
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
            const data = (await FolderService.delete(req.body.id));
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
            const data = await FolderService.getAllByUserId(req.body.id);
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
            const data = (await FolderService.getById(req.body.id));
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
            const data = (await FolderService.editTitle(req.body));
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
    async verifyAccess(req, res, next) {
        try {
            if(await FolderService.verifyAccess(req.body.id, req.user.id)) next();
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

module.exports = new FolderController();
