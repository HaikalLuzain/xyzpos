import { NextApiResponse } from 'next'
import nextMiddleware, { NextApiRequestWithSession } from 'utils/nextMiddleware'
import { ResponseNotImplemented, ResponseInternalError } from 'utils/response'
import * as Yup from 'yup'
import validateError from 'utils/validatorError'
import { UserModel } from 'models/User'
import { generateHash } from 'utils/password'
import { User } from 'types'

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
          name: Yup.string().min(10).required(),
          email: Yup.string().email().required(),
          password: Yup.string().min(8).max(20).required(),
        })
        .validate(req.body, { abortEarly: false })
    } catch (e) {
      return validateError(e, res)
    }

    try {
      const { name, email, password } = req.body

      const user = await UserModel.findOne({ email })

      if (user) {
        return res
          .status(422)
          .json({ message: 'Pengguna sudah pernah terdaftar' })
      }

      const pass = await generateHash(password)

      const u = await UserModel.create({
        email: email.toLowerCase(),
        name,
        password: pass,
      } as User)

      return res.json({ message: 'Success', user: u })
    } catch (error) {
      console.log(error)
      ResponseInternalError(res)
    }
  } catch (e) {
    console.log(e)
    ResponseInternalError(res)
  }
}
