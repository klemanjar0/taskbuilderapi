const DataTypes = require('sequelize');

module.exports = (sequelize) => {
    const Note = sequelize.define("note", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            unique: true,
            allowNull: false,
            primaryKey: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        body: {
            type: DataTypes.STRING,
            allowNull: true
        },
        isPinned : {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    })

    Note.associate = (models) => {
        Note.belongsTo(models.Folder);
    }

    return Note;
}
