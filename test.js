const db = require('./configs/db')

db.authenticate().then(() => console.log('Database Connected Successfully...!')).catch((err) => console.log('Error:', err));
