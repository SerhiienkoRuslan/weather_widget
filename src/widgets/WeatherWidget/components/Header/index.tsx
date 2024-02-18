import React, { FC } from 'react'
import { NavLink } from 'react-router-dom'

import logo from '../../../../assets/logo.png'
import useTheme from '../../../../hooks/useTheme'

import ChangerTheme from './components/ChangerTheme'
import WeatherForm from './components/WeatherForm'
import style from './styles.module.css'

const Header: FC = () => {
  const { addTheme } = useTheme(style.light)

  return (
    <div className={addTheme(style.header)}>
      <div className={addTheme(style.logo)}>
        <NavLink className={style.logoNavlink} to={'/'}>
          <img className={style.logoImage} src={logo} alt='logo' />
          <h4>WeatherApp</h4>
        </NavLink>
      </div>

      <ChangerTheme />

      <div className={style.updateForm}>
        <WeatherForm />
      </div>
    </div>
  )
}

export default Header
