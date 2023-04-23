import { FC, useEffect } from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { MyFormValues } from '../../models/interface'
import { useNavigate, useLocation } from 'react-router-dom'
import './SignUp.css'

export const SignUp: FC<{}> = () => {
  let navigate = useNavigate()
  let location = useLocation()
  let from = location.state?.from || '/'

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('dataKey') as string)
    if (user) {
      navigate('/')
    }
  }, [navigate])
  const initialValues: MyFormValues = {
    userName: '',
    email: '',
    password: '',
    confirmPassword: '',
  }
  return (
    <div>
      <h1>Sign Up</h1>
      <div className="auth-form-container">
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
        onSubmit={(values) => {
          localStorage.setItem('dataKey', JSON.stringify(values))
          navigate(from, { replace: true })
        }}
      >
        <Form className="register-form">
          <label htmlFor="userName">User Name</label>
          <Field
            id="userName"
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
          <Field id="email" name="email" type="email" placeholder="Enter your email" />
          <ErrorMessage component="email" className="error" name="email" />

          <label htmlFor="password">Password</label>
          <Field
            id="password"
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
             id="confirmPassword"
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
        {/* <label htmlFor="hi">hi</label> */}
      </div>
    </div>

  )
}
