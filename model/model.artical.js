const Sequelize = require('sequelize');
const db = require('../configs/db.config');

const Artical = db.define('articals', {
  nickname: {
    type: Sequelize.STRING,
    allowNull: false
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  content: {
    type: Sequelize.STRING,
    allowNull: false
  },
  creation_date: {
    type: Sequelize.DATE,
    defaultValue: Date.now,
    allowNull: false
  }
})

module.exports = Artical;
