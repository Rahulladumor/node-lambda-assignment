const Sequelize = require('sequelize');
const db = require('../configs/db.config');

const Articals = require('./model.artical')

const Comments = db.define('comments', {
  nickname: {
    type: Sequelize.STRING,
    allowNull: false
  },
  content: {
    type: Sequelize.STRING,
    allowNull: false
  },
  creation_date: {
    type: Sequelize.STRING,
    defaultValue:  Date.now
  },
  articalId: {
    type: Sequelize.INTEGER,
    references: {
      model: Articals,
      key: 'id',
    }
  }
})

module.exports = Comments;

Comments.belongsTo(Articals, {
  foreignKey: 'articalId',
  targetKey: 'id',
})

Articals.hasMany(Comments, {
  as: 'comments'
})