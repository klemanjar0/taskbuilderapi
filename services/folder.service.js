const { Folder, User } = require('../models');

class FolderService {
    async create(data){
        const errors = [];

        if(!data) {
            errors.push({
                field: "data",
                messages: "Empty data."
            })
            throw errors;
        }

        const { title, userId } = data;

        if(title) {
            if(title.length < 3) {
                errors.push({
                    field: 'title',
                    message: 'Title should contain at least 3 characters.'
                });
            }
        }
        else{
            errors.push({
                field: 'title',
                message: 'Title of required.'
            });
        }
        const user = await User.findByPk(userId);

        if(!user){
            errors.push({
                field: 'user',
                message: 'User with defined ID does not exist. ' + userId
            });
        }

        if(errors.length !== 0) throw errors;

        const folder = await Folder.create({
            title,
            userId
        });

        return {
            operation: "create_folder",
            status: "success",
            result: folder
        };
    }
    async getById(id) {
        const errors = [];

        if(!id) {
            errors.push({
                field: "id",
                messages: "Empty ID."
            })
            throw errors;
        }

        if(errors.length !== 0) throw errors;

        const card = await Folder.findByPk(id);

        return {
            id: card.id,
            name: card.name,
            hospital: card.hospital,
            description: card.description,
            date_start: card.date_start,
            date_expire: card.date_expire,
        }
    }
    async delete(id){
        const errors = [];

        if(!id) {
            errors.push({
                field: "id",
                messages: "Empty ID."
            })
            throw errors;
        }

        if(errors.length !== 0) throw errors;

        const folder = await Folder.findByPk(id);

        await folder.destroy({where : {id : folder.id}});

        return {
            operation: "destroy",
            folder: folder
        }
    }
}

module.exports = new FolderService();
