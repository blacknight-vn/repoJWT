const sequelize = require("sequelize");

const sequelize_database = new sequelize.Sequelize('node_2.3Pro', 'root', null, {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
});

let connectDB = async () => {
    try {
        await sequelize_database.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect the database', error);
    }
}

module.exports = connectDB;
