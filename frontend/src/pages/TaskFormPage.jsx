import { Card, Input, Textarea, Label, Button } from '../components/ui'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import {createTaskRequest} from '../api/tasks.api'
import { useState } from 'react'

function TaskFormPage() {
  const [postError, setPostError] = useState(null)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const navigate = useNavigate()

  const onSubmit = handleSubmit(async (data) => {
    try {
    await createTaskRequest(data)
    navigate('/tasks')
    } catch (error) {
      if(error.response){
        setPostError(error.response.data.message)
      }
    }
  })

  return (
    <div className='flex h-[80vh] justify-center items-center'>
      <Card>
        <h2 className='text-3xl font-bold my-4'>Create Task</h2>

        <form onSubmit={onSubmit}>
          {postError && <span className='text-red-500'>{postError}</span>}
          <Label htmlFor='title'>Title</Label>
          <Input
            id='title'
            type='text'
            placeholder='Title'
            {...register('title', {
              required: true
            })}
          />
          {errors.title && <span className='text-red-500'>El título es requerido</span>}
          <Label htmlFor='description'>Description</Label>
          <Textarea
            id='description'
            placeholder='Description'
            rows={3}
            {...register('description')}
          ></Textarea>

          <Button>Create</Button>
        </form>
      </Card>
    </div>
  )
}

export default TaskFormPage
