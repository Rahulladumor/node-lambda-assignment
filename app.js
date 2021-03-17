const serverless = require('serverless-http');
const express = require('express');
const app = express();

const db = require('./configs/db.config');

db.sync().then(() => {
  console.log('DB Synced..!');
}).catch((e) => {
  console.log('error', e);
})

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use('/api/v1/articals', require('./routes/artical'));
app.use('/api/v1/comments', require('./routes/comments'));

module.exports.handler = serverless(app);
