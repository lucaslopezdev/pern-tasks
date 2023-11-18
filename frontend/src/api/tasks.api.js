import axios from "./axios";

export const createTaskRequest = (task) => axios.post('/tasks', task)

export const getTaskList = () => axios.get('/tasks')