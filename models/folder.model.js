const DataTypes = require('sequelize');

module.exports = (sequelize) => {
    const Folder = sequelize.define("folder", {
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
        isDefault: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    })

    Folder.associate = (models) => {
        Folder.belongsTo(models.User);
        Folder.hasMany(models.Note, {
            onUpdate: "cascade",
            onDelete: "cascade"
        });
    }
    return Folder;
}
