import React, { createContext, FC, ReactElement, useState } from 'react'

type Props = {
  children: ReactElement
}

type ContextType = {
  // TODO: should be string
  theme: boolean
  changeTheme: () => void
}

const defaultContextValues = {
  theme: false,
}

export const GlobalContext = createContext<ContextType>({
  theme: defaultContextValues.theme,
  changeTheme: () => undefined,
})

const { Provider } = GlobalContext

export const GlobalProvider: FC<Props> = ({ children }) => {
  const [theme, setTheme] = useState(defaultContextValues.theme)

  const changeTheme = () => {
    setTheme((prev) => !prev)
  }

  const providerValue = {
    theme,
    changeTheme,
  }

  return <Provider value={providerValue}>{children}</Provider>
}
