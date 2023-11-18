import { Card } from '../ui'

function TaskCard({ title, description }) {
  return (
    <Card>
      <h1>{title}</h1>
      <p>{description}</p>
    </Card>
  )
}

export default TaskCard
