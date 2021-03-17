const db = require('./configs/db')

db.sync({ force: true })
