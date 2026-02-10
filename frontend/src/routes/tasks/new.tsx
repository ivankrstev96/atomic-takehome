import {createFileRoute} from '@tanstack/react-router'

export const Route = createFileRoute('/tasks/new')({
  component: RouteComponent,
})

function RouteComponent() {
  return "TASK"
}
