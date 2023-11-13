import { pool } from '../db.js'
import bcrypt from 'bcrypt'

export const signin = (req, res) => {
  res.send('ingresando')
}

export const signup = async (req, res) => {
  const { name, email, password } = req.body
  try {

    const hashedPassword = await bcrypt.hash(password, 10)

    console.log(hashedPassword);
    const results = await pool.query(
      'INSERT INTO users(name, email, password) VALUES($1, $2, $3) RETURNING *',
      [name, email, hashedPassword]
    )
    console.log(results)
    return res.status(201).json(results.rows[0])
  } catch (error) {
    if(error.code === '23505') {
      return res.status(400).json({message: 'El correo ya esta registrado'})
    }
  }
}

export const logout = (req, res) => {
  const { id } = req.params
  res.send('cerrando sesion')
}

export const profile = (req, res) => {
  res.send('perfil del usuario')
}
