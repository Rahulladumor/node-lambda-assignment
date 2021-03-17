const serverless = require('serverless-http');
const express = require('express');
const Broker = require('rascal').BrokerAsPromised;

const app = express();

const { rabbitConfig } = require('./configs/config');
const db = require('./configs/db.config');
const logger = require('./utils/logger')

db.sync().then(() => {
  console.log('DB Synced..!');
}).catch((e) => {
  console.log('error', e);
})

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(async (req, res, next) => {
  const broker = await Broker.create(rabbitConfig);
  req.broker = broker;
  broker.on('error', logger.error);
  next();
});

app.use('/api/v1/articals', require('./routes/artical'));
app.use('/api/v1/comments', require('./routes/comments'));

module.exports.handler = serverless(app);
// app.listen(5000, () => console.log('Running Server..!'))
