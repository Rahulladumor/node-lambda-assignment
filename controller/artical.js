const Artical = require('../model/model.artical');
const db = require('../configs/db.config');

const {
  enums: {
    LOG_TYPE: { LOG_TYPE_INFO },
    API: { ARTICAL },
  },
  createLog,
} = require('../services/audit');

exports.getAll = async (req, res, next) => {
  try {
    await db.authenticate();
    const artical = await Artical.findAll();
    
    createLog({
      request: req,
      response: artical,
      logLevel: LOG_TYPE_INFO,
      apiAction: ARTICAL.GET_ALL,
    }, req.broker);
    
    return res.status(200).json({
      success: true,
      count: artical.length,
      data: artical,
    });

  } catch (error) {
    console.log('error-> ', error);
    res.send(error)
  }
};

exports.getOne = async (req, res, next) => {
  try {
    await db.authenticate();

    const { id } = req.params;
    const artical = await Artical.findByPk(id);

    createLog({
      request: req,
      response: artical,
      logLevel: LOG_TYPE_INFO,
      apiAction: ARTICAL.GET_ONE,
    }, req.broker);

    return res.status(200).json({
      success: true,
      count: artical.length,
      data: artical,
    });
  } catch (error) {
    console.log('error-> ', error);
    res.send(error)
  }
};

exports.createOne = async (req, res, next) => {
  try {
    await db.authenticate();
    const { nickname, content, title, commentId, creation_date } = req.body;
    const artical = await Artical.create({
      nickname,
      content,
      title,
      commentId,
      creation_date
    });

    createLog({
      request: req,
      response: artical,
      logLevel: LOG_TYPE_INFO,
      apiAction: ARTICAL.ADD_ONE,
    }, req.broker);

    return res.status(200).json({
      success: true,
      count: artical.length,
      data: artical,
    });
  } catch (error) {
    console.log('error-> ', error);
    res.send(error)
  }
};

exports.updateOne = async (req, res, next) => {
  try {
    await db.authenticate();
    const { id } = req.params;
    const { nickname, content, title, commentId, creation_date } = req.body;

    const artical = await Artical.update({
      nickname,
      content,
      title,
      commentId,
      creation_date
    }, { where: { id }, returning: true });

    createLog({
      request: req,
      response: artical,
      logLevel: LOG_TYPE_INFO,
      apiAction: ARTICAL.UPDATE_ONE,
    }, req.broker);

    return res.status(200).json({
      success: true,
      count: artical.length,
      data: artical,
    });
  } catch (error) {
    console.log('error-> ', error);
    res.send(error)
  }

};

exports.deleteOne = async (req, res, next) => {
  try {
    await db.authenticate();

    const { id } = req.params;

    const artical = await Artical.destroy({ where: { id } });

    createLog({
      request: req,
      response: artical,
      logLevel: LOG_TYPE_INFO,
      apiAction: ARTICAL.DELETE_ONE,
    }, req.broker);


    return res.status(200).json({
      success: true,
      count: artical.length,
      data: artical,
    });
  } catch (error) {
    console.log('error-> ', error);
    res.send(error)
  }

};