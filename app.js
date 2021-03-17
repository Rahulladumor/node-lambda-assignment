const serverless = require('serverless-http');
const express = require('express');
const app = express();

const db = require('./configs/db.config');

// app.post('/dbsync', async (req, res) => {
//   const { body } = req;
//   if( body.data === 'Sync' ){
//     await db.sync({ force: true })
//     res.json({ success: true, data: 'Database Synced' })
//   } 
//   if ( body.data === 'Close') {
//     await db.sync({ force: true })
//     res.json({ success: true, data: 'Close All Connection' })
//   }
// })

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use('/api/v1/articals', require('./routes/artical'));
app.use('/api/v1/comments', require('./routes/comments'));

module.exports.handler = serverless(app);