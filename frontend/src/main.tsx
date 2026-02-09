import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

// core styles are required for all packages
import '@mantine/core/styles.css';
import {MantineProvider} from "@mantine/core";
import {createRouter, RouterProvider} from "@tanstack/react-router";
import {routeTree} from "./routeTree.gen.ts";

// Create a new router instance
const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  context: {
    auth: undefined!
  }
})

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

// eslint-disable-next-line react-refresh/only-export-components
function App() {
  return <RouterProvider router={router} context={{}} />
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider>
      <App />
    </MantineProvider>
  </StrictMode>,
)
