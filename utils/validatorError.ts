import { NextApiResponse } from 'next'

const validateError = (e, res: NextApiResponse) => {
  const errors: any = {}
  e.inner.forEach(item => {
    errors[item.path] = item.message
  })

  console.log('res', errors)

  res.status(422).json({ errors })

  if (Object.keys(errors).length > 0) {
    return false
  }

  return true
}

export default validateError
