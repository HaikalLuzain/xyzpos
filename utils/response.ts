import { NextApiResponse } from 'next'
export const ResponseInternalError = (
  res: NextApiResponse,
  message = 'Something went wrong'
) => {
  return res.status(500).json({ message })
}

export const ResponseNotImplemented = (res: NextApiResponse) => {
  return res.status(501).json({ message: 'Not Implemented' })
}

export const ResponseNotFound = (res: NextApiResponse) => {
  return res.status(404).json({ message: 'not found' })
}

export const ResponseUnauthorized = (res: NextApiResponse) => {
  return res.status(401).json({ message: 'Unauthorized' })
}

export const ResponseUnprocessable = (
  res: NextApiResponse,
  message = 'Unprocessable'
) => {
  return res.status(422).json({ message })
}
