const winston = require('winston');
const WinstonCloudWatch = require('winston-cloudwatch');
const crypto = require('crypto');

const {
  logGroupName,
  serverRegion,
  awsAccessKeyId,
  awsSecretKey,
} = require('../configs/config');

const startTime = new Date().toISOString();

winston.loggers.add('app-logs', {
  transports: [
    new winston.transports.Console({
      level: 'info',
      format: winston.format.simple(),
      handleExceptions: true,
      humanReadableUnhandledException: true,
    }),
    new WinstonCloudWatch({
      logGroupName: `/docker/nexus-${logGroupName}`,
      logStreamName() {
        const date = new Date().toISOString().split('T')[0];
        return `nexus-backend-service-${date}-${
          crypto.createHash('md5')
            .update(startTime)
            .digest('hex')}`;
      },
      awsRegion: serverRegion,
      awsAccessKeyId,
      awsSecretKey,
      retentionInDays: 30,
    }),
  ],
});

const logger = winston.loggers.get('app-logs');

module.exports = logger;