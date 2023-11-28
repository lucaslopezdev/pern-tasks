import { createContext, useContext, useState, useEffect } from 'react'
import axios from '../api/axios'
import Cookies from 'js-cookie'

export const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isAuth, setIsAuth] = useState(false)
  const [errors, setErrors] = useState(null)
  const [loading, setLoading] = useState(true)

  const signup = async (data) => {
    try {
      const res = await axios.post('/signup', data)
      setUser(res.data)
      setIsAuth(true)

      return res.data
    } catch (error) {
      if (Array.isArray(error.response.data)) {
        return setErrors(error.response.data)
      }
      return setErrors([error.response.data.message])
    }
  }

  const signin = async (data) => {
    try {
      const res = await axios.post('/signin', data)
      setIsAuth(true)
      setUser(res.data)

      return res.data
    } catch (error) {
      if (Array.isArray(error.response.data)) {
        return setErrors(error.response.data)
      }

      setErrors([error.response.data.message])
    }
  }

  const logout = async () => {
    await axios.post('/logout')
    setUser(null)
    setIsAuth(false)
  }

  useEffect(() => {
    setLoading(true)
    if (Cookies.get('token')) {
      axios
        .get('/profile')
        .then((res) => {
          setUser(res.data)
          setIsAuth(true)
        })
        .catch((err) => {
          console.log(err)
          setUser(null)
          setIsAuth(false)
        })
      }
      setLoading(false)
  }, [])

  useEffect(() => {
    const clean = setTimeout(() => {
      setErrors(null);      
    }, 5000);

    return () => clearTimeout(clean);
  }, [errors])

  return (
    <AuthContext.Provider
      value={{ user, isAuth, errors, loading, signup, signin, logout }}
    >
      {children}
    </AuthContext.Provider>
  )
}
