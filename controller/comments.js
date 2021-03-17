const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Comments = require('../model/model.comments');
const Artical = require('../model/model.artical');
const Reply = require('../model/model.reply');


exports.getAll = asyncHandler(async (req, res, next) => {
  const comment = await Comments.findAll({ include: [ Artical ] });

  if (!comment) {
    return new ErrorResponse('No Data Found', 404)
  }

  res.status(200).json({
    success: true,
    count: comment.length,
    data: comment,
  });
});

exports.getByArticalId = asyncHandler(async (req, res, next) => {
  const { articalId } = req.params;
  const comment = await Comments.findAll({ where: { articalId }, include: [ Artical ] });

  if (!comment) {
    return new ErrorResponse('No Data Found', 404)
  }

  res.status(200).json({
    success: true,
    count: comment.length,
    data: comment,
  });
});

exports.getReplyComment = asyncHandler(async (req, res, next) => {

  const { commentId } = req.params;

  const comment = await Comments.findAll({ where: { id: commentId }, include: [ { model: Reply, as: 'reply' }] });

  if (!comment) {
    return new ErrorResponse('No Data Found', 404)
  }

  res.status(200).json({
    success: true,
    count: comment.length,
    data: comment,
  });
});

exports.getOne = asyncHandler(async (req, res, next) => {

  const { id } = req.params;
  const comment = await Comments.findByPk(id);

  if (!comment) {
    return new ErrorResponse('Id Not Valid', 404)
  }

  res.status(200).json({
    success: true,
    count: comment.length,
    data: comment,
  });
});

exports.createOne = asyncHandler(async (req, res, next) => {

  const { nickname, content, articalId, creation_date } = req.body;
  const comment = await Comments.create({
    nickname,
    content,
    articalId,
    creation_date
  });

  if (!nickname) {
    return new ErrorResponse('nickname is required', 404)
  }

  res.status(200).json({
    success: true,
    count: comment.length,
    data: comment,
  });
});

exports.createReply = asyncHandler(async (req, res, next) => {

  const { nickname, content, commentId, creation_date } = req.body;
  const reply = await Reply.create({
    nickname,
    content,
    commentId,
    creation_date
  });

  if (!nickname) {
    return new ErrorResponse('nickname is required', 404)
  }

  res.status(200).json({
    success: true,
    count: reply.length,
    data: reply,
  });
});

exports.updateOne = asyncHandler(async (req, res, next) => {

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
});

exports.deleteOne = asyncHandler(async (req, res, next) => {

  const { id } = req.params;

  const comment = await Comments.destroy({ where: { id } });

  res.status(200).json({
    success: true,
    count: comment.length,
    data: comment,
  });
});