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
    async setDefault(userId){
        const errors = [];

        if(!userId) {
            errors.push({
                field: "userId",
                messages: "Empty userId."
            })
            throw errors;
        }

        const user = await User.findByPk(userId);

        if(!user){
            errors.push({
                field: 'user',
                message: 'User with defined ID does not exist. ' + userId
            });
        }

        if(errors.length !== 0) throw errors;

        const title = "Main";
        const isDefault = true;
        const folder = await Folder.create({
            title,
            userId,
            isDefault
        });

        return {
            operation: "create_default_folder",
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

        const folder = await Folder.findByPk(id);

        return {
            id: folder.id,
            title: folder.title,
            isDefault: folder.isDefault
        }
    }

    async editTitle(data) {
        const errors = [];

        if(!data) {
            errors.push({
                field: "data",
                messages: "Empty data."
            })
            throw errors;
        }

        const { id, title } = data;

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

        const folder = await Folder.findByPk(id);

        if (!folder){
            errors.push({
                field: 'id',
                message: 'No folder found with ID '+id
            });
        }

        if(errors.length !== 0) throw errors;

        folder.title = title;
        await folder.save();
        return folder.toJSON();
    }

    async getAllByUserId(id) {
        const errors = [];

        if(!id) {
            errors.push({
                field: "id",
                messages: "Empty ID."
            })
            throw errors;
        }

        if(errors.length !== 0) throw errors;

        const folders = await Folder.findAll({where: {
                userId: id
            }});
        const m = folders.map((folder) => {
            return {
                id: folder.id,
                title: folder.title,
                isDefault: folder.isDefault
            }
        })
        const parsed = await JSON.stringify(m)
        return parsed;
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
            folder: folder,
            status: "success"
        }
    }
}

module.exports = new FolderService();
