import { Link, useLocation } from 'react-router-dom'
import { publicRoutes, privateRoutes } from './navigation'
import { Container } from '../ui'
import { useAuth } from '../../context/AuthContext'

function Navbar() {
  const location = useLocation()
  const currentlyPath = location.pathname

  const { isAuth, logout } = useAuth()

  return (
    <nav className='bg-zinc-950'>
      <Container className=' flex justify-between px-20 py-4'>
        <Link to='/'>
          <h1 className='font-bold text-2xl'>PERN tasks</h1>
        </Link>

        <ul className='flex gap-x-2'>
          {isAuth ? (
            <>
              {privateRoutes.map(({ path, name }) => (
                <li
                  key={name}
                  className={`${
                    currentlyPath === path ? 'text-red-400' : 'text-white'
                  }`}
                >
                  <Link to={path}>{name}</Link>
                </li>
              ))}
              <li onClick={logout} className='cursor-pointer'>
                Logout
              </li>
            </>
          ) : (
            publicRoutes.map(({ path, name }) => (
              <li
                key={name}
                className={`${
                  currentlyPath === path ? 'text-red-400' : 'text-white'
                }`}
              >
                <Link to={path}>{name}</Link>
              </li>
            ))
          )}
        </ul>
      </Container>
    </nav>
  )
}

export default Navbar
