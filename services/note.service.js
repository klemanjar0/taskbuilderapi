const { Folder, Note } = require('../models');

class NoteService {
    async create(data){
        const errors = [];

        if(!data) {
            errors.push({
                field: "data",
                messages: "Empty data."
            })
            throw errors;
        }

        const { title, body, isPinned, folderId } = data;

        if(title) {
            if(title.length < 3) {
                errors.push({
                    field: 'title',
                    message: 'Title should contain at least 1 character.'
                });
            }
        }
        else{
            errors.push({
                field: 'title',
                message: 'Title of required.'
            });
        }
        const myfolder = await Folder.findByPk(folderId);

        if(!myfolder){
            errors.push({
                field: 'folder',
                message: 'Folder with defined ID does not exist. ' + folderId
            });
        }

        if(errors.length !== 0) throw errors;

        const note = await Note.create({
            title,
            body,
            isPinned,
            folderId
        });

        return {
            operation: "create_note",
            status: "success",
            result: note
        };
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

        const note = await Note.findByPk(id);

        if (!note){
            errors.push({
                field: 'id',
                message: 'No folder found with ID '+id
            });
        }

        if(errors.length !== 0) throw errors;

        note.title = title;
        await note.save();
        return note.toJSON();
    }

    async editBody(data) {
        const errors = [];

        if(!data) {
            errors.push({
                field: "data",
                messages: "Empty data."
            })
            throw errors;
        }

        const { id, body, isPinned } = data;

        const note = await Note.findByPk(id);

        if (!note){
            errors.push({
                field: 'id',
                message: 'No folder found with ID '+id
            });
        }

        if(errors.length !== 0) throw errors;

        note.body = body;
        note.isPinned = isPinned;

        await note.save();
        return note.toJSON();
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

        const note = await Note.findByPk(id);

        await note.destroy({where : {id : note.id}});

        return {
            operation: "destroy",
            result: note,
            status: "success"
        }
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

        const note = await Note.findByPk(id);

        return note;
    }

    async getAllByFolderId(id) {
        const errors = [];

        if(!id) {
            errors.push({
                field: "id",
                messages: "Empty ID."
            })
            throw errors;
        }
        const notes = await Note.findAll({where: {
                folderId: id
            }});

        if(notes.length === 0) errors.push({
            field: "id",
            messages: 'No folder found with ID '+id
        })
        if(errors.length !== 0) throw errors;

        return notes;
    }

    async verifyCreateAccess(folderId, idUser) {
        const folder = await Folder.findByPk(folderId);

        if(!folder) {
            throw {
                status: 404,
                message: "Folder not found"
            };
        }

        if(folder.userId !== idUser) {
            throw {
                status: 403,
                message: "Unauthorized for this data"
            };
        }

        return true;
    }

    async verifyAccess(noteId, idUser) {
        const note = await Note.findByPk(noteId);
        const folderId = note.folderId;
        const folder = await Folder.findByPk(folderId);

        if(!folder) {
            throw {
                status: 404,
                message: "Folder not found"
            };
        }

        if(folder.userId !== idUser) {
            throw {
                status: 403,
                message: "Unauthorized for this data"
            };
        }

        return true;
    }
}

module.exports = new NoteService();
