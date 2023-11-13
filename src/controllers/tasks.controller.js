import { pool } from '../db.js'

export const getAllTasks = async (req, res, next) => {
  const results = await pool.query('SELECT * FROM task')
  res.json(results.rows)
}

export const getTask = async (req, res) => {
  const { id } = req.params;
  const result = await pool.query('SELECT * FROM task WHERE id = $1', [id])
  if(!result.rowCount) {
    return res.status(404).json({message:'La tarea no existe'})
  }

  return res.json(result.rows[0])
}

export const createTask = async (req, res, next) => {
  const { title, description } = req.body

  try {
    const result = await pool.query(
      'INSERT INTO task (title, description) VALUES ($1, $2) RETURNING *',
      [title, description]
    )
    res.json(result.rows[0])
  } catch (error) {
    if (error.code === '23505') {
      return res.status(409).json({message: 'Ya existe una tarea con ese titulo'})
    }
    next(error)
  }
}

export const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  const result = await pool.query('UPDATE task SET title = $1, description = $2 WHERE id = $3 RETURNING *',
  [title, description, id])
  if(!result.rowCount) {
    return res.status(404).json({message: 'La tarea no existe'})
  }
  console.log(result);
  return res.json(result.rows[0])
}

export const deleteTask = async (req, res) => {
  const { id } = req.params
  const result = await pool.query('DELETE FROM task WHERE id = $1 RETURNING *', [id])
  console.log(result);
  
  if(!result.rowCount) {
    return res.status(404).json({message: 'La tarea no existe'})
  }

  return res.sendStatus(204)
}
