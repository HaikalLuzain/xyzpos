import { UserContextProvider } from 'context/UserContext'
import { AppProps } from 'next/dist/next-server/lib/router/router'
import { useRouter } from 'next/router'
import { Fragment, useEffect } from 'react'
import 'styles/globals.scss'

const App: React.FC<AppProps> = ({
  Component,
  pageProps,
  router,
  ...props
}) => {
  const { push, pathname } = useRouter()

  useEffect(() => {
    if (pathname === '/dashboard' && !pageProps.isLogin) {
      push('/auth/login')
    }
  }, [])

  return (
    <Fragment>
      <UserContextProvider user={pageProps.user || null}>
        <Component {...pageProps} />
      </UserContextProvider>
    </Fragment>
  )
}

export default App
