import { GetServerSideProps } from 'next'
import nextMiddleware from 'utils/nextMiddleware'
import { Api } from 'utils/Api'
import { useRouter } from 'next/router'
import Layout from 'components/Layout'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import Input from 'components/Input'
import { useState } from 'react'

const LoginPage = () => {
  const { push } = useRouter()
  const [error, setError] = useState('')
  const initialValues = {
    email: '',
    password: '',
  }

  const handleLogin = async (values) => {
    try {
      const res = await Api().post('/auth/login', values)

      if (res.status === 200) {
        push('/dashboard')
      }
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <Layout title="Login">
      <Formik
        initialValues={initialValues}
        validationSchema={Yup.object().shape({
          email: Yup.string().email().required(),
          password: Yup.string().min(8).max(20).required(),
        })}
        onSubmit={handleLogin}
      >
        <Form>
          <div>
            <span style={{ color: '#ff5864' }}>{error}</span>
          </div>
          <div>
            <label>Email</label>
            <Input type="email" name="email" />
          </div>
          <div>
            <label>Password</label>
            <Input type="password" name="password" />
          </div>
          <div>
            <button type="submit">Login</button>
          </div>
        </Form>
      </Formik>
    </Layout>
  )
}

export default LoginPage

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  try {
    const { user } = await nextMiddleware(req, res)
    return { props: { user: user, isLogin: !!user } }
  } catch (e) {
    return { props: { user: null, isLogin: null } }
  }
}
