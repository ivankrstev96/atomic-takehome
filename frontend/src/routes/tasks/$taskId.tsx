import {createFileRoute} from '@tanstack/react-router'

export const Route = createFileRoute('/tasks/$taskId')({
  component: RouteComponent,
})

function RouteComponent() {
  return "TASK"
}
