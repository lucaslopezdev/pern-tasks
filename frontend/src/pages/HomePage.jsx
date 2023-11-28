import { Card } from "../components/ui";
import { useAuth } from "../context/AuthContext"

function HomePage () {
  const data = useAuth()
  console.log(data);
  
  return(
    <div>
      <Card>
        <h1 className="text-3xl font-bold my-4">Home Page</h1>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veniam iusto quia necessitatibus magni similique sed nostrum dicta voluptatibus iure est qui, recusandae a repellat! Tenetur numquam consequatur corrupti officia praesentium!</p>
      </Card>
    </div>
  )
}

export default HomePage