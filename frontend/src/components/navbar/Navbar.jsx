import { Link, useLocation } from 'react-router-dom'
import { navigation } from './navigation'
import { Container } from '../ui'

function Navbar() {
  const location = useLocation()
  const currentlyPath = location.pathname

  return (
    <nav className='bg-zinc-950'>
      <Container className=' flex justify-between px-20 py-4'>
        <Link to='/'>
          <h1 className='font-bold text-2xl'>PERN tasks</h1>
        </Link>

        <ul className='flex gap-x-2'>
          {navigation.map(({ path, name }, index) => (
            <li
              key={index}
              className={`${
                currentlyPath === path ? 'text-red-400' : 'text-white'
              }`}
            >
              <Link to={path}>{name}</Link>
            </li>
          ))}
        </ul>
      </Container>
    </nav>
  )
}

export default Navbar
