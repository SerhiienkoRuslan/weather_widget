import React, { FC, useContext } from 'react'

import { GlobalContext, GlobalProvider } from './context/global'

import AppRoutes from './routes/routes'
import './App.css'

const App = () => {
  const { theme } = useContext(GlobalContext)

  const addThemeLight = (className: string) => {
    const themeClassLight = theme ? ' light' : ''

    return className + themeClassLight
  }

  return (
    <div className={addThemeLight('app')}>
      <div className={addThemeLight('app-wrapper')}>
        <div className={addThemeLight('infoWeather')}>
          <AppRoutes />
        </div>
      </div>
    </div>
  )
}

const AppWrapper: FC = () => {
  return (
    <GlobalProvider>
      <App />
    </GlobalProvider>
  )
}

export default AppWrapper
