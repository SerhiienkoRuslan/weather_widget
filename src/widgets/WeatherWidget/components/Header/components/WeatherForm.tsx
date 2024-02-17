import React, { useContext, FC } from 'react'
import { Formik, Form, Field } from 'formik'

import useTheme from '../../../../../hooks/useTheme'

import { temperature } from '../../../constants'
import { WidgetContext } from '../../../context'

import style from '../styles.module.css'

const WeatherForm: FC = () => {
  const { addTheme } = useTheme(style.light)
  const { weatherFormData, setWeatherFormData, isFetching } = useContext(WidgetContext)

  return (
    <Formik
      enableReinitialize
      initialValues={weatherFormData}
      onSubmit={(values) => {
        setWeatherFormData(values)
      }}
    >
      {() => (
        <Form>
          <div className={style.findForm}>
            <div className={style.findParams}>
              <div className={style.findListItem}>
                <Field
                  className={addTheme(style.findList)}
                  name='cityName'
                  type='text'
                  placeholder='Enter your city...'
                />
              </div>

              <div className={style.tempOptionItem}>
                <Field as='select' name='temperatureType'>
                  {Object.values(temperature).map((value) => (
                    <option value={value} key={value}>
                      {value}
                    </option>
                  ))}
                </Field>
              </div>
            </div>

            <div className={style.buttonFindItem}>
              <button className={addTheme(style.buttonFind)} type='submit' disabled={isFetching}>
                Find
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  )
}

export default WeatherForm
