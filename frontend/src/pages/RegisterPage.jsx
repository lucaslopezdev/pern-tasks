import { Button, Card, Input, Label } from '../components/ui'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Container } from '../components/ui'

function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const navigate = useNavigate()

  const { signup, errors: errorsAuth } = useAuth()

  const onSubmit = handleSubmit(async (data) => {
    const user = await signup(data)
    if (user) {
      navigate('/profile')
    }
  })

  return (
    <Container className='h-[calc(100vh-10rem)] flex items-center justify-center'>
      <Card>

        {errorsAuth && errorsAuth.map((err, index) => <p key={index} className='text-red-500 text-center p-2'>{err}</p>)}
        <h3 className='text-2xl font-bold'>Register</h3>

        <form onSubmit={onSubmit}>
          <Label htmlFor='name'>Name</Label>

          <Input
            id='name'
            placeholder='enter your fullname'
            {...register('name', {
              required: true
            })}
          />

          {errors.name && <p className='text-red-500'>Name is required</p>}

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

          <Button>Register</Button>

          <div>
            <p>Already have an account?</p>
            <Link to='/login' className='font-bold'>
              Log in
            </Link>
          </div>
        </form>
      </Card>
    </Container>
  )
}

export default RegisterPage
