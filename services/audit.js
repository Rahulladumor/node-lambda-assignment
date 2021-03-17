const logger = require('../utils/logger');

const enums = {
  LOG_TYPE: {
    LOG_TYPE_INFO: 'LOG_TYPE_INFO',
    LOG_TYPE_ERROR: 'LOG_TYPE_ERROR',
  },
  API: {
    ARTICAL: {
      GET_ALL: 'GET_ALL_ARTICAL_DATA',
      GET_ONE: 'GET_ARTICAL_DATA',
      ADD_ONE: 'ADD_NEW_ARTICAL_DATA',
      UPDATE_ONE: 'UPDATE_ARTICAL_DATA',
      DELETE_ONE: 'DELETE_ARTICAL_DATA',
    },
  },
};

function getSafe(fn, defVal = undefined) {
  try {
    // To handle empty express body or params
    if (!Object.keys(fn()).length) throw new Error('No Keys');

    return fn();
  } catch (e) {
    return defVal;
  }
}

async function createLog(data, broker) {
  try {
    const body = {
      // eslint-disable-next-line no-nested-ternary
      request: getSafe(() => data.request.body)
        ? data.request.body
        : getSafe(() => data.request.params)
          ? data.request.params
          : getSafe(() => data.request.result._source.message),
      response: data.logLevel === enums.LOG_TYPE.LOG_TYPE_ERROR
        ? { error: data.response }
        : data.response,
      logLevel: data.logLevel,
      source: {
        ip: getSafe(() => data.request.ip, 'NA'),
      },
      apiAction: data.apiAction,
      date: Math.floor(new Date().getTime() / 1000),
    };

    const publication = await broker.publish('auditlog_pub', JSON.stringify(body));
    publication.on('error', logger.error);
  } catch (err) {
    logger.error(err);
  }
}

module.exports = {
  createLog,
  enums,
};

