import { Card, Input, Textarea, Label, Button } from '../components/ui'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useTasks } from '../context/TaskContext'

function TaskFormPage() {
  const [postError, setPostError] = useState(null)

  const { createTask, updateTask, loadTask, errors: taskErrors } = useTasks()
  console.log(taskErrors)
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm()

  const navigate = useNavigate()

  const onSubmit = handleSubmit(async (data) => {
    let task;
    if (!id) {
      task = await createTask(data)
    } else {
      task = await updateTask(id, data)
    }
    console.log(task)
    if (task) {
      navigate('/tasks')
    }
  })

  const { id } = useParams()

  useEffect(() => {
    if (id) {
      loadTask(id).then((task) => {
        setValue('title', task.title)
        setValue('description', task.description)
      })
    }
  }, [])

  return (
    <div className='flex h-[80vh] justify-center items-center'>
      <Card>
        {taskErrors.map((error, i) => (
          <p key={i} className='text-red-500'>
            {error}
          </p>
        ))}
        <h2 className='text-3xl font-bold my-4'>
          {id ? 'Edit Task' : 'Create Task'}
        </h2>

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
          {errors.title && (
            <span className='text-red-500'>El título es requerido</span>
          )}
          <Label htmlFor='description'>Description</Label>
          <Textarea
            id='description'
            placeholder='Description'
            rows={3}
            {...register('description')}
          ></Textarea>

          <Button>{id ? 'Edit' : 'Create'}</Button>
        </form>
      </Card>
    </div>
  )
}

export default TaskFormPage
