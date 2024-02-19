import { FC, useContext } from 'react'

import { GlobalContext } from '../../../../../context/global'

import styles from './ChangerTheme.module.css'
import useTheme from '../../../../../hooks/useTheme'

import Moon from '../../../../../assets/moon.svg'
import Sun from '../../../../../assets/sun.svg'

const ChangerTheme: FC = () => {
  const { changeTheme } = useContext(GlobalContext)

  const { addTheme } = useTheme(styles.light)

  const handleChange = () => {
    changeTheme()
  }

  return (
    <button onClick={handleChange} className={addTheme(styles.switch)}>
      <div className={addTheme(styles.circle)}></div>
      <img className={addTheme(styles.moon)} src={Moon} alt='moon' />
      <img className={addTheme(styles.sun)} src={Sun} alt='sun' />
    </button>
  )
}

export default ChangerTheme
