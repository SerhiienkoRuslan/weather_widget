import { useContext } from 'react'
import { GlobalContext } from '../context/global'

const useTheme: any = (light: string) => {
  const { theme } = useContext(GlobalContext)

  const addTheme = (className: string) => {
    const themeClass = theme ? ` ${light}` : ''

    return className + themeClass
  }

  return { addTheme }
}

export default useTheme
