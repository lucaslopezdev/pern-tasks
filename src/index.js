import app from './app.js'
import { pool } from './db.js'

pool.query('SELECT NOW()', (err, res) => {
  console.log(err, res.rows[0])
})

app.listen(3000)
console.log('Server on port', 3000)