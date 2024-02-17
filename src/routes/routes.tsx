import React from 'react'
import WeatherPage from '../pages/WeatherPage'
import { Navigate, Route, Routes } from 'react-router-dom'

const AppRoutes = React.memo(() => {
  return (
    <Routes>
      <Route path='/' element={<WeatherPage />} />
      <Route path='/*' element={<Navigate to={'/'} />} />
    </Routes>
  )
})

export default AppRoutes
