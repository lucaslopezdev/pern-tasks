import app from './app.js'
import { PORT } from './config.js'

/* import { pool } from './db.js'
pool.query('SELECT NOW()', (err, res) => {
  console.log(err, res.rows[0])
}) */

app.listen(PORT)
console.log('Server on port', PORT)