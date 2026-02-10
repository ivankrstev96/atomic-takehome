import {createFileRoute, useParams} from '@tanstack/react-router'
import {Task} from "../../containers/Task.tsx";

export const Route = createFileRoute('/tasks/$taskId')({
  component: RouteComponent,
})

function RouteComponent() {
  const {taskId} = useParams({strict: false}) as { taskId?: number };
  return <Task taskId={taskId}/>
}
