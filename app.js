const serverless = require('serverless-http');
const express = require('express');
const app = express();

const db = require('./configs/db.config');

db.authenticate().then(() => console.log('Database Connected Successfully...!')).catch((err) => console.log('Error:', err))

db.sync({ force: true })

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use('/api/v1/articals',require('./routes/artical'));
app.use('/api/v1/comments',require('./routes/comments'));

// app.get('/api/info', (req, res) => {
//   res.send({ application: 'sample-app', version: '1' });
// });

// app.post('/api/v1/getback', (req, res) => {
//   res.send({ ...req.body });
// });
const server = app.listen(5000, () => console.log('Server Running On Port 5000'))

// Handle unHandle rejection
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close server & exit process
  server.close(() => process.exit(1));
});

// module.exports.handler = serverless(app);