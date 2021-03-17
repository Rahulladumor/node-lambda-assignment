const Comments = require('../model/model.comments');
const Artical = require('../model/model.artical');
const Reply = require('../model/model.reply');


exports.getAll = async (req, res, next) => {
  const comment = await Comments.findAll({ include: [ Artical ] });


  res.status(200).json({
    success: true,
    count: comment.length,
    data: comment,
  });
};

exports.getByArticalId = async (req, res, next) => {
  const { articalId } = req.params;
  const comment = await Comments.findAll({ where: { articalId }, include: [ Artical ] });


  res.status(200).json({
    success: true,
    count: comment.length,
    data: comment,
  });
};

exports.getReplyComment = async (req, res, next) => {

  const { commentId } = req.params;

  const comment = await Comments.findAll({ where: { id: commentId }, include: [ { model: Reply, as: 'reply' }] });


  res.status(200).json({
    success: true,
    count: comment.length,
    data: comment,
  });
};

exports.getOne = async (req, res, next) => {

  const { id } = req.params;
  const comment = await Comments.findByPk(id);

  res.status(200).json({
    success: true,
    count: comment.length,
    data: comment,
  });
};

exports.createOne = async (req, res, next) => {

  const { nickname, content, articalId, creation_date } = req.body;
  const comment = await Comments.create({
    nickname,
    content,
    articalId,
    creation_date
  });

 
  res.status(200).json({
    success: true,
    count: comment.length,
    data: comment,
  });
};

exports.createReply = async (req, res, next) => {

  const { nickname, content, commentId, creation_date } = req.body;
  const reply = await Reply.create({
    nickname,
    content,
    commentId,
    creation_date
  });

 
  res.status(200).json({
    success: true,
    count: reply.length,
    data: reply,
  });
};

exports.updateOne = async (req, res, next) => {

  const { id } = req.params;
  const { nickname, content, articalId, creation_date } = req.body;

  const comment = await Comments.update({
    nickname,
    content,
    articalId,
    creation_date
  }, { where: { id }, returning: true });

  res.status(200).json({
    success: true,
    count: comment.length,
    data: comment,
  });
};

exports.deleteOne = async (req, res, next) => {

  const { id } = req.params;

  const comment = await Comments.destroy({ where: { id } });

  res.status(200).json({
    success: true,
    count: comment.length,
    data: comment,
  });
};