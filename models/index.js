require("dotenv").config();
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        dialect: "mysql",
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        ssl : true,
        dialectOptions: {
            ssl: {
                rejectUnauthorized: false,
            },
        }
    }
);

try {
    sequelize.authenticate().then(
        () => {
            sequelize.sync({ force: false })
                .then(function(err) {
                    console.log('The database is connected and stable.');
                }, function (err) {
                    console.log('An error occurred while creating the table:', err);
                });
        }
    );
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

const models = {
    sequelize,
    User: require('./user.model')(sequelize),
    Folder: require('./folder.model')(sequelize),
    Note: require('./note.model')(sequelize),
    RefreshToken: require('./refreshtoken.model')(sequelize),
}

Object.keys(models).forEach((modelName) => {
    if("associate" in models[modelName]){
        models[modelName].associate(models);
    }
});

module.exports = models;
