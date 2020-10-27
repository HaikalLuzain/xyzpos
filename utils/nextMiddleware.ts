import nextConnect from 'next-connect'
import { ConnectDB } from 'models'
import { NextApiRequest } from 'next'
import { User } from 'types'
import { ironSession, Session } from 'next-iron-session'
import { UserModel } from 'models/User'

export interface NextApiRequestWithSession extends NextApiRequest {
  user: User
  session: Session
}

const session = ironSession({
  cookieName: '_xyzpos',
  password: [
    {
      id: 1,
      password: 'hRFHDIneEj6EZzyliV1RJADcle3cOzoa',
    },
    {
      id: 2,
      password: '2nSy4jmSyXDAWKdns1sdNHBx9V6jdxmE',
    },
  ],
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
  },
})

const initializeDB = async (req, res, next) => {
  try {
    await ConnectDB()
    next()
  } catch (e) {
    res.status(500).send('Error initialize database...')
    return
  }
}

const authMiddleware = async (req: NextApiRequestWithSession, res, next) => {
  try {
    req.user = null
    if (req.session.get('user')) {
      const user = await UserModel.findOne({ _id: req.session.get('user') })
      if (user !== null) {
        req.user = JSON.parse(JSON.stringify(user.toJSON()))
      }
    }
  } catch (e) {
    console.error('[user]', e)
  }

  /**
   * Redirect if not logedin
   */
  if (new RegExp('^/dashboard', 'i').test(req.url)) {
    if (req.user === null) {
      res.writeHead(302, {
        Location: '/auth/login',
      })
      res.end()
      return
    }
  }

  next()
}

export default async (req, res): Promise<any> => {
  const handler = nextConnect()
  handler.use(session).use(initializeDB).use(authMiddleware)
  await handler.run(req, res)

  return req
}
