import { createContext, useContext, useState } from 'react'
import {
  createTaskRequest,
  updateTaskRequest,
  getTaskList,
  getTaskRequest
} from '../api/tasks.api'
import { deleteTaskRequest } from '../api/tasks.api'

const TaskContext = createContext()

export const useTasks = () => {
  const context = useContext(TaskContext)
  if (!context) {
    throw new Error('useTasks debe estar dentro del proveedor TaskProvider')
  }
  return context
}

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([])
  const [errors, setErrors] = useState([])

  const loadTasks = async () => {
    const res = await getTaskList()
    setTasks(res.data)
  }

  const loadTask = async (id) => {
    const res = await getTaskRequest(id)
    return res.data
  }

  const createTask = async (data) => {
    try {
      const res = await createTaskRequest(data)
      setTasks([...tasks, res.data])
      return res.data
    } catch (error) {
      if (error.response) {
        setErrors([error.response.data.message])
      }
    }
  }

  const updateTask = async (id, data) => {
    try {
      const res = await updateTaskRequest(id, data)
      return res.data
    } catch (error) {
      if(error.response) {
        setErrors([error.response.data.message])
      }
    }
  }

  const deleteTask = async (id) => {
    const res = await deleteTaskRequest(id)
    if (res.status === 204) {
      const newTasks = tasks.filter((task) => task.id !== id)
      setTasks(newTasks)
    }
  }

  return (
    <TaskContext.Provider
      value={{ tasks, loadTasks, deleteTask, createTask, updateTask, loadTask, errors }}
    >
      {children}
    </TaskContext.Provider>
  )
}
