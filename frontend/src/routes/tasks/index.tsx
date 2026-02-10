import {createFileRoute} from '@tanstack/react-router'
import {Tasks} from "../../containers/Tasks.tsx";

export const Route = createFileRoute('/tasks/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Tasks/>
}
