import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import style from "./Header.module.css";
import useTheme from "../../hooks/useTheme";

type PropsType = {
  updateCityName: (NewCityName: string) => void;
  updateTempType: (NewTempSelect: boolean) => void;
};

export const UpdateCityNameForm: React.FC<PropsType> = React.memo((props) => {
  const [value, setChangeValue] = useState(true);
  useEffect(() => {
    props.updateTempType(value);
  }, [value]);

  const { addTheme } = useTheme(style.light);
  return (
    <Formik
      enableReinitialize
      initialValues={{
        cityName: "",
        tempType: "true",
      }}
      onSubmit={(values) => {
        if (values.cityName.length >= 1) {
          props.updateCityName(values.cityName);
        }
      }}
    >
      {({}) => (
        <Form>
          <div className={style.findForm}>
            <div className={style.findParams}>
              <div className={style.findListItem}>
                <Field
                  className={addTheme(style.findList)}
                  name={"cityName"}
                  type={"text"}
                  placeholder="Enter your city..."
                />
              </div>
              <div className={style.tempOptionItem}>
                <select
                  className={addTheme(style.tempOption)}
                  name="tempType"
                  onChange={() => {
                    setChangeValue(!value);
                  }}
                >
                  <option value="true">°C</option>
                  <option value="false">°F</option>
                </select>
              </div>
            </div>
            <div className={style.buttonFindItem}>
              <button className={addTheme(style.buttonFind)} type={"submit"}>
                Find
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
});
