'use client'

import React from 'react'

export type CommonProps = {
  open: boolean
  onOpenChange: (v: boolean) => void
}

type AnyProps = Record<string, unknown>

type WithCommonProps<P extends AnyProps = AnyProps> = React.ComponentType<
  P & CommonProps
>

type AnyComp = WithCommonProps<AnyProps>

type State = {
  component: AnyComp | null
  props: AnyProps | undefined
  open: boolean
}

type Ctx = {
  open: <P extends AnyProps>(component: WithCommonProps<P>, props?: P) => void
  close: () => void
  isOpen: (component?: AnyComp) => boolean
  _get: () => State
}

const DrawerContext = React.createContext<Ctx>({} as Ctx)

export function DrawerProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = React.useState<State>({
    component: null,
    props: undefined,
    open: false,
  })

  const open = React.useCallback(
    <P extends AnyProps>(component: WithCommonProps<P>, props?: P) => {
      setState({ component: component as AnyComp, props, open: true })
    },
    []
  )

  const close = React.useCallback(() => {
    setState({ component: null, props: undefined, open: false })
  }, [])

  const isOpen = React.useCallback(
    (component?: AnyComp) =>
      state.open ? (component ? state.component === component : true) : false,
    [state.open, state.component]
  )

  const value: Ctx = React.useMemo(
    () => ({
      open,
      close,
      isOpen,
      _get: () => state,
    }),
    [open, close, isOpen, state]
  )

  const Comp = state.component

  return (
    <DrawerContext.Provider value={value}>
      {children}
      {state.open && Comp && (
        <Comp
          {...(state.props ?? {})}
          open={true}
          onOpenChange={(v: boolean) => !v && close()}
        />
      )}
    </DrawerContext.Provider>
  )
}

export function useDrawer() {
  return React.useContext(DrawerContext)
}
