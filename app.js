const serverless = require('serverless-http');
const express = require('express');
const Broker = require('rascal').BrokerAsPromised;

const app = express();

const { rabbitConfig } = require('./configs/config');
const db = require('./configs/db.config');
const logger = require('./utils/logger')


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/sync', async (req, res) => {
  try {
    await db.sync({ force: true })
    res.send('DB Synced')
  } catch (err) {
    console.log(err);
  }
})

app.use(async (req, res, next) => {
  const broker = await Broker.create(rabbitConfig);
  req.broker = broker;
  broker.on('error', logger.error);
  next();
});

app.use('/api/v1/articals', require('./routes/artical'));
app.use('/api/v1/comments', require('./routes/comments'));

module.exports.handler = serverless(app);