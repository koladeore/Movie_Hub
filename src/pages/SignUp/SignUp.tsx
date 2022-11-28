import { FC, useEffect, useState } from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { MyFormValues } from '../../models/interface'
import { useNavigate } from 'react-router-dom'
import './SignUp.css'

export const SignUp: FC<{}> = () => {
  const [error, setError] = useState(false)
  // const [alertMessage, setAlertMessage] = useState('');
  const [data, setData] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('dataKey') as string)
    if (user) {
      navigate('/')
    }
  }, [])
  const initialValues: MyFormValues = {
    userName: '',
    email: '',
    password: '',
    confirmPassword: '',
  }
  return (
    <div className="auth-form-container">
      {/* <h2>Sign Up</h2> */}
      <Formik
        initialValues={initialValues}
        validationSchema={Yup.object({
          userName: Yup.string()
            .max(15, 'Must be 15 characters or less')
            .required('Required'),
          email: Yup.string()
            .email('Invalid email address')
            .required('Required'),
          password: Yup.string()
            .required('password is required')
            .min(6, 'password must be minimum of 6 characters')
            .matches(/(?=.*[0-9])/, 'Password must contain a number.'),
          confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('confirm the password'),
        })}
        onSubmit={(values, { setSubmitting }) => {
          localStorage.setItem('dataKey', JSON.stringify(values))
          return navigate('/')
          // const user = JSON.parse(localStorage.getItem('dataKey') as string);
          // console.log('user', user)
          // return navigate('/')
          // setTimeout(() => {
          //     setError(true);
          //     setSubmitting(false);
          // }, 500);
        }}
      >
        <Form className="register-form">
          <label htmlFor="userName">User Name</label>
          <Field
            name="userName"
            type="text"
            placeholder="Enter your user name"
          />
          <ErrorMessage
            component="userName"
            className="error"
            name="userName"
          />

          <label htmlFor="email">Email Address</label>
          <Field name="email" type="email" placeholder="Enter your email" />
          <ErrorMessage component="email" className="error" name="email" />

          <label htmlFor="password">Password</label>
          <Field
            name="password"
            type="password"
            placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
          />
          <ErrorMessage
            component="password"
            className="error"
            name="password"
          />

          <label htmlFor="confirmPassword">Confirm Password</label>
          <Field
            name="confirmPassword"
            type="password"
            placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
          />
          <ErrorMessage
            component="confirmPassword"
            className="error"
            name="confirmPassword"
          />

          <button className="submit-btn" type="submit">
            Submit
          </button>
        </Form>
      </Formik>
    </div>
  )
}
