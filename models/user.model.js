const DataTypes = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize) => {
    const User = sequelize.define("user", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            unique: true,
            allowNull: false,
            primaryKey: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        hooks: {
            beforeCreate: async (user) => {
                user.password = await bcrypt.hash(user.password, await bcrypt.genSalt(10));
            }
        }
    });

    User.associate = (models) => {
        User.hasMany(models.Folder, {
            onUpdate: "cascade",
            onDelete: "cascade"
        });
        User.hasOne(models.RefreshToken, {
            onUpdate: "cascade",
            onDelete: "cascade"
        });
    };

    return User
}
