const DataTypes = require('sequelize');

module.exports = (sequelize) => {
    const RefreshToken = sequelize.define("refreshtoken", {
        token: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        }
    });
    RefreshToken.associate = (models) => {
        RefreshToken.belongsTo(models.User);
    };
    return RefreshToken;
}
