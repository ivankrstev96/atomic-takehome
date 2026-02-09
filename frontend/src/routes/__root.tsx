import * as React from 'react'
import {Outlet, createRootRoute} from '@tanstack/react-router'
import {AppShell} from "@mantine/core";

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <React.Fragment>
      <AppShell
        padding="md"
      >
        <AppShell.Main>
          <Outlet/>
        </AppShell.Main>
      </AppShell>
    </React.Fragment>
  )
}
