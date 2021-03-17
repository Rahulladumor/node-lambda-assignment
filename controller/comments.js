const db = require('../configs/db.config');
const Comments = require('../model/model.comments');
const Artical = require('../model/model.artical');
const Reply = require('../model/model.reply');


exports.getAll = async (req, res, next) => {
  try {
    await db.authenticate();
    const comment = await Comments.findAll({ include: [Artical] });

    res.status(200).json({
      success: true,
      count: comment.length,
      data: comment,
    });
  } catch (error) {
    console.log('error-> ', error);
    res.send(error)
  }

};

exports.getByArticalId = async (req, res, next) => {
  try {
    await db.authenticate();
    const { articalId } = req.params;
    const comment = await Comments.findAll({ where: { articalId }, include: [Artical] });


    res.status(200).json({
      success: true,
      count: comment.length,
      data: comment,
    });
  } catch (error) {
    res.send(error)
  }
};

exports.getReplyComment = async (req, res, next) => {
  try {
    await db.authenticate();
    const { commentId } = req.params;

    const comment = await Comments.findAll({ where: { id: commentId }, include: [{ model: Reply, as: 'reply' }] });


    res.status(200).json({
      success: true,
      count: comment.length,
      data: comment,
    });

  } catch (error) {
    res.send(error)
  }
};

exports.getOne = async (req, res, next) => {

  try {
    await db.authenticate();
    const { id } = req.params;
    const comment = await Comments.findByPk(id);

    res.status(200).json({
      success: true,
      count: comment.length,
      data: comment,
    });
  } catch (err) {
    res.send(err);
  }
};

exports.createOne = async (req, res, next) => {
  try {
    await db.authenticate();
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
  } catch (error) {
    res.send(error)
  }
};

exports.createReply = async (req, res, next) => {
  try {
    await db.authenticate();
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
  } catch (err) {
    res.send(err);
  }
};

exports.updateOne = async (req, res, next) => {

  try {
    await db.authenticate();
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
  } catch (err) {
    res.send(err)
  }
};

exports.deleteOne = async (req, res, next) => {
  try {
    await db.authenticate();
    const { id } = req.params;
  
    const comment = await Comments.destroy({ where: { id } });
  
    res.status(200).json({
      success: true,
      count: comment.length,
      data: comment,
    });
  } catch (err) {
    res.send(err)
  }
};