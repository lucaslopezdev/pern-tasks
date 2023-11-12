export const signin = (req, res) => {
  res.send('ingresando')
}

export const signup = (req, res) => {
  res.send('registrando')
}

export const logout = (req, res) => {
  const { id } = req.params
  res.send('cerrando sesion')
}

export const profile = (req, res) => {
  res.send('perfil del usuario')
}
