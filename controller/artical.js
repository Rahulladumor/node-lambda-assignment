const Artical = require('../model/model.artical');

exports.getAll = async (req, res, next) => {
  const artical = await Artical.findAll();
  res.status(200).json({
    success: true,
    count: artical.length,
    data: artical,
  });
};

exports.getOne = async (req, res, next) => {

  const { id } = req.params;
  const artical = await Artical.findByPk(id);

  res.status(200).json({
    success: true,
    count: artical.length,
    data: artical,
  });
};

exports.createOne = async (req, res, next) => {

  const { nickname, content, title, commentId, creation_date } = req.body;
  const artical = await Artical.create({
    nickname,
    content,
    title,
    commentId,
    creation_date
  });

  res.status(200).json({
    success: true,
    count: artical.length,
    data: artical,
  });
};

exports.updateOne = async (req, res, next) => {

  const { id } = req.params;
  const { nickname, content, title, commentId, creation_date } = req.body;

  const artical = await Artical.update({
    nickname,
    content,
    title,
    commentId,
    creation_date
  }, { where: { id }, returning: true });

  res.status(200).json({
    success: true,
    count: artical.length,
    data: artical,
  });
};

exports.deleteOne = async (req, res, next) => {

  const { id } = req.params;

  const artical = await Artical.destroy({ where: { id } });

  res.status(200).json({
    success: true,
    count: artical.length,
    data: artical,
  });
};