const { Sequelize } = require('sequelize');

const HOST = 'remotemysql.com';
const USER = 'vPgBXqk5jt';
const PASSWORD = 'kiuS2Aehym';
const DATABASE = 'vPgBXqk5jt';

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
