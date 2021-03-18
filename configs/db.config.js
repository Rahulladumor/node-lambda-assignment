const { Sequelize } = require('sequelize');

const HOST = '';
const USER = '';
const PASSWORD = '';
const DATABASE = '';

module.exports = new Sequelize(DATABASE, USER, PASSWORD, {
  host: HOST,
  dialect: 'mysql',
  operatorsAliases: false,

  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});
