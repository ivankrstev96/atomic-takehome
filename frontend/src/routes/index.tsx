import {createFileRoute} from '@tanstack/react-router'
import {Tasks} from "../containers/Tasks.tsx";

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Tasks/>
}
