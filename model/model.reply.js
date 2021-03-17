const Sequelize = require('sequelize');
const db = require('../configs/db.config');
const Comments = require('./model.comments');

const Reply = db.define('reply', {
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
  commentId: {
    type: Sequelize.INTEGER,
    references: {
      model: Comments,
      key: 'id',
    }
  }
})

module.exports = Reply;

Reply.belongsTo(Comments, {
  foreignKey: 'commentId',
  targetKey: 'id'
})

Comments.hasMany(Reply, {
  as: 'reply'
})