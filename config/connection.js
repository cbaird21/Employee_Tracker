const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
    // Database name
    process.env.DB_NAME,
    // User
    process.env.DB_USER,
    // Password
    process.env.DB_PASSWORD,
    {
        host: 'localhost',
        dialect: 'mysql',
        port: 3306
    }
);

module.exports = sequelize;