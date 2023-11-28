import { Route, Routes, Outlet } from 'react-router-dom'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import TaskFormPage from './pages/TaskFormPage'
import TasksPage from './pages/TasksPage'
import ProfilePage from './pages/ProfilePage'
import NotFound from './pages/NotFound'

import { useAuth } from './context/AuthContext'
import Navbar from './components/navbar/Navbar'
import { Container } from './components/ui'
import { ProtectedRoute } from './components/ProtectedRoute'
import { TaskProvider } from './context/TaskContext'

function App() {
  const { isAuth, loading } = useAuth()

  console.log(loading);
  if (loading) {
    return <h1>Cargando...</h1>
  }

  return (
    <>
      <Navbar />

      <Container className='py-5'>
        <Routes>
          <Route
            element={<ProtectedRoute isAllowed={!isAuth} redirectTo='/tasks' />}
          >
            <Route path='/' element={<HomePage />} />
            <Route path='/about' element={<AboutPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />
          </Route>

          <Route
            element={<ProtectedRoute isAllowed={isAuth} redirectTo='/login' />}
          >
            <Route
              element={
                <TaskProvider>
                  <Outlet />
                </TaskProvider>
              }
            >
              <Route path='/tasks' element={<TasksPage />} />
              <Route path='/tasks/new' element={<TaskFormPage />} />
              <Route path='/tasks/:id/edit' element={<TaskFormPage />} />
            </Route>

            <Route path='/profile' element={<ProfilePage />} />
          </Route>

          <Route path='*' element={<NotFound />} />
        </Routes>
      </Container>
    </>
  )
}

export default App
