import * as Yup from 'yup'
import nextMiddleware, { NextApiRequestWithSession } from 'utils/nextMiddleware'
import { NextApiResponse } from 'next'
import { UserModel } from 'models/User'
import { compareHash } from 'utils/password'
import { ResponseInternalError, ResponseNotImplemented } from 'utils/response'

export default async (req: NextApiRequestWithSession, res: NextApiResponse) => {
  try {
    req = await nextMiddleware(req, res)

    if (req.method !== 'POST') {
      ResponseNotImplemented(res)
    }

    if (req.user !== null) {
      return res.status(422).json({ message: 'User Already Login' })
    }

    try {
      await Yup.object()
        .shape({
          email: Yup.string().required(),
          password: Yup.string().required(),
        })
        .validate(req.body, { abortEarly: false })
    } catch (e) {
      return e
    }
    const { email, password } = req.body

    const user = await UserModel.findOne({ email }).select('+password')
    if (!user) {
      return res.status(422).json({ message: 'Pengguna tidak ditemukan' })
    }

    if (await compareHash(password, user.password)) {
      req.session.set('user', user._id)

      await req.session.save()
      return res.json({ success: true, message: 'Berhasil login' })
    }

    return res.status(422).json({ message: 'Password tidak benar.' })
    
  } catch (e) {
    console.error(e)
    ResponseInternalError(res)
  }
}
