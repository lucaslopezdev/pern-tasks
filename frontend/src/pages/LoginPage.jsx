import { useForm } from 'react-hook-form'
import { Card, Input, Button, Label } from '../components/ui'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const navigate = useNavigate()

  const { signin, errors: errorsAuth } = useAuth()

  const onSubmit = handleSubmit(async (data) => {
    const user = await signin(data)
    if (user) {
      navigate('/profile')
    }
  })

  return (
    <div className='h-[calc(100vh-64px)] flex items-center justify-center'>
      <Card>
        {errorsAuth &&
          errorsAuth.map((err, index) => (
            <p key={index} className='text-red-500 text-center'>
              {err}
            </p>
          ))}
        <h3 className='text-2xl font-bold'>Login</h3>

        <form onSubmit={onSubmit}>
          <Label htmlFor='email'>Email</Label>
          <Input
            id='email'
            type='email'
            placeholder='enter your email'
            {...register('email', {
              required: true
            })}
          />

          {errors.email && <p className='text-red-500'>Email is required</p>}

          <Label htmlFor='password'>Password</Label>
          <Input
            id='password'
            type='password'
            placeholder='enter your password'
            {...register('password', {
              required: true
            })}
          />

          {errors.password && (
            <p className='text-red-500'>Password is required</p>
          )}

          <Button>Login</Button>

          <div className='flex justify-between my-4'>
            <p>Don't have an account?</p>
            <Link to='/register' className='font-bold'>
              Register
            </Link>
          </div>
        </form>
      </Card>
    </div>
  )
}

export default LoginPage
