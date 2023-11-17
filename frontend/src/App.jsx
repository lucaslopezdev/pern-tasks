import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import TaskFormPage from './pages/TaskFormPage'
import TasksPage from './pages/TasksPage'
import ProfilePage from './pages/ProfilePage'
import NotFound from './pages/NotFound'

import Navbar from './components/navbar/Navbar'
import { Container } from './components/ui'

function App() {
  return (
    <>
      <Navbar />

      <Container className='py-5'>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/about' element={<AboutPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />

          <Route path='/tasks' element={<TasksPage />} />
          <Route path='/tasks/new' element={<TaskFormPage />} />
          <Route path='/tasks/:id/edit' element={<TaskFormPage />} />
          <Route path='/profile' element={<ProfilePage />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Container>
    </>
  )
}

export default App
