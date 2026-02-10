import {createFileRoute} from '@tanstack/react-router'
import {Task} from "../../containers/Task.tsx";

export const Route = createFileRoute('/tasks/new')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Task/>
}
