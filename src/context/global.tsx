import React, { createContext, FC, ReactElement, useState } from 'react'

type Props = {
  children: ReactElement
}

type ContextType = {
  // TODO: should be string
  theme: boolean
  setTheme: (value: boolean) => void
}

const defaultContextValues = {
  theme: false,
}

export const GlobalContext = createContext<ContextType>({
  theme: defaultContextValues.theme,
  setTheme: () => undefined,
})

const { Provider } = GlobalContext

export const GlobalProvider: FC<Props> = ({ children }) => {
  const [theme, setTheme] = useState(defaultContextValues.theme)

  const providerValue = {
    theme,
    setTheme,
  }

  return <Provider value={providerValue}>{children}</Provider>
}
