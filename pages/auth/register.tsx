import { GetServerSideProps } from 'next'
import nextMiddleware from 'utils/nextMiddleware'
import { Api } from 'utils/Api'
import { useRouter } from 'next/router'
import Layout from 'components/Layout'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import { User } from 'types'
import Input from 'components/Input'

const registerPage = () => {
  const { push } = useRouter()

  const initialValues = {
    name: '',
    email: '',
    password: '',
  }

  const handleRegister = async (values: User) => {
    try {
      const res = await Api().post('/auth/register', values)

      if (res.status === 200) {
        push('/auth/login')
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <Layout title="Register">
      <Formik
        initialValues={initialValues}
        validationSchema={Yup.object().shape({
          name: Yup.string().min(10).required(),
          email: Yup.string().email().required(),
          password: Yup.string().min(8).max(20).required(),
        })}
        onSubmit={handleRegister}
      >
        <Form>
          <div>
            <label>Nama</label>
            <Input type="text" name="name" />
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
            <button type="submit">Register</button>
          </div>
        </Form>
      </Formik>
    </Layout>
  )
}

export default registerPage

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  try {
    const { user } = await nextMiddleware(req, res)
    return { props: { user: user, isLogin: !!user } }
  } catch (e) {
    return { props: { user: null, isLogin: null } }
  }
}
