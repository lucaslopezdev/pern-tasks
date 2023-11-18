import { useEffect, useState } from "react"
import { getTaskList } from "../api/tasks.api"
import TaskCard from "../components/tasks/TaskCard"

function TasksPage () {
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    getTaskList()
    .then(res => setTasks(res.data))
  }, [])
  
  return(<div className="grid grid-cols-3 gap-2">
    {
      tasks.map(({id, title, description}) => (
        <TaskCard key={id} title={title} description={description} />
      ))
    }
  </div>)
}

export default TasksPage