const AuthService = require('../services/auth.service')
const FolderService = require('../services/folder.service')


class AuthController {
    async register(req, res) {
        try {
            const data = (await AuthService.register(req.body));
            try {
                await FolderService.setDefault(data.id)
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

    async login(req, res) {
        try {
            const result = await AuthService.login(req.body);
            res.status(200).json(result);
        }
        catch(e) {
            res.status(422).json(e);
        }
    }

    async me(req, res) {
        try{
            const result = await AuthService.me(req.user.id);
            res.status(200).json(result);
        }
        catch(e) {
            console.log(e);
            res.status(401);
        }
    }
}

module.exports = new AuthController();
