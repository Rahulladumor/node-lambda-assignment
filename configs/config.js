const rabbitConfig = {
  vhosts: {
    '/': {
      connection: {
        url: ``,
      },
      exchanges: [
        'auditlog_ex',
      ],
      queues: [
        'auditlog_q',
      ],
      bindings: [
        'auditlog_ex[a.b.c] -> auditlog_q',
      ],
      publications: {
        auditlog_pub: {
          exchange: 'auditlog_ex',
          routingKey: 'a.b.c',
        },
      },
      subscriptions: {
        auditlog_sub: {
          queue: 'auditlog_q',
          prefetch: 3,
        },
      },
    },
  },
};

const logGroupName = '';

const serverRegion = '';

const awsAccessKeyId = ''
const awsSecretKey = '';

module.exports = {rabbitConfig, logGroupName, serverRegion, awsAccessKeyId, awsSecretKey};